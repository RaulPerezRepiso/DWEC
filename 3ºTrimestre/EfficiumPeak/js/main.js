/**
 * @file main.js
 * @description Punto de entrada de Efficium Peak. Inicializa todos los eventos.
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

import { iniciarSesion, iniciarSesionBiometrico, iniciarSesionFacialDemo, cerrarSesion, redirigirSegunRol, obtenerInfoNavegador } from './modules/auth.js';
import { cargarHabitos, renderizarHabitos, completarHabito } from './modules/habitos.js';
import { abrirHistorialEmpleado, mostrarNotificacion } from './modules/dom.js';
import { obtenerHabitoDia } from './modules/api.js';
import { validarEmail, validarPassword } from './modules/validacion.js';
import { obtenerEmailRecordado } from './modules/storage.js';

const EMPLEADOS_DEMO = [
  {
    id: 'u001',
    iniciales: 'RP',
    nombre: 'Raúl Pérez',
    rol: 'Empleado',
    puntos: 1250,
    racha: 6,
    habitos: 18,
    progreso: 82,
    riesgo: 'Bajo'
  },
  {
    id: 'u003',
    iniciales: 'RM',
    nombre: 'Raquel Martín',
    rol: 'Empleado',
    puntos: 2140,
    racha: 9,
    habitos: 24,
    progreso: 91,
    riesgo: 'Bajo'
  },
  {
    id: 'u004',
    iniciales: 'PG',
    nombre: 'Paula García',
    rol: 'Empleado',
    puntos: 980,
    racha: 3,
    habitos: 11,
    progreso: 58,
    riesgo: 'Medio'
  }
];

const RETOS_INICIALES = [
  {
    id: 'reto-demo-1',
    titulo: 'Equipo al día',
    descripcion: 'Registrar los hábitos clave durante tres días seguidos.',
    empleadoId: 'todos',
    empleadoNombre: 'Todo el equipo',
    meta: 3,
    progreso: 1,
    creadoPor: 'Marcos Gómez'
  },
  {
    id: 'reto-demo-2',
    titulo: 'Sprint de foco individual',
    descripcion: 'Completar cinco bloques de trabajo profundo esta semana.',
    empleadoId: 'u001',
    empleadoNombre: 'Raúl Pérez',
    meta: 5,
    progreso: 2,
    creadoPor: 'Marcos Gómez'
  }
];

let streamFacialDemo = null;
let timeoutFacialDemo = null;

document.addEventListener('DOMContentLoaded', () => {
  inicializarEventos();
  cargarDatosIniciales();
});

/**
 * Registra todos los listeners de la aplicación.
 * @returns {void}
 */
function inicializarEventos() {
  const formLogin = document.getElementById('form-login');
  if (formLogin) formLogin.addEventListener('submit', manejarLogin);

  const formReto = document.getElementById('form-reto-manager');
  if (formReto) formReto.addEventListener('submit', manejarCreacionReto);

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
  const emailRecordado = obtenerEmailRecordado();
  const inputEmail = document.getElementById('input-email');
  if (inputEmail && emailRecordado) inputEmail.value = emailRecordado;

  if (document.getElementById('lista-habitos')) {
    try {
      await cargarHabitos();
    } catch (error) {
      mostrarNotificacion(error.message, 'error');
    }
  }

  const diagnostico = document.getElementById('diagnostico-navegador');
  if (diagnostico) renderizarEstadoEntorno(diagnostico);

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
  const acciones = {
    'completar-habito': () => completarHabito(id),
    'ver-historial': () => abrirHistorialEmpleado(crearHistorialEmpleadoDemo(id)),
    'login-biometrico': () => manejarLoginBiometrico(),
    'login-facial-demo': () => iniciarAccesoFacialDemo(),
    'confirmar-facial-demo': () => confirmarAccesoFacialDemo(),
    'cancelar-facial-demo': () => cancelarAccesoFacialDemo(),
    'cerrar-sesion': () => cerrarSesion(),
    'cerrar-modal': () => cerrarModal(),
    'abrir-modal-reto': () => abrirModalReto(id)
  };
  acciones[accion]?.();
}

/**
 * Renderiza en el panel empleado el hábito sugerido por la API externa.
 * @returns {Promise<void>} Finalización de la carga externa.
 */
async function renderizarHabitoDiaApi() {
  const contenedor = document.getElementById('habito-dia-api');
  if (!contenedor) return;
  try {
    const habito = await obtenerHabitoDia();
    contenedor.innerHTML = `
      <div>
        <p class="eyebrow">API externa</p>
        <h2>${habito.titulo}</h2>
        <p>${habito.descripcion}</p>
      </div>
      <span class="api-badge">${habito.icono} +${habito.puntos} pts</span>
    `;
  } catch (error) {
    contenedor.querySelector('p:last-child').textContent = 'No se pudo cargar la recomendación externa.';
  }
}

/**
 * Maneja el acceso biométrico mediante WebAuthn o modo demo.
 * @returns {Promise<void>} Finalización del acceso.
 */
async function manejarLoginBiometrico() {
  try {
    const usuario = await iniciarSesionBiometrico();
    redirigirSegunRol(usuario.rol);
  } catch (error) {
    mostrarError('error-general', error.message);
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
 * Maneja la creación de retos desde el panel manager.
 * @param {SubmitEvent} e - Evento submit del formulario.
 * @returns {void}
 */
function manejarCreacionReto(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const datos = new FormData(form);
  const empleadoId = datos.get('empleado');
  const reto = {
    id: `reto-${Date.now()}`,
    titulo: String(datos.get('titulo')).trim(),
    descripcion: String(datos.get('descripcion')).trim(),
    empleadoId,
    empleadoNombre: obtenerNombreEmpleado(empleadoId),
    meta: Number(datos.get('meta')),
    progreso: 0,
    creadoPor: 'Marcos Gómez'
  };

  if (!reto.titulo || !reto.descripcion || reto.meta <= 0) {
    mostrarNotificacion('Completa el título, la descripción y una meta válida', 'error');
    return;
  }

  guardarReto(reto);
  renderizarRetosManager();
  renderizarRetosEmpleado('u001');
  cerrarModal();
  mostrarNotificacion(`Reto asignado a ${reto.empleadoNombre}`, 'exito');
}

/**
 * Maneja atajos de teclado globales.
 * @param {KeyboardEvent} e - Evento de teclado.
 * @returns {void}
 */
function manejarTeclado(e) {
  if (e.key === 'Escape') cerrarModal();
  if (e.key === 'Enter' && e.ctrlKey) document.getElementById('btn-guardar')?.click();
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
function manejarCambioStorage(e) {
  if (e.key === 'sesion_usuario' && !e.newValue) {
    window.alert('Tu sesión se cerró en otra pestaña. Vuelve a iniciar sesión.');
    location.href = './login.html';
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
 * Cierra un modal abierto.
 * @returns {void}
 */
function cerrarModal() {
  document.querySelector('[data-modal].visible')?.classList.remove('visible');
}

/**
 * Abre el modal de reto con un id dado.
 * @param {string} id - Identificador del reto.
 * @returns {void}
 */
function abrirModalReto(id) {
  const modal = document.querySelector('[data-modal="reto"]');
  if (modal) modal.classList.add('visible');
  mostrarNotificacion(`Reto seleccionado: ${id}`, 'info');
}

/**
 * Muestra un resumen legible del estado del navegador sin exponer rutas técnicas.
 * @param {HTMLElement} contenedor - Elemento donde se mostrará el estado.
 * @returns {void}
 */
function renderizarEstadoEntorno(contenedor) {
  const info = obtenerInfoNavegador();
  const idioma = info.idioma.split('-')[0].toUpperCase();
  const pagina = info.ruta.includes('manager') ? 'Panel manager' : 'Panel empleado';
  contenedor.innerHTML = `
    <span class="status-dot ${info.online ? 'online' : 'offline'}"></span>
    <div>
      <strong>${info.online ? 'Sistema online' : 'Sin conexión'}</strong>
      <small>${pagina} · Idioma ${idioma}</small>
    </div>
  `;
}

/**
 * Inicializa el panel manager si está presente.
 * @returns {void}
 */
function inicializarPanelManager() {
  if (!document.getElementById('tabla-empleados')) return;
  renderizarTablaEmpleados();
  renderizarRetosManager();
  actualizarKPIsManager();
}

/**
 * Inicializa el panel empleado si está presente.
 * @returns {void}
 */
function inicializarPanelEmpleado() {
  if (!document.getElementById('retos-empleado-lista')) return;
  renderizarRetosEmpleado('u001');
}

/**
 * Renderiza la tabla de analíticas por empleado.
 * @returns {void}
 */
function renderizarTablaEmpleados() {
  const tabla = document.getElementById('tabla-empleados');
  if (!tabla) return;
  tabla.innerHTML = '';
  const cabecera = crearFilaEmpleado(['Empleado', 'Racha', 'Hábitos', 'Progreso', 'Riesgo'], true);
  tabla.appendChild(cabecera);
  EMPLEADOS_DEMO.forEach((empleado) => tabla.appendChild(crearFilaEmpleado([
    `${empleado.iniciales} ${empleado.nombre}`,
    `${empleado.racha} días`,
    `${empleado.habitos} completados`,
    `${empleado.progreso}%`,
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
  const fila = document.createElement('div');
  fila.classList.add('employee-row');
  if (esCabecera) fila.classList.add('employee-row--head');
  celdas.forEach((texto) => {
    const celda = document.createElement('span');
    celda.textContent = texto;
    fila.appendChild(celda);
  });
  return fila;
}

/**
 * Actualiza KPIs del manager desde los empleados de demo.
 * @returns {void}
 */
function actualizarKPIsManager() {
  const totalProgreso = EMPLEADOS_DEMO.reduce((acc, empleado) => acc + empleado.progreso, 0);
  const progresoMedio = Math.round(totalProgreso / EMPLEADOS_DEMO.length);
  const rachaMedia = Math.round(
    EMPLEADOS_DEMO.reduce((acc, empleado) => acc + empleado.racha, 0) / EMPLEADOS_DEMO.length
  );
  const kpis = document.querySelectorAll('#kpis .kpi-card strong');
  if (kpis[0]) kpis[0].textContent = `${progresoMedio}%`;
  if (kpis[1]) kpis[1].textContent = `${rachaMedia} días`;
  if (kpis[2]) kpis[2].textContent = `${EMPLEADOS_DEMO.length}`;
}

/**
 * Renderiza los retos activos del manager.
 * @returns {void}
 */
function renderizarRetosManager() {
  const lista = document.getElementById('retos-manager-lista');
  if (!lista) return;
  renderizarListaRetos(lista, obtenerRetos(), true);
}

/**
 * Renderiza los retos asignados al empleado.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {void}
 */
function renderizarRetosEmpleado(empleadoId) {
  const lista = document.getElementById('retos-empleado-lista');
  if (!lista) return;
  const retos = obtenerRetos().filter((reto) => reto.empleadoId === 'todos' || reto.empleadoId === empleadoId);
  renderizarListaRetos(lista, retos, false);
}

/**
 * Renderiza una lista de retos en un contenedor.
 * @param {HTMLElement} contenedor - Contenedor destino.
 * @param {Array<Object>} retos - Retos a mostrar.
 * @param {boolean} mostrarAsignado - Muestra el empleado asignado.
 * @returns {void}
 */
function renderizarListaRetos(contenedor, retos, mostrarAsignado) {
  contenedor.innerHTML = '';
  if (retos.length === 0) {
    const vacio = document.createElement('p');
    vacio.classList.add('estado-vacio');
    vacio.textContent = 'No hay retos activos todavía';
    contenedor.appendChild(vacio);
    return;
  }
  retos.forEach((reto) => contenedor.appendChild(crearTarjetaReto(reto, mostrarAsignado)));
}

/**
 * Crea una tarjeta visual de reto.
 * @param {Object} reto - Reto a representar.
 * @param {boolean} mostrarAsignado - Indica si muestra asignación.
 * @returns {HTMLElement} Tarjeta creada.
 */
function crearTarjetaReto(reto, mostrarAsignado) {
  const card = document.createElement('article');
  const porcentaje = Math.min(100, Math.round((reto.progreso / reto.meta) * 100));
  card.classList.add('reto-card');
  card.innerHTML = `
    <div>
      <span class="reto-label">${mostrarAsignado ? reto.empleadoNombre : `Creado por ${reto.creadoPor}`}</span>
      <strong>${reto.titulo}</strong>
      <p>${reto.descripcion}</p>
    </div>
    <div class="reto-progress">
      <span>${reto.progreso}/${reto.meta}</span>
      <div><i style="width:${porcentaje}%"></i></div>
    </div>
  `;
  return card;
}

/**
 * Devuelve los retos guardados o los iniciales.
 * @returns {Array<Object>} Retos activos.
 */
function obtenerRetos() {
  const raw = localStorage.getItem('efficium_retos_manager');
  return raw ? JSON.parse(raw) : RETOS_INICIALES;
}

/**
 * Guarda un reto nuevo manteniendo los existentes.
 * @param {Object} reto - Reto creado.
 * @returns {void}
 */
function guardarReto(reto) {
  const retos = obtenerRetos();
  retos.unshift(reto);
  localStorage.setItem('efficium_retos_manager', JSON.stringify(retos));
}

/**
 * Obtiene el nombre del empleado asignado.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {string} Nombre del empleado o equipo.
 */
function obtenerNombreEmpleado(empleadoId) {
  if (empleadoId === 'todos') return 'Todo el equipo';
  return EMPLEADOS_DEMO.find((empleado) => empleado.id === empleadoId)?.nombre ?? 'Empleado';
}

/**
 * Crea un historial completo de demo para la ventana auxiliar del empleado.
 * @param {string} empleadoId - Identificador del empleado.
 * @returns {Object} Historial enriquecido con hábitos, retos y misiones.
 */
function crearHistorialEmpleadoDemo(empleadoId) {
  const empleado = EMPLEADOS_DEMO.find((item) => item.id === empleadoId) ?? EMPLEADOS_DEMO[0];
  const retos = obtenerRetos().filter((reto) => reto.empleadoId === 'todos' || reto.empleadoId === empleado.id);
  return {
    id: empleado.id,
    nombre: empleado.nombre,
    racha: empleado.racha,
    puntos: empleado.puntos,
    nivel: empleado.progreso >= 90 ? 4 : 2,
    habitosCompletados: [
      { icono: '💧', titulo: 'Hidratación matutina', tipo: 'diario', puntos: 50, completado: true, fechaCompletado: new Date().toISOString() },
      { icono: '📚', titulo: 'Lectura 20 minutos', tipo: 'diario', puntos: 75, completado: true, fechaCompletado: new Date().toISOString() },
      { icono: '🧘', titulo: 'Meditación', tipo: 'diario', puntos: 60, completado: false, fechaCompletado: null }
    ],
    retosAsignados: retos,
    misionesCompletadas: [
      {
        titulo: 'Misión: Equilibrio total',
        descripcion: 'Combina enfoque, descanso y bienestar durante todo el mes.',
        progreso: 68,
        completada: false,
        puntosBonus: 800
      }
    ]
  };
}
