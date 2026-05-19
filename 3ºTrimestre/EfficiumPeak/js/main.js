// Importamos aquí toda la lógica principal que luego se reparte entre login, paneles y utilidades.
import { iniciarSesion, iniciarSesionFacialDemo, cerrarSesion, redirigirSegunRol } from './modulos/auth.js';
import { cargarHabitos, renderizarHabitos, completarHabito } from './modulos/habitos.js';
import { mostrarNotificacion, createNode } from './modulos/dom.js';
import { obtenerHabitoDia, guardarProgresoServidor, cargarUsuarios } from './modulos/api.js';
import { validarEmail, validarPassword } from './modulos/validacion.js';
import {
  obtenerEmailRecordado,
  obtenerHabitosUsuario,
  guardarResumenUsuario,
  obtenerResumenUsuario
} from './modulos/storage.js';

// Estas variables me sirven para controlar la demo facial y cerrar bien la cámara al salir.
let streamFacialDemo = null;
let timeoutFacialDemo = null;
let empleadosSistema = [];
let usuariosSistema = [];
let retoEditandoId = null;

document.addEventListener('DOMContentLoaded', async () => {
  await prepararDatosDinamicos();
  renderizarDashboardDinamicoSiProcede();
  sincronizarPaginasPublicasConSesion();
  inicializarEventos();
  await cargarDatosIniciales();
});

/**
 * Carga los usuarios del JSON y deja listos los datos que necesita el panel manager.
 * @returns {Promise<void>} Fin de la preparación.
 */
async function prepararDatosDinamicos() {
  try {
    usuariosSistema = await cargarUsuarios();
    empleadosSistema = usuariosSistema
      .filter((usuario) => usuario.rol === 'empleado')
      .map((usuario) => crearEmpleadoSistemaDesdeUsuario(usuario));
  } catch (error) {
    console.warn('No se pudieron cargar los empleados para el panel manager:', error);
    usuariosSistema = [];
    empleadosSistema = [];
  }
}

/**
 * Saca unas iniciales a partir del nombre del usuario.
 * @param {string} nombre - Nombre completo.
 * @returns {string} Iniciales cortas.
 */
function crearIniciales(nombre = '') {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  return partes.slice(0, 2).map((parte) => parte.charAt(0).toUpperCase()).join('') || 'EM';
}

/**
 * Devuelve un riesgo simple según los puntos del empleado.
 * @param {number} puntos - Puntos del empleado.
 * @returns {string} Riesgo calculado.
 */
function obtenerRiesgoPorPuntos(puntos) {
  if (puntos < 700) return 'Alto';
  if (puntos < 1200) return 'Medio';
  return 'Bajo';
}

/**
 * Busca un usuario base dentro del JSON cargado.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Object|null} Usuario base o null.
 */
function obtenerUsuarioBase(usuarioId) {
  return usuariosSistema.find((usuario) => usuario.id === usuarioId) ?? null;
}

/**
 * Calcula el resumen real de un usuario a partir de sus hábitos guardados.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Object|null} Resumen calculado o null si no existe el usuario.
 */
function calcularResumenUsuario(usuarioId) {
  const usuarioBase = obtenerUsuarioBase(usuarioId);
  if (!usuarioBase) return null;

  const habitosGuardados = obtenerHabitosUsuario(usuarioId);
  const habitosCompletados = habitosGuardados.filter((habito) => habito.completado);
  const puntosGanados = habitosCompletados.reduce((total, habito) => total + Number(habito.puntos ?? 0), 0);
  const puntosBase = Number(usuarioBase.puntos ?? 0);
  const puntosTotales = puntosBase + puntosGanados;
  const racha = calcularRachaSemanalVisible(usuarioId);
  const progreso = habitosGuardados.length > 0
    ? Math.round((habitosCompletados.length / habitosGuardados.length) * 100)
    : Number(usuarioBase.progreso ?? 0);

  return {
    usuarioId,
    puntosBase,
    puntosGanados,
    puntosTotales,
    racha,
    habitosCompletados: habitosCompletados.length,
    progreso,
    actualizadoEn: new Date().toISOString()
  };
}

/**
 * Mezcla el usuario base con el resumen real guardado en localStorage.
 * @param {Object} usuario - Usuario base del JSON.
 * @returns {Object} Empleado listo para pintar en manager.
 */
function crearEmpleadoSistemaDesdeUsuario(usuario) {
  const resumenGuardado = obtenerResumenUsuario(usuario.id);
  const resumen = resumenGuardado ?? calcularResumenUsuario(usuario.id);
  if (!resumenGuardado && resumen) guardarResumenUsuario(usuario.id, resumen);
  const puntos = Number(resumen?.puntosTotales ?? usuario.puntos ?? 0);
  const racha = Number(resumen?.racha ?? usuario.racha ?? 0);
  const habitos = Number(resumen?.habitosCompletados ?? usuario.habitosCompletados?.length ?? 0);
  const progreso = Number(resumen?.progreso ?? usuario.progreso ?? 0);

  return {
    id: usuario.id,
    iniciales: crearIniciales(usuario.nombre),
    nombre: usuario.nombre,
    rol: 'Empleado',
    puntos,
    racha,
    habitos,
    progreso,
    riesgo: obtenerRiesgoPorPuntos(puntos)
  };
}

/**
 * Guarda el resumen real de un usuario y actualiza la copia usada por la interfaz.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Object|null} Resumen guardado.
 */
function sincronizarResumenUsuario(usuarioId) {
  const resumen = calcularResumenUsuario(usuarioId);
  if (!resumen) return null;

  guardarResumenUsuario(usuarioId, resumen);
  empleadosSistema = empleadosSistema.map((empleado) => (
    empleado.id === usuarioId
      ? {
        ...empleado,
        puntos: resumen.puntosTotales,
        racha: resumen.racha,
        habitos: resumen.habitosCompletados,
        progreso: resumen.progreso,
        riesgo: obtenerRiesgoPorPuntos(resumen.puntosTotales)
      }
      : empleado
  ));

  const sesion = obtenerSesionActiva();
  if (sesion?.id === usuarioId) {
    sessionStorage.setItem('sesion_usuario', JSON.stringify({
      ...sesion,
      puntos: resumen.puntosTotales,
      racha: resumen.racha,
      habitosCompletados: Array.from({ length: resumen.habitosCompletados }, (_, index) => index)
    }));
  }

  return resumen;
}

/**
 * Devuelve la lista de empleados preparada para el panel manager.
 * @returns {Array<Object>} Empleados del sistema.
 */
function obtenerEmpleadosSistema() {
  return empleadosSistema;
}

/**
 * Ordena los empleados por puntos de mayor a menor.
 * Así el ranking visual y la tabla siguen exactamente el mismo criterio.
 * @returns {Array<Object>} Empleados ordenados.
 */
function obtenerEmpleadosOrdenadosPorPuntos() {
  return [...obtenerEmpleadosSistema()].sort((a, b) => b.puntos - a.puntos);
}

/**
 * Devuelve los hábitos persistidos de un empleado ya filtrados y normalizados.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {Array<Object>} Hábitos completados con fecha válida.
 */
function obtenerHabitosPersistidosEmpleado(empleadoId) {
  return obtenerHabitosUsuario(empleadoId)
    .filter((habito) => habito.completado && habito.fechaCompletado)
    .map((habito) => ({
      ...habito,
      fechaCompletado: new Date(habito.fechaCompletado)
    }))
    .filter((habito) => !Number.isNaN(habito.fechaCompletado.getTime()));
}

/**
 * Normaliza una fecha al inicio del día para poder compararla sin horas.
 * @param {Date} fecha - Fecha original.
 * @returns {Date} Fecha normalizada.
 */
function normalizarInicioDia(fecha) {
  const copia = new Date(fecha);
  copia.setHours(0, 0, 0, 0);
  return copia;
}

/**
 * Cuenta los días consecutivos con al menos un hábito completado empezando por hoy.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {number} Número de días consecutivos activos.
 */
function calcularDiasConsecutivosActividad(empleadoId) {
  const diasActividad = new Set(
    obtenerHabitosPersistidosEmpleado(empleadoId)
      .map((habito) => normalizarInicioDia(habito.fechaCompletado).getTime())
  );

  let consecutivos = 0;
  const cursor = normalizarInicioDia(new Date());

  while (diasActividad.has(cursor.getTime())) {
    consecutivos += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return consecutivos;
}

/**
 * Devuelve los hábitos completados por un empleado durante el día actual.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {Array<Object>} Hábitos completados hoy.
 */
function obtenerHabitosCompletadosHoy(empleadoId) {
  const hoy = normalizarInicioDia(new Date()).getTime();
  return obtenerHabitosPersistidosEmpleado(empleadoId)
    .filter((habito) => normalizarInicioDia(habito.fechaCompletado).getTime() === hoy);
}

/**
 * Calcula el avance del reto diario contando solo hábitos grandes.
 * Aquí solo suman 1 los hábitos de 200 puntos o más.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {number} Avance diario del reto.
 */
function calcularAvanceDiarioPonderado(empleadoId) {
  return obtenerHabitosCompletadosHoy(empleadoId)
    .reduce((total, habito) => total + (habito.puntos >= 200 ? 1 : 0), 0);
}

/**
 * Calcula la racha semanal visible partiendo de la base del usuario.
 * Si completa el día actual, sube un paso hasta cerrar la semana en 7.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {number} Racha visible de la semana.
 */
function calcularRachaSemanalVisible(usuarioId) {
  const usuarioBase = obtenerUsuarioBase(usuarioId);
  const baseRacha = Number(usuarioBase?.racha ?? 0);
  const actividadHoy = obtenerHabitosCompletadosHoy(usuarioId).length > 0 ? 1 : 0;
  const rachaReal = calcularDiasConsecutivosActividad(usuarioId);

  return Math.min(7, Math.max(baseRacha, rachaReal, baseRacha + actividadHoy));
}

/**
 * Genera los retos base a partir de los empleados cargados.
 * @returns {Array<Object>} Retos iniciales dinámicos.
 */
function crearRetosInicialesDinamicos() {
  const empleados = obtenerEmpleadosSistema();
  if (empleados.length === 0) return [];

  return [
    {
      id: 'reto-base-equipo',
      titulo: 'Equipo al día',
      descripcion: 'Registrar los hábitos clave durante tres días seguidos.',
      empleadoId: 'todos',
      empleadoNombre: 'Todo el equipo',
      meta: 3,
      progreso: 1,
      creadoPor: 'Marcos Gómez'
    },
    {
      id: `reto-base-${empleados[0].id}`,
      titulo: 'Sprint de foco individual',
      descripcion: 'Completar cinco bloques de trabajo profundo esta semana.',
      empleadoId: empleados[0].id,
      empleadoNombre: empleados[0].nombre,
      meta: 5,
      progreso: 2,
      creadoPor: 'Marcos Gómez'
    }
  ];
}

/**
 * Construye el dashboard correspondiente al usuario autenticado.
 * @returns {void}
 */
function renderizarDashboardDinamicoSiProcede() {
  const root = document.getElementById('dashboard-root');
  if (!root) return;

  const usuario = obtenerSesionActiva();
  if (!usuario) {
    location.href = './login.html';
    return;
  }

  document.body.classList.add('dashboard-page');
  document.title = `${capitalizarRol(usuario.rol)} · Efficium Peak`;
  root.innerHTML = '';
  root.append(crearTopbarDashboard(usuario), crearMainDashboard(usuario));
}

/**
 * Recupera la sesión activa desde sessionStorage.
 * @returns {Object|null} Usuario autenticado o null.
 */
function obtenerSesionActiva() {
  const raw = sessionStorage.getItem('sesion_usuario');
  return raw ? JSON.parse(raw) : null;
}

/**
 * Ajusta portada y login cuando ya existe una sesión abierta.
 * @returns {void}
 */
function sincronizarPaginasPublicasConSesion() {
  const usuario = obtenerSesionActiva();
  if (!usuario) return;

  const esLogin = Boolean(document.getElementById('form-login'));
  const esPortada = Boolean(document.querySelector('.hero-saas'));

  if (esLogin) {
    location.href = './dashboard.html';
    return;
  }

  if (!esPortada) return;

  const enlaceLogin = document.querySelector('.site-nav a[href="./login.html"]');
  if (enlaceLogin) {
    enlaceLogin.textContent = 'Mi panel';
    enlaceLogin.setAttribute('href', './dashboard.html');
  }

  const botonDemo = document.querySelector('.hero-actions .button[href="./login.html"]');
  if (botonDemo) {
    botonDemo.textContent = 'Volver al panel';
    botonDemo.setAttribute('href', './dashboard.html');
  }
}

/**
 * Devuelve el nombre legible del rol para títulos y textos.
 * @param {string} rol - Rol del usuario.
 * @returns {string} Rol con mayúscula inicial.
 */
function capitalizarRol(rol) {
  return rol ? `${rol.charAt(0).toUpperCase()}${rol.slice(1)}` : 'Usuario';
}

/**
 * Crea la cabecera compartida del dashboard.
 * @param {Object} usuario - Usuario autenticado.
 * @returns {HTMLElement} Cabecera del panel.
 */
function crearTopbarDashboard(usuario) {
  const header = createNode('header');
  header.classList.add('topbar');

  const brand = createNode('a');
  brand.classList.add('brand');
  brand.href = './dashboard.html';

  const logo = createNode('img');
  logo.classList.add('brand-logo');
  logo.src = './img/logo.png';
  logo.alt = 'Logo de Efficium Peak';

  const brandText = createNode('span', 'Efficium Peak');
  brand.append(logo, brandText);

  const botonSalir = createNode('button', 'Salir');
  botonSalir.classList.add('icon-button');
  botonSalir.type = 'button';
  botonSalir.dataset.accion = 'cerrar-sesion';

  header.append(brand, botonSalir);
  return header;
}

/**
 * Crea el contenedor principal del dashboard según el rol.
 * @param {Object} usuario - Usuario autenticado.
 * @returns {HTMLElement} Layout principal.
 */
function crearMainDashboard(usuario) {
  const main = createNode('main');
  main.classList.add('dashboard');

  const section = createNode('section');
  section.classList.add('dashboard-main');
  section.appendChild(usuario.rol === 'manager' ? crearPanelManager(usuario) : crearPanelEmpleado(usuario));

  main.appendChild(section);
  return main;
}

/**
 * Crea el panel dinámico del empleado usando createNode.
 * @param {Object} usuario - Usuario autenticado.
 * @returns {HTMLElement} Contenido del panel empleado.
 */
function crearPanelEmpleado(usuario) {
  const fragment = document.createDocumentFragment();
  const nombre = usuario.nombre ?? 'Empleado';
  const inicial = nombre.charAt(0).toUpperCase();

  const acciones = createNode('section');
  acciones.classList.add('actions-bar');

  const perfil = createNode('div');
  perfil.classList.add('profile-inline');
  const avatar = createNode('span', inicial);
  avatar.classList.add('avatar');
  const perfilInfo = createNode('div');
  perfilInfo.append(createNode('strong', nombre), createNode('small', `${capitalizarRol(usuario.rol)} · Operaciones`));
  perfil.append(avatar, perfilInfo);
  acciones.appendChild(perfil);

  const hero = createNode('section');
  hero.classList.add('dashboard-hero');
  const heroCopy = createNode('div');
  heroCopy.append(
    crearEyebrow('Panel empleado'),
    createNode('h1', 'Habitos de rendimiento'),
    createNode('p', 'Completa acciones diarias, suma puntos y mantén tu racha activa.')
  );
  const filtro = createNode('select');
  filtro.id = 'filtro-habitos';
  filtro.setAttribute('aria-label', 'Filtrar hábitos');
  [
    ['todos', 'Todos'],
    ['diario', 'Diarios'],
    ['semanal', 'Semanales'],
    ['mensual', 'Mensuales']
  ].forEach(([valor, texto]) => {
    const opcion = createNode('option', texto);
    opcion.value = valor;
    filtro.appendChild(opcion);
  });
  hero.append(heroCopy, filtro);

  const kpis = createNode('section');
  kpis.classList.add('kpi-grid');
  kpis.id = 'racha';
  const tarjetasEmpleado = [
    ['Racha actual', '0 dias', 'Constancia semanal'],
    ['Puntos actuales', '0 pts', 'Nivel inicial'],
    ['Retos activos', '0', 'Sin actividad todavía']
  ];
  tarjetasEmpleado.forEach(([titulo, valor, apoyo], indice) => {
    const card = crearKpiCard(titulo, valor, apoyo);
    const valorNodo = card.querySelector('strong');
    const apoyoNodo = card.querySelector('small');
    if (indice === 0 && valorNodo) valorNodo.id = 'kpi-empleado-racha';
    if (indice === 1 && valorNodo) valorNodo.id = 'kpi-empleado-puntos';
    if (indice === 1 && apoyoNodo) apoyoNodo.id = 'kpi-empleado-nivel';
    if (indice === 2 && valorNodo) valorNodo.id = 'kpi-empleado-retos';
    if (indice === 2 && apoyoNodo) apoyoNodo.id = 'kpi-empleado-retos-texto';
    kpis.appendChild(card);
  });

  const insights = createNode('section');
  insights.classList.add('insight-row');
  const siguienteLogro = crearInsightCard(
    'Siguiente logro',
    'Constancia de 7 dias',
    'Completa el día actual para cerrar la semana al 100%.',
    '86%'
  );
  siguienteLogro.querySelector('h2')?.setAttribute('id', 'siguiente-logro-titulo');
  siguienteLogro.querySelector('p')?.setAttribute('id', 'siguiente-logro-descripcion');
  siguienteLogro.querySelector('.score-ring')?.setAttribute('id', 'siguiente-logro-porcentaje');
  insights.append(
    siguienteLogro,
    crearInsightCard('Recomendacion', 'Bloque de foco', 'Agenda 25 minutos sin interrupciones antes de cerrar la mañana.', '', true)
  );

  const progreso = createNode('section');
  progreso.classList.add('progress-box');
  const progresoInfo = createNode('div');
  progresoInfo.append(createNode('strong', 'Progreso de hoy'), createNode('span', '0/0 completados'));
  progresoInfo.lastChild.id = 'contador-habitos';
  const progressBar = createNode('div');
  progressBar.classList.add('progress');
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  const barra = createNode('div');
  barra.id = 'barra-progreso';
  progressBar.appendChild(barra);
  progreso.append(progresoInfo, progressBar);

  const api = createNode('section');
  api.classList.add('api-suggestion');
  api.id = 'habito-dia-api';
  const apiInfo = createNode('div');
  apiInfo.append(createNode('h2', 'Frase positiva del dia'), createNode('p', 'Cargando frase del dia...'));
  const apiBadge = createNode('span', 'Positive API');
  apiBadge.classList.add('api-badge');
  api.append(apiInfo, apiBadge);

  const listaHabitos = createNode('section');
  listaHabitos.id = 'lista-habitos';
  listaHabitos.classList.add('habitos-grid');
  listaHabitos.setAttribute('aria-live', 'polite');

  const misiones = createNode('section');
  misiones.id = 'misiones';
  misiones.classList.add('mission-strip');
  const misionArticle = createNode('article');
  const missionIcon = createNode('span', '⚡');
  missionIcon.classList.add('mission-icon');
  const missionInfo = createNode('div');
  const missionTitle = createNode('strong', 'Mision: constancia saludable');
  missionTitle.id = 'mision-empleado-titulo';
  const missionDescription = createNode('p', 'Completa hábitos en días seguidos para hacer crecer tu racha.');
  missionDescription.id = 'mision-empleado-descripcion';
  missionInfo.append(missionTitle, missionDescription);
  misionArticle.append(missionIcon, missionInfo);
  const missionPill = createNode('span', '0/7 dias consecutivos');
  missionPill.id = 'mision-empleado-estado';
  missionPill.classList.add('mission-pill');
  misiones.append(misionArticle, missionPill);

  const retosPanel = createNode('section');
  retosPanel.classList.add('retos-manager-panel');
  const retosHeader = createNode('div');
  retosHeader.classList.add('panel-header');
  const retosCopy = createNode('div');
  retosCopy.append(crearEyebrow('Retos asignados'), createNode('h2', 'Objetivos enviados por tu manager'));
  retosHeader.append(retosCopy, createNode('span', 'Operaciones'));
  const retosLista = createNode('div');
  retosLista.id = 'retos-empleado-lista';
  retosLista.classList.add('reto-list');
  retosPanel.append(retosHeader, retosLista);

  fragment.append(acciones, hero, kpis, insights, progreso, api, listaHabitos, misiones, retosPanel);

  const wrapper = createNode('div');
  wrapper.id = 'dashboard-empleado-dinamico';
  wrapper.appendChild(fragment);
  return wrapper;
}

/**
 * Crea el panel dinámico del manager usando createNode.
 * @param {Object} usuario - Usuario autenticado.
 * @returns {HTMLElement} Contenido del panel manager.
 */
function crearPanelManager(usuario) {
  const fragment = document.createDocumentFragment();
  const nombre = usuario.nombre ?? 'Manager';
  const inicial = nombre.charAt(0).toUpperCase();

  const acciones = createNode('section');
  acciones.classList.add('actions-bar');
  const perfil = createNode('div');
  perfil.classList.add('profile-inline');
  const avatar = createNode('span', inicial);
  avatar.classList.add('avatar');
  const perfilInfo = createNode('div');
  perfilInfo.append(createNode('strong', nombre), createNode('small', `${capitalizarRol(usuario.rol)} · Operaciones`));
  perfil.append(avatar, perfilInfo);
  acciones.appendChild(perfil);

  const hero = createNode('section');
  hero.classList.add('dashboard-hero', 'manager-hero');
  const heroCopy = createNode('div');
  heroCopy.append(
    crearEyebrow('Panel manager'),
    createNode('h1', 'Seguimiento del equipo'),
    createNode('p', 'Visión clara de puntos, retos colaborativos y evolución del equipo.')
  );
  const heroStatus = createNode('div');
  heroStatus.classList.add('hero-status');
  heroStatus.append(
    createNode('span', `${obtenerEmpleadosSistema().length} empleados activos`),
    createNode('span', `${obtenerRetos().length} retos en curso`)
  );
  hero.append(heroCopy, heroStatus);

  const kpis = createNode('section');
  kpis.classList.add('kpi-grid');
  kpis.id = 'kpis';
  [
    ['Puntuacion media', '0 pts', 'Equipo Operaciones'],
    ['Top del equipo', '0 pts', 'Mayor puntuación'],
    ['Empleados activos', '0', 'Panel manager']
  ].forEach(([titulo, valor, apoyo], indice) => kpis.appendChild(crearKpiCard(titulo, valor, apoyo, indice === 0)));

  const resumen = createNode('section');
  resumen.classList.add('executive-summary');
  const resumenArticle = createNode('article');
  resumenArticle.append(
    crearEyebrow('Resumen ejecutivo'),
    createNode('h2', 'El equipo mantiene una tendencia positiva'),
    createNode('p', 'Se mostrará un resumen automático al calcular los puntos del equipo.')
  );
  const resumenActions = createNode('div');
  resumenActions.classList.add('summary-actions');
  resumenActions.append(createNode('span', 'Riesgo bajo'), createNode('span', '3 acciones sugeridas'));
  resumen.append(resumenArticle, resumenActions);

  const managerGrid = createNode('section');
  managerGrid.classList.add('manager-grid');
  managerGrid.id = 'equipo';
  managerGrid.append(crearGraficoManager(), crearPanelEquipo());

  const analiticas = createNode('section');
  analiticas.classList.add('employee-analytics-panel');
  analiticas.id = 'analiticas-empleados';
  const analiticasHeader = createNode('div');
  analiticasHeader.classList.add('panel-header');
  const analiticasCopy = createNode('div');
  analiticasCopy.append(crearEyebrow('Analiticas por empleado'), createNode('h2', 'Detalle de rendimiento'));
  analiticasHeader.append(analiticasCopy, createNode('span', 'Estadísticas en tiempo real'));
  const tabla = createNode('div');
  tabla.classList.add('employee-table');
  tabla.id = 'tabla-empleados';
  analiticas.append(analiticasHeader, tabla);

  const missionStrip = createNode('section');
  missionStrip.id = 'retos';
  missionStrip.classList.add('mission-strip');
  const retoArticle = createNode('article');
  const retoIcon = createNode('span', '🏆');
  retoIcon.classList.add('mission-icon');
  const retoInfo = createNode('div');
  retoInfo.append(createNode('strong', 'Reto colaborativo: Equipo al dia'), createNode('p', 'Todo el equipo registra sus hábitos clave durante tres días.'));
  retoArticle.append(retoIcon, retoInfo);
  missionStrip.appendChild(retoArticle);

  const retosPanel = createNode('section');
  retosPanel.classList.add('retos-manager-panel');
  const retosHeader = createNode('div');
  retosHeader.classList.add('panel-header');
  const retosCopy = createNode('div');
  retosCopy.append(crearEyebrow('Retos creados'), createNode('h2', 'Asignaciones activas'));
  retosHeader.appendChild(retosCopy);
  const editorReto = createNode('div');
  editorReto.id = 'reto-editor-manager';
  const retosLista = createNode('div');
  retosLista.id = 'retos-manager-lista';
  retosLista.classList.add('reto-list');
  retosPanel.append(retosHeader, editorReto, retosLista);

  fragment.append(acciones, hero, kpis, resumen, managerGrid, analiticas, missionStrip, retosPanel);

  const wrapper = createNode('div');
  wrapper.id = 'dashboard-manager-dinamico';
  wrapper.appendChild(fragment);
  return wrapper;
}

/**
 * Crea un pequeño texto eyebrow reutilizable.
 * @param {string} texto - Texto a mostrar.
 * @returns {HTMLElement} Nodo de apoyo.
 */
function crearEyebrow(texto) {
  const p = createNode('p', texto);
  p.classList.add('eyebrow');
  return p;
}

/**
 * Crea una tarjeta KPI reutilizable.
 * @param {string} titulo - Título del KPI.
 * @param {string} valor - Valor principal.
 * @param {string} apoyo - Texto secundario.
 * @param {boolean} esPrincipal - Marca visual opcional.
 * @returns {HTMLElement} Tarjeta creada.
 */
function crearKpiCard(titulo, valor, apoyo, esPrincipal = false) {
  const card = createNode('article');
  card.classList.add('kpi-card');
  if (esPrincipal) card.classList.add('strong');
  card.append(createNode('span', titulo), createNode('strong', valor), createNode('small', apoyo));
  return card;
}

/**
 * Crea una tarjeta de insight del panel empleado.
 * @param {string} eyebrow - Texto superior.
 * @param {string} titulo - Título principal.
 * @param {string} descripcion - Texto de apoyo.
 * @param {string} valor - Valor opcional.
 * @param {boolean} accentuada - Aplica estilo destacado.
 * @returns {HTMLElement} Tarjeta creada.
 */
function crearInsightCard(eyebrow, titulo, descripcion, valor = '', accentuada = false) {
  const article = createNode('article');
  article.classList.add('insight-card');
  if (accentuada) article.classList.add('accent-card');
  const info = createNode('div');
  info.append(crearEyebrow(eyebrow), createNode('h2', titulo), createNode('p', descripcion));
  article.appendChild(info);
  if (valor) {
    const badge = createNode('span', valor);
    badge.classList.add('score-ring');
    article.appendChild(badge);
  }
  return article;
}

/**
 * Crea el panel visual de gráfico del manager.
 * @returns {HTMLElement} Panel de gráfico.
 */
function crearGraficoManager() {
  const panel = createNode('article');
  panel.classList.add('analytics-panel');
  const header = createNode('div');
  header.classList.add('panel-header');
  const copy = createNode('div');
  copy.append(crearEyebrow('Productividad'), createNode('h2', 'Tendencia semanal'));
  header.append(copy, createNode('span', 'Tiempo real'));

  const chart = createNode('div');
  chart.classList.add('large-chart');
  chart.setAttribute('aria-label', 'Gráfico de tendencia semanal');
  ['h-45', 'h-60', 'h-38', 'h-82', 'h-74', 'h-94', 'h-70'].forEach((altura) => {
    const bar = createNode('span');
    bar.classList.add('bar', altura);
    chart.appendChild(bar);
  });
  panel.append(header, chart);
  return panel;
}

/**
 * Crea el panel lateral de ranking del equipo.
 * @returns {HTMLElement} Panel visual.
 */
function crearPanelEquipo() {
  const panel = createNode('article');
  panel.classList.add('team-panel');
  const header = createNode('div');
  header.classList.add('panel-header');
  const copy = createNode('div');
  copy.append(crearEyebrow('Equipo'), createNode('h2', 'Ranking de constancia'));
  header.appendChild(copy);

  const lista = createNode('ul');
  lista.classList.add('team-list');
  obtenerEmpleadosOrdenadosPorPuntos().forEach((empleado) => {
    const item = createNode('li');
    item.append(
      createNode('span', empleado.iniciales),
      createNode('strong', empleado.nombre),
      createNode('em', `${empleado.puntos} pts`)
    );
    lista.appendChild(item);
  });
  panel.append(header, lista);
  return panel;
}

/**
 * Registra todos los listeners de la aplicación.
 * @returns {void}
 */
function inicializarEventos() {
  const formLogin = document.getElementById('form-login');
  if (formLogin) formLogin.addEventListener('submit', manejarLogin);

  document.addEventListener('click', manejarClicksGlobales);
  document.addEventListener('keydown', manejarTeclado);

  const filtroHabitos = document.getElementById('filtro-habitos');
  if (filtroHabitos) filtroHabitos.addEventListener('change', manejarFiltroHabitos);

  const contenedorHabitos = document.getElementById('lista-habitos');
  if (contenedorHabitos) {
    contenedorHabitos.addEventListener('mouseover', mostrarTooltip);
    contenedorHabitos.addEventListener('mouseout', ocultarTooltip);
  }
  window.addEventListener('storage', manejarCambioStorage);
}

/**
 * Carga los datos iniciales si la página los necesita.
 * @returns {Promise<void>} Finalización de carga.
 */
async function cargarDatosIniciales() {
  // Si el usuario ya inició sesión antes, se le rellena el email automáticamente.
  const emailRecordado = obtenerEmailRecordado();
  const inputEmail = document.getElementById('input-email');
  if (inputEmail && emailRecordado) inputEmail.value = emailRecordado;

  // Los hábitos solo se cargan si realmente estamos en el panel del empleado.
  if (document.getElementById('lista-habitos') && document.getElementById('retos-empleado-lista')) {
    try {
      await cargarHabitos();
      const empleadoId = obtenerSesionActiva()?.id ?? 'u001';
      sincronizarResumenUsuario(empleadoId);
      actualizarKPIsEmpleado(empleadoId);
      renderizarSiguienteLogroEmpleado(empleadoId);
      renderizarMisionEmpleado(empleadoId);
      renderizarRetosEmpleado(empleadoId);
    } catch (error) {
      mostrarNotificacion(error.message, 'error');
    }
  }

  renderizarHabitoDiaApi();
  inicializarPanelManager();
  inicializarPanelEmpleado();
}

/**
 * Maneja el envío del formulario de login.
 * @param {SubmitEvent} e - Evento submit.
 * @returns {Promise<void>} Finalización del login.
 */
async function manejarLogin(e) {
  e.preventDefault();
  const email = document.getElementById('input-email').value;
  const password = document.getElementById('input-password').value;
  limpiarErrores();
  let hayErrores = false;

  if (!validarEmail(email)) {
    mostrarError('error-email', 'Email no válido');
    hayErrores = true;
  }
  if (!validarPassword(password)) {
    mostrarError('error-password', 'Mínimo 8 caracteres, una mayúscula y un número');
    hayErrores = true;
  }
  if (hayErrores) return;

  try {
    const usuario = await iniciarSesion(email, password);
    redirigirSegunRol(usuario.rol);
  } catch (err) {
    mostrarError('error-general', err.message);
  }
}

/**
 * Delegación de eventos de click en el documento.
 * @param {MouseEvent} e - Evento click.
 * @returns {void}
 */
function manejarClicksGlobales(e) {
  const target = e.target.closest('[data-accion]');
  if (!target) return;
  const accion = target.dataset.accion;
  const id = target.dataset.id;

  // Así casi todas las acciones importantes se controlan desde un único click global.
  const acciones = {
    'completar-habito': () => manejarCompletarHabito(id),
    'login-facial-demo': () => iniciarAccesoFacialDemo(),
    'confirmar-facial-demo': () => confirmarAccesoFacialDemo(),
    'cancelar-facial-demo': () => cancelarAccesoFacialDemo(),
    'editar-reto': () => abrirEdicionReto(id),
    'cancelar-edicion-reto': () => cancelarEdicionReto(),
    'guardar-edicion-reto': () => guardarEdicionReto(id),
    'cerrar-sesion': () => cerrarSesion()
  };
  acciones[accion]?.();
}

/**
 * Completa un hábito y sincroniza el progreso en JSON con un endpoint de demostración.
 * @param {string} id - Identificador del hábito.
 * @returns {Promise<void>} Finalización del flujo.
 */
async function manejarCompletarHabito(id) {
  const habito = completarHabito(id);
  if (!habito) return;
  const empleadoId = obtenerSesionActiva()?.id ?? 'u001';

  sincronizarResumenUsuario(empleadoId);
  actualizarKPIsEmpleado(empleadoId);
  renderizarSiguienteLogroEmpleado(empleadoId);
  renderizarMisionEmpleado(empleadoId);
  renderizarRetosEmpleado(empleadoId);

  // Si solo se ha vuelto a dejar pendiente no hace falta mandar nada al endpoint.
  if (!habito.completado) return;
  const usuario = obtenerSesionActiva();

  const respuesta = await guardarProgresoServidor({
    usuarioId: usuario?.id ?? 'u001',
    habitoId: habito.id,
    titulo: habito.titulo,
    completado: habito.completado,
    puntosGanados: habito.puntos,
    fechaCompletado: habito.fechaCompletado?.toISOString?.() ?? new Date().toISOString()
  });
  if (!respuesta.ok) {
    mostrarNotificacion(respuesta.mensaje, 'error', 2600);
  }
}

/**
 * Renderiza en el panel empleado el hábito sugerido por la API externa.
 * @returns {Promise<void>} Finalización de la carga externa.
 */
async function renderizarHabitoDiaApi() {
  const contenedor = document.getElementById('habito-dia-api');
  if (!contenedor) return;
  try {
    // Esta parte no toca la lógica de hábitos; solo enseña una frase externa en la vista.
    const fraseDia = await obtenerHabitoDia();
    contenedor.innerHTML = `
      <div>
        <h2>${fraseDia.titulo}</h2>
        <p>${fraseDia.descripcion}</p>
      </div>
      <span class="api-badge">${fraseDia.icono} Frase del dia</span>
    `;
  } catch (error) {
    contenedor.querySelector('p:last-child').textContent = 'No se pudo cargar la frase del dia.';
  }
}

/**
 * Abre la webcam para simular un acceso facial.
 * @returns {Promise<void>} Finalización de la preparación de cámara.
 */
async function iniciarAccesoFacialDemo() {
  const panel = document.getElementById('face-demo-panel');
  const video = document.getElementById('face-demo-video');
  const estado = document.getElementById('face-demo-status');
  if (!panel || !video || !estado) return;

  panel.hidden = false;
  estado.textContent = 'Solicitando permiso de cámara...';

  try {
    streamFacialDemo = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 420 } },
      audio: false
    });
    video.srcObject = streamFacialDemo;
    estado.textContent = 'Cámara activa. Buscando rostro...';
    programarDeteccionFacialDemo(estado);
  } catch (error) {
    estado.textContent = 'No se pudo abrir la cámara. Revisa los permisos del navegador.';
    mostrarError('error-general', 'Permite la cámara para usar el acceso facial demo.');
  }
}

/**
 * Programa la detección facial demo tras activar la cámara.
 * @param {HTMLElement} estado - Elemento de estado de la cámara.
 * @returns {void}
 */
function programarDeteccionFacialDemo(estado) {
  clearTimeout(timeoutFacialDemo);
  timeoutFacialDemo = setTimeout(() => {
    estado.textContent = 'Rostro detectado en modo demo. Entrando...';
    confirmarAccesoFacialDemo();
  }, 1800);
}

/**
 * Confirma el acceso facial demo y redirige al panel del empleado.
 * @returns {Promise<void>} Finalización del acceso.
 */
async function confirmarAccesoFacialDemo() {
  try {
    const usuario = await iniciarSesionFacialDemo();
    detenerCamaraFacialDemo();
    redirigirSegunRol(usuario.rol);
  } catch (error) {
    mostrarError('error-general', error.message);
  }
}

/**
 * Cancela el acceso facial demo y apaga la cámara.
 * @returns {void}
 */
function cancelarAccesoFacialDemo() {
  const panel = document.getElementById('face-demo-panel');
  const estado = document.getElementById('face-demo-status');
  detenerCamaraFacialDemo();
  if (estado) estado.textContent = 'Acceso facial cancelado.';
  if (panel) panel.hidden = true;
}

/**
 * Detiene el stream de cámara del acceso facial demo.
 * @returns {void}
 */
function detenerCamaraFacialDemo() {
  clearTimeout(timeoutFacialDemo);
  if (streamFacialDemo) {
    streamFacialDemo.getTracks().forEach((track) => track.stop());
    streamFacialDemo = null;
  }
}

/**
 * Maneja atajos de teclado globales.
 * @param {KeyboardEvent} e - Evento de teclado.
 * @returns {void}
 */
function manejarTeclado(e) {
}

/**
 * Filtra los hábitos mostrados según el selector.
 * @param {Event} e - Evento change.
 * @returns {void}
 */
function manejarFiltroHabitos(e) {
  renderizarHabitos(e.target.value);
}

/**
 * Muestra realce al pasar el ratón sobre una tarjeta.
 * @param {MouseEvent} e - Evento mouseover.
 * @returns {void}
 */
function mostrarTooltip(e) {
  const tarjeta = e.target.closest('.habito-card');
  if (!tarjeta) return;
  tarjeta.style.transform = 'translateY(-4px)';
  tarjeta.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.35)';
  tarjeta.style.transition = 'all 0.2s ease';
}

/**
 * Oculta el realce al salir de la tarjeta.
 * @param {MouseEvent} e - Evento mouseout.
 * @returns {void}
 */
function ocultarTooltip(e) {
  const tarjeta = e.target.closest('.habito-card');
  if (!tarjeta) return;
  tarjeta.style.transform = '';
  tarjeta.style.boxShadow = '';
}

/**
 * Detecta cambios de sesión en otras pestañas.
 * @param {StorageEvent} e - Evento storage.
 * @returns {void}
 */
async function manejarCambioStorage(e) {
  if (e.key === 'sesion_usuario' && !e.newValue) {
    window.alert('Tu sesión se cerró en otra pestaña. Vuelve a iniciar sesión.');
    location.href = './login.html';
    return;
  }

  if (e.key?.startsWith('habitos_usuario_') || e.key?.startsWith('resumen_usuario_')) {
    await prepararDatosDinamicos();

    const empleadoId = obtenerSesionActiva()?.id ?? 'u001';
    if (document.getElementById('tabla-empleados')) {
      renderizarTablaEmpleados();
      actualizarKPIsManagerConWorker();
    }
    if (document.getElementById('retos-empleado-lista')) {
      actualizarKPIsEmpleado(empleadoId);
      renderizarSiguienteLogroEmpleado(empleadoId);
      renderizarMisionEmpleado(empleadoId);
      renderizarRetosEmpleado(empleadoId);
    }
  }
}

/**
 * Limpia mensajes de error del formulario.
 * @returns {void}
 */
function limpiarErrores() {
  document.querySelectorAll('.campo-error').forEach((error) => {
    error.textContent = '';
    error.classList.remove('visible');
  });
}

/**
 * Muestra un error asociado a un campo.
 * @param {string} id - Identificador del elemento de error.
 * @param {string} mensaje - Mensaje a mostrar.
 * @returns {void}
 */
function mostrarError(id, mensaje) {
  const error = document.getElementById(id);
  if (!error) return;
  error.textContent = mensaje;
  error.classList.add('visible');
}

/**
 * Inicializa el panel manager si está presente.
 * @returns {void}
 */
function inicializarPanelManager() {
  if (!document.getElementById('tabla-empleados')) return;
  renderizarTablaEmpleados();
  renderizarRetosManager();

  // Este cálculo se manda al worker para no cargar de más el hilo principal del navegador.
  actualizarKPIsManagerConWorker();
}

/**
 * Inicializa el panel empleado si está presente.
 * @returns {void}
 */
function inicializarPanelEmpleado() {
  if (!document.getElementById('retos-empleado-lista')) return;
  const empleadoId = obtenerSesionActiva()?.id ?? 'u001';
  sincronizarResumenUsuario(empleadoId);
  actualizarKPIsEmpleado(empleadoId);
  renderizarSiguienteLogroEmpleado(empleadoId);
  renderizarMisionEmpleado(empleadoId);
  renderizarRetosEmpleado(empleadoId);
}

/**
 * Actualiza los KPI principales del panel empleado usando el mismo resumen que ve el manager.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {void}
 */
function actualizarKPIsEmpleado(empleadoId) {
  const resumen = sincronizarResumenUsuario(empleadoId);
  if (!resumen) return;

  const racha = document.getElementById('kpi-empleado-racha');
  const puntos = document.getElementById('kpi-empleado-puntos');
  const nivel = document.getElementById('kpi-empleado-nivel');
  const retos = document.getElementById('kpi-empleado-retos');
  const retosTexto = document.getElementById('kpi-empleado-retos-texto');
  const retosActivos = obtenerRetos().filter((reto) => reto.empleadoId === 'todos' || reto.empleadoId === empleadoId);

  if (racha) racha.textContent = `${resumen.racha} dias`;
  if (puntos) puntos.textContent = `${resumen.puntosTotales} pts`;
  if (nivel) nivel.textContent = `Nivel ${obtenerNivelPorPuntos(resumen.puntosTotales).toLowerCase()}`;
  if (retos) retos.textContent = `${retosActivos.length}`;
  if (retosTexto) {
    retosTexto.textContent = `${resumen.habitosCompletados} hábitos completados en total`;
  }
}

/**
 * Actualiza la tarjeta de siguiente logro según la racha semanal visible.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {void}
 */
function renderizarSiguienteLogroEmpleado(empleadoId) {
  const titulo = document.getElementById('siguiente-logro-titulo');
  const descripcion = document.getElementById('siguiente-logro-descripcion');
  const porcentaje = document.getElementById('siguiente-logro-porcentaje');
  if (!titulo || !descripcion || !porcentaje) return;

  const rachaSemanal = calcularRachaSemanalVisible(empleadoId);
  const progreso = Math.min(100, Math.round((rachaSemanal / 7) * 100));

  titulo.textContent = 'Constancia de 7 dias';
  if (rachaSemanal >= 7) {
    descripcion.textContent = 'Semana cerrada: has alcanzado la constancia completa.';
  } else {
    descripcion.textContent = 'Completa el día actual para cerrar la semana al 100%.';
  }
  porcentaje.textContent = `${progreso}%`;
  porcentaje.style.setProperty('--ring-progress', `${Math.round((progreso / 100) * 360)}deg`);
}

/**
 * Renderiza la tabla de analíticas por empleado.
 * @returns {void}
 */
function renderizarTablaEmpleados() {
  const tabla = document.getElementById('tabla-empleados');
  if (!tabla) return;
  tabla.innerHTML = '';

  // El ranking sale de los puntos para que la tabla y los KPI estén midiendo lo mismo.
  const empleados = obtenerEmpleadosOrdenadosPorPuntos();
  const cabecera = crearFilaEmpleado(['Empleado', 'Puntos', 'Nivel', 'Ranking', 'Riesgo'], true);
  tabla.appendChild(cabecera);
  empleados.forEach((empleado) => tabla.appendChild(crearFilaEmpleado([
    `${empleado.iniciales} ${empleado.nombre}`,
    `${empleado.puntos} pts`,
    obtenerNivelPorPuntos(empleado.puntos),
    `#${empleados.findIndex((item) => item.id === empleado.id) + 1}`,
    empleado.riesgo
  ])));
}

/**
 * Crea una fila de la tabla de empleados.
 * @param {Array<string>} celdas - Textos de las celdas.
 * @param {boolean} esCabecera - Indica si la fila es cabecera.
 * @returns {HTMLElement} Fila creada.
 */
function crearFilaEmpleado(celdas, esCabecera = false) {
  const fila = createNode('div');
  fila.classList.add('employee-row');
  if (esCabecera) fila.classList.add('employee-row--head');
  celdas.forEach((texto) => {
    const celda = createNode('span', texto);
    fila.appendChild(celda);
  });
  return fila;
}

/**
 * Actualiza KPIs del manager desde los empleados cargados.
 * @returns {void}
 */
async function actualizarKPIsManagerConWorker() {
  const kpis = document.querySelectorAll('#kpis .kpi-card strong');
  const resumen = document.querySelector('.executive-summary h2');
  const resumenTexto = document.querySelector('.executive-summary p');

  try {
    const metricas = await calcularMetricasManagerAsync(obtenerEmpleadosSistema());
    if (kpis[0]) kpis[0].textContent = `${metricas.mediaPuntos} pts`;
    if (kpis[1]) kpis[1].textContent = `${metricas.topEmpleado?.puntos ?? 0} pts`;
    if (kpis[2]) kpis[2].textContent = `${metricas.totalEmpleados}`;

    if (resumen && metricas.topEmpleado) {
      resumen.textContent = `${metricas.topEmpleado.nombre} lidera el equipo por puntos`;
    }
    if (resumenTexto) {
      resumenTexto.textContent = `Promedio del equipo: ${metricas.mediaPuntos} puntos · Riesgo bajo: ${metricas.riesgoBajo} · Riesgo medio: ${metricas.riesgoMedio} · Riesgo alto: ${metricas.riesgoAlto}.`;
    }
  } catch (error) {
    console.error('Worker manager:', error);
    mostrarNotificacion('No se pudieron calcular las métricas avanzadas del manager', 'error');
  }
}

/**
 * Actualiza la misión final del panel empleado a partir de la racha real guardada.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {void}
 */
function renderizarMisionEmpleado(empleadoId) {
  const titulo = document.getElementById('mision-empleado-titulo');
  const descripcion = document.getElementById('mision-empleado-descripcion');
  const estado = document.getElementById('mision-empleado-estado');
  if (!titulo || !descripcion || !estado) return;

  const diasConsecutivos = calcularRachaSemanalVisible(empleadoId);
  const meta = 7;
  const progreso = Math.min(meta, diasConsecutivos);

  titulo.textContent = 'Mision: constancia saludable';
  if (diasConsecutivos >= 2) {
    descripcion.textContent = `Ya vas por tu ${diasConsecutivos}º día consecutivo con hábitos completados.`;
  } else if (diasConsecutivos === 1) {
    descripcion.textContent = 'Ya has arrancado la racha de hoy. Si mañana repites, subirás al segundo día consecutivo.';
  } else {
    descripcion.textContent = 'Completa al menos un hábito hoy para arrancar la racha saludable.';
  }
  estado.textContent = `${progreso}/${meta} dias consecutivos`;
}

/**
 * Ajusta un reto del empleado según su actividad real guardada.
 * @param {Object} reto - Reto base.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {Object} Reto con progreso calculado.
 */
function enriquecerRetoEmpleado(reto, empleadoId) {
  const diasConsecutivos = calcularDiasConsecutivosActividad(empleadoId);
  const avanceHoy = calcularAvanceDiarioPonderado(empleadoId);

  if (reto.id === 'reto-base-equipo') {
    return {
      ...reto,
      progreso: Math.min(reto.meta, reto.progreso + diasConsecutivos),
      descripcion: 'Avanza cada día seguido en el que completas al menos un hábito.'
    };
  }

  return {
    ...reto,
    progreso: Math.min(reto.meta, reto.progreso + avanceHoy),
    descripcion: 'Suma 1 por cada hábito grande de 200 puntos o más completados en el día.'
  };
}

/**
 * Obtiene una etiqueta de nivel simple según los puntos del empleado.
 * @param {number} puntos - Puntos acumulados.
 * @returns {string} Nivel textual.
 */
function obtenerNivelPorPuntos(puntos) {
  if (puntos >= 3000) return 'Avanzado';
  if (puntos >= 1500) return 'Competente';
  if (puntos >= 500) return 'Aprendiz';
  return 'Inicial';
}

/**
 * Calcula las métricas del panel manager con un Web Worker.
 * @param {Array<Object>} empleados - Empleados a procesar.
 * @returns {Promise<Object>} Métricas calculadas.
 */
function calcularMetricasManagerAsync(empleados) {
  return new Promise((resolve, reject) => {
    // El worker devuelve solo los datos ya calculados y aquí luego se decide cómo pintarlos.
    const worker = new Worker('./js/workers/stats.worker.js');
    worker.postMessage({
      tipo: 'calcular_metricas_manager',
      datos: { empleados }
    });

    worker.onmessage = (evento) => {
      worker.terminate();
      if (evento.data.ok) {
        resolve(evento.data.resultado);
        return;
      }
      reject(new Error(evento.data.error));
    };

    worker.onerror = (evento) => {
      worker.terminate();
      reject(new Error(evento.message));
    };
  });
}

/**
 * Renderiza los retos activos del manager.
 * @returns {void}
 */
function renderizarRetosManager() {
  renderizarEditorRetoManager();
  const lista = document.getElementById('retos-manager-lista');
  if (!lista) return;
  renderizarListaRetos(lista, obtenerRetos(), true, true);
}

/**
 * Renderiza los retos asignados al empleado.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {void}
 */
function renderizarRetosEmpleado(empleadoId) {
  const lista = document.getElementById('retos-empleado-lista');
  if (!lista) return;
  const retos = obtenerRetos()
    .filter((reto) => reto.empleadoId === 'todos' || reto.empleadoId === empleadoId)
    .map((reto) => enriquecerRetoEmpleado(reto, empleadoId));
  renderizarListaRetos(lista, retos, false);
}

/**
 * Renderiza una lista de retos en un contenedor.
 * @param {HTMLElement} contenedor - Contenedor destino.
 * @param {Array<Object>} retos - Retos a mostrar.
 * @param {boolean} mostrarAsignado - Muestra el empleado asignado.
 * @returns {void}
 */
function renderizarListaRetos(contenedor, retos, mostrarAsignado, editable = false) {
  contenedor.innerHTML = '';
  if (retos.length === 0) {
    const vacio = createNode('p', 'No hay retos activos todavía');
    vacio.classList.add('estado-vacio');
    contenedor.appendChild(vacio);
    return;
  }
  retos.forEach((reto) => contenedor.appendChild(crearTarjetaReto(reto, mostrarAsignado, editable)));
}

/**
 * Crea una tarjeta visual de reto.
 * @param {Object} reto - Reto a representar.
 * @param {boolean} mostrarAsignado - Indica si muestra asignación.
 * @returns {HTMLElement} Tarjeta creada.
 */
function crearTarjetaReto(reto, mostrarAsignado, editable = false) {
  const card = createNode('article');
  const porcentaje = Math.min(100, Math.round((reto.progreso / reto.meta) * 100));
  card.classList.add('reto-card');
  if (editable) card.classList.add('reto-card--manager');
  card.dataset.retoId = reto.id;

  const info = createNode('div');
  const etiqueta = createNode('span', mostrarAsignado ? reto.empleadoNombre : `Creado por ${reto.creadoPor}`);
  etiqueta.classList.add('reto-label');
  const titulo = createNode('strong', reto.titulo);
  const descripcion = createNode('p', reto.descripcion);
  info.append(etiqueta, titulo, descripcion);

  if (editable) {
    const acciones = createNode('div');
    acciones.classList.add('reto-card-actions');
    const editar = createNode('button', 'Editar');
    editar.type = 'button';
    editar.classList.add('ghost-button');
    editar.dataset.accion = 'editar-reto';
    editar.dataset.id = reto.id;
    acciones.appendChild(editar);
    card.append(info, acciones);
    return card;
  }

  const progreso = createNode('div');
  progreso.classList.add('reto-progress');
  progreso.innerHTML = `
    <span>${reto.progreso}/${reto.meta}</span>
    <div><i style="width:${porcentaje}%"></i></div>
  `;
  card.append(info, progreso);
  return card;
}

/**
 * Devuelve los retos guardados o los iniciales.
 * @returns {Array<Object>} Retos activos.
 */
function obtenerRetos() {
  // Si ya había retos guardados de antes, se recuperan esos en vez de empezar siempre desde cero.
  const raw = localStorage.getItem('efficium_retos_manager');
  return raw ? JSON.parse(raw) : crearRetosInicialesDinamicos();
}

/**
 * Pinta el editor del manager en un bloque aparte cuando se pulsa el botón de editar.
 * @returns {void}
 */
function renderizarEditorRetoManager() {
  const contenedor = document.getElementById('reto-editor-manager');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  if (!retoEditandoId) return;
  const reto = obtenerRetos().find((item) => item.id === retoEditandoId);
  if (!reto) return;

  const panel = createNode('article');
  panel.classList.add('reto-editor-panel');
  panel.dataset.retoId = reto.id;

  const tituloPanel = createNode('div');
  tituloPanel.classList.add('panel-header');
  const copy = createNode('div');
  copy.append(crearEyebrow('Editar asignacion'), createNode('h2', reto.titulo));
  tituloPanel.appendChild(copy);

  const editor = createNode('div');
  editor.classList.add('reto-editor');

  const label = createNode('label', 'Dirigido a');
  label.setAttribute('for', `reto-empleado-${reto.id}`);
  const select = createNode('select');
  select.id = `reto-empleado-${reto.id}`;
  select.classList.add('reto-edit-empleado');
  [
    ['todos', 'Todo el equipo'],
    ...obtenerEmpleadosSistema().map((empleado) => [empleado.id, empleado.nombre])
  ].forEach(([valor, texto]) => {
    const option = createNode('option', texto);
    option.value = valor;
    if (valor === reto.empleadoId) option.selected = true;
    select.appendChild(option);
  });

  const titulo = createNode('input');
  titulo.type = 'text';
  titulo.value = reto.titulo;
  titulo.classList.add('reto-edit-titulo');
  titulo.setAttribute('aria-label', 'Título del reto');

  const descripcion = createNode('textarea');
  descripcion.value = reto.descripcion;
  descripcion.classList.add('reto-edit-descripcion');
  descripcion.setAttribute('aria-label', 'Descripción del reto');

  const meta = createNode('input');
  meta.type = 'number';
  meta.min = '1';
  meta.value = String(reto.meta);
  meta.classList.add('reto-edit-meta');
  meta.setAttribute('aria-label', 'Meta del reto');

  editor.append(label, select, titulo, descripcion, meta);

  const acciones = createNode('div');
  acciones.classList.add('reto-editor-actions');
  const guardar = createNode('button', 'Guardar cambios');
  guardar.type = 'button';
  guardar.classList.add('button');
  guardar.dataset.accion = 'guardar-edicion-reto';
  guardar.dataset.id = reto.id;
  const cancelar = createNode('button', 'Cancelar');
  cancelar.type = 'button';
  cancelar.classList.add('ghost-button');
  cancelar.dataset.accion = 'cancelar-edicion-reto';
  cancelar.dataset.id = reto.id;
  acciones.append(guardar, cancelar);

  panel.append(tituloPanel, editor, acciones);
  contenedor.appendChild(panel);
}

/**
 * Guarda la lista de retos activa en localStorage.
 * @param {Array<Object>} retos - Retos a persistir.
 * @returns {void}
 */
function guardarRetos(retos) {
  localStorage.setItem('efficium_retos_manager', JSON.stringify(retos));
}

/**
 * Devuelve el nombre visible del destinatario de un reto.
 * @param {string} empleadoId - Identificador del destinatario.
 * @returns {string} Nombre a mostrar.
 */
function obtenerNombreDestinatario(empleadoId) {
  if (empleadoId === 'todos') return 'Todo el equipo';
  return obtenerEmpleadosSistema().find((empleado) => empleado.id === empleadoId)?.nombre ?? 'Empleado';
}

/**
 * Activa el modo edición visual de un reto del manager.
 * @param {string} retoId - Identificador del reto.
 * @returns {void}
 */
function abrirEdicionReto(retoId) {
  retoEditandoId = retoId;
  renderizarRetosManager();
}

/**
 * Sale del modo edición sin guardar cambios.
 * @returns {void}
 */
function cancelarEdicionReto() {
  retoEditandoId = null;
  renderizarRetosManager();
}

/**
 * Guarda los cambios hechos desde la tarjeta visual del reto.
 * @param {string} retoId - Identificador del reto.
 * @returns {void}
 */
function guardarEdicionReto(retoId) {
  const panel = document.querySelector(`#reto-editor-manager [data-reto-id="${retoId}"]`);
  if (!panel) return;

  const titulo = panel.querySelector('.reto-edit-titulo')?.value.trim();
  const descripcion = panel.querySelector('.reto-edit-descripcion')?.value.trim();
  const empleadoId = panel.querySelector('.reto-edit-empleado')?.value ?? 'todos';
  const meta = Number(panel.querySelector('.reto-edit-meta')?.value ?? 1);

  if (!titulo || !descripcion || meta < 1) {
    mostrarNotificacion('Revisa el título, la descripción y la meta del reto', 'error');
    return;
  }

  const retosActualizados = obtenerRetos().map((reto) => (
    reto.id === retoId
      ? {
        ...reto,
        titulo,
        descripcion,
        empleadoId,
        empleadoNombre: obtenerNombreDestinatario(empleadoId),
        meta,
        progreso: Math.min(reto.progreso, meta)
      }
      : reto
  ));

  guardarRetos(retosActualizados);
  retoEditandoId = null;
  renderizarRetosManager();

  const empleadoIdActivo = obtenerSesionActiva()?.id ?? 'u001';
  if (document.getElementById('retos-empleado-lista')) {
    actualizarKPIsEmpleado(empleadoIdActivo);
    renderizarRetosEmpleado(empleadoIdActivo);
  }

  mostrarNotificacion('Asignación actualizada', 'exito');
}
