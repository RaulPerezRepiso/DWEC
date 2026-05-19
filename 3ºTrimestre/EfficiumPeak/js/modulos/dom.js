/**
 * Crea nodos HTML con o sin contenido de texto.
 * @param {string} tipoNodo - Etiqueta HTML a crear.
 * @param {string} [tipoTexto] - Texto opcional para el nodo.
 * @returns {HTMLElement} Nodo creado.
 */
export function createNode(tipoNodo, tipoTexto) {
  let nodo;
  let nodoText;

  switch (arguments.length) {
    case 0:
      throw new Error('Se necesitas al menos el tipo de elemento a crear.');
    case 1:
      nodo = document.createElement(tipoNodo);
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
      break;
    default:
      nodo = document.createElement(tipoNodo);
  }

  return nodo;
}

/**
 * Crea una tarjeta de hábito de forma dinámica.
 * @param {import('../clases/Habito.js').Habito|Object} habito - Hábito a renderizar.
 * @returns {HTMLElement} Tarjeta creada.
 */
export function crearTarjetaHabito(habito) {
  const card = createNode('div');

  // La propia tarjeta hace de control interactivo y guarda en dataset la acción que le toca hacer.
  card.classList.add('habito-card');
  card.dataset.habitoId = habito.id;
  card.dataset.accion = 'completar-habito';
  card.dataset.id = habito.id;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-checked', String(habito.completado));
  card.setAttribute('tabindex', '0');

  const icono = createNode('span', habito.icono);
  icono.classList.add('habito-icono');

  const info = createNode('div');
  info.classList.add('habito-info');

  const titulo = createNode('h3', habito.titulo);
  titulo.classList.add('habito-titulo');

  const desc = createNode('p', habito.descripcion);
  desc.classList.add('habito-desc');

  const puntos = createNode('span', `+${habito.puntos} pts`);
  puntos.classList.add('habito-puntos');

  info.append(titulo, desc);
  card.append(icono, info, puntos);
  if (habito.completado) aplicarEstiloCompletado(card);
  return card;
}

/**
 * Aplica los estilos visuales de hábito completado.
 * @param {HTMLElement} card - Tarjeta del hábito.
 * @returns {void}
 */
export function aplicarEstiloCompletado(card) {
  quitarEstiloCompletado(card);
  card.classList.add('completado');
  card.setAttribute('aria-checked', 'true');
  card.style.opacity = '0.6';
  card.style.borderColor = '#22c55e';
  card.style.cursor = 'pointer';

  const check = createNode('span', '✅');
  check.classList.add('check-completado');
  check.setAttribute('aria-label', 'Completado');
  card.prepend(check);
}

/**
 * Quita los estilos visuales de hábito completado.
 * @param {HTMLElement} card - Tarjeta del hábito.
 * @returns {void}
 */
export function quitarEstiloCompletado(card) {
  card.classList.remove('completado');
  card.setAttribute('aria-checked', 'false');
  card.style.opacity = '';
  card.style.borderColor = '';
  card.style.cursor = '';
  card.querySelector('.check-completado')?.remove();
}

/**
 * Renderiza la lista completa de hábitos en el contenedor.
 * @param {Array} habitos - Hábitos disponibles.
 * @param {string} filtro - Filtro seleccionado.
 * @returns {void}
 */
export function renderizarListaHabitos(habitos, filtro = 'todos') {
  const contenedor = document.getElementById('lista-habitos');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  // El filtro no cambia los datos originales, solo decide qué parte de la lista se enseña.
  const habitosFiltrados = filtro === 'todos' ? habitos : habitos.filter((habito) => habito.tipo === filtro);
  if (habitosFiltrados.length === 0) {
    contenedor.appendChild(crearMensajeVacio('No hay hábitos para este filtro'));
    return;
  }
  const fragment = document.createDocumentFragment();
  habitosFiltrados.forEach((habito) => fragment.appendChild(crearTarjetaHabito(habito)));
  contenedor.appendChild(fragment);
  actualizarContadorHabitos(habitosFiltrados);
}

/**
 * Crea un mensaje de estado vacío.
 * @param {string} mensaje - Mensaje a mostrar.
 * @returns {HTMLElement} Elemento creado.
 */
function crearMensajeVacio(mensaje) {
  const div = createNode('div');
  div.classList.add('estado-vacio');
  div.setAttribute('role', 'status');
  div.innerHTML = `<span>📭</span><p>${mensaje}</p>`;
  return div;
}

/**
 * Actualiza el contador de hábitos completados en la UI.
 * @param {Array} habitos - Hábitos visibles.
 * @returns {void}
 */
function actualizarContadorHabitos(habitos) {
  const completados = habitos.filter((habito) => habito.completado).length;
  const total = habitos.length;
  const contador = document.getElementById('contador-habitos');
  if (contador) {
    contador.textContent = `${completados}/${total} completados`;
    contador.setAttribute('aria-label', `${completados} de ${total} hábitos completados`);
  }
  const barra = document.getElementById('barra-progreso');
  if (barra) {
    const porcentaje = total > 0 ? (completados / total) * 100 : 0;
    barra.style.width = `${porcentaje}%`;
    barra.style.background = porcentaje === 100 ? '#22c55e' : '#7c3aed';
    barra.setAttribute('aria-valuenow', String(Math.round(porcentaje)));
  }
}

/**
 * Muestra una notificación temporal en pantalla.
 * @param {string} mensaje - Texto de la notificación.
 * @param {'exito'|'error'|'info'} tipo - Tipo visual.
 * @param {number} duracion - Duración en milisegundos.
 * @returns {void}
 */
export function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
  const notif = createNode('div', mensaje);
  notif.classList.add('notificacion', `notificacion--${tipo}`);
  notif.setAttribute('role', 'alert');
  notif.setAttribute('aria-live', 'polite');
  const iconos = { exito: '✅', error: '❌', info: 'ℹ️' };
  notif.prepend(createNode('span', iconos[tipo]));
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add('visible'));
  setTimeout(() => {
    notif.classList.remove('visible');
    notif.addEventListener('transitionend', () => notif.remove(), { once: true });
  }, duracion);
}

/**
 * Muestra u oculta el spinner de carga.
 * @param {boolean} visible - Estado visible.
 * @returns {void}
 */
export function toggleSpinner(visible) {
  let spinner = document.getElementById('spinner-global');
  if (!spinner && visible) {
    spinner = createNode('div');
    spinner.id = 'spinner-global';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Cargando...');
    spinner.innerHTML = '<div class="spinner-anillo"></div>';
    document.body.appendChild(spinner);
  } else if (spinner && !visible) {
    spinner.remove();
  }
}

/**
 * Abre una ventana auxiliar con el historial completo del usuario activo.
 * @param {Object} datos - Datos ya calculados para pintar el historial.
 * @returns {void}
 */
export function abrirHistorialUsuario(datos) {
  const ventana = window.open('', `historial_${datos.usuario.id}`, 'width=760,height=680,scrollbars=yes,resizable=yes');
  if (!ventana) {
    mostrarNotificacion('El navegador ha bloqueado la ventana de historial', 'error');
    return;
  }

  const doc = ventana.document;
  doc.title = `Historial de ${datos.usuario.nombre}`;
  doc.documentElement.lang = 'es';
  doc.head.innerHTML = '';
  doc.body.innerHTML = '';
  doc.head.appendChild(crearHojaEstilosHistorial(doc));

  doc.body.append(
    crearNodoHistorial(doc, 'h1', `Historial de ${datos.usuario.nombre}`),
    crearNodoHistorial(doc, 'p', `${datos.usuario.email} - ${datos.usuario.rol}`),
    crearKPIsHistorial(doc, datos),
    crearNodoHistorial(doc, 'h2', 'Habitos del usuario'),
    crearTablaHabitosHistorial(doc, datos.habitos),
    crearNodoHistorial(doc, 'h2', 'Retos y misiones asignadas'),
    crearGridRetosHistorial(doc, datos.retos)
  );
}

/**
 * Crea un nodo dentro de la ventana auxiliar.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {string} tipo - Etiqueta HTML.
 * @param {string} texto - Texto visible.
 * @param {string} [clase] - Clase CSS opcional.
 * @returns {HTMLElement} Nodo creado.
 */
function crearNodoHistorial(doc, tipo, texto, clase = '') {
  const nodo = doc.createElement(tipo);
  nodo.textContent = texto;
  if (clase) nodo.classList.add(clase);
  return nodo;
}

/**
 * Carga la hoja de estilos propia de la ventana auxiliar.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @returns {HTMLLinkElement} Enlace a la hoja de estilos.
 */
function crearHojaEstilosHistorial(doc) {
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./css/historial.css', window.location.href).href;
  return link;
}

/**
 * Crea las tarjetas resumen del historial.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {Object} datos - Datos del usuario.
 * @returns {HTMLElement} Contenedor de KPIs.
 */
function crearKPIsHistorial(doc, datos) {
  const kpis = doc.createElement('section');
  kpis.classList.add('kpis');
  kpis.append(
    crearKPIHistorial(doc, 'Puntos', Number(datos.resumen?.puntosTotales ?? datos.usuario.puntos ?? 0)),
    crearKPIHistorial(doc, 'Racha', `${Number(datos.resumen?.racha ?? datos.usuario.racha ?? 0)} dias`),
    crearKPIHistorial(doc, 'Nivel', datos.nivel),
    crearKPIHistorial(doc, 'Habitos completados', Number(datos.resumen?.habitosCompletados ?? 0))
  );
  return kpis;
}

/**
 * Crea una tarjeta KPI de la ventana auxiliar.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {string} titulo - Nombre de la metrica.
 * @param {string|number} valor - Valor de la metrica.
 * @returns {HTMLElement} Tarjeta KPI.
 */
function crearKPIHistorial(doc, titulo, valor) {
  const article = doc.createElement('article');
  article.classList.add('kpi');
  article.append(
    crearNodoHistorial(doc, 'span', titulo),
    crearNodoHistorial(doc, 'strong', String(valor))
  );
  return article;
}

/**
 * Crea la tabla de habitos del historial.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {Array<Object>} habitos - Habitos del usuario.
 * @returns {HTMLTableElement} Tabla creada.
 */
function crearTablaHabitosHistorial(doc, habitos) {
  const table = doc.createElement('table');
  const thead = doc.createElement('thead');
  const tbody = doc.createElement('tbody');
  const header = doc.createElement('tr');

  ['Habito', 'Tipo', 'Puntos', 'Estado', 'Fecha'].forEach((texto) => {
    header.appendChild(crearNodoHistorial(doc, 'th', texto));
  });
  thead.appendChild(header);

  if (habitos.length === 0) {
    const fila = doc.createElement('tr');
    const celda = crearNodoHistorial(doc, 'td', 'Sin habitos cargados');
    celda.colSpan = 5;
    fila.appendChild(celda);
    tbody.appendChild(fila);
  } else {
    habitos.forEach((habito) => tbody.appendChild(crearFilaHabitoHistorial(doc, habito)));
  }

  table.append(thead, tbody);
  return table;
}

/**
 * Crea una fila para un habito del historial.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {Object} habito - Habito a mostrar.
 * @returns {HTMLTableRowElement} Fila creada.
 */
function crearFilaHabitoHistorial(doc, habito) {
  const fila = doc.createElement('tr');
  const fecha = habito.fechaCompletado ? new Date(habito.fechaCompletado).toLocaleDateString('es-ES') : '-';
  [
    habito.titulo,
    habito.tipo,
    `${Number(habito.puntos ?? 0)} pts`,
    habito.completado ? 'Completado' : 'Pendiente',
    fecha
  ].forEach((texto) => fila.appendChild(crearNodoHistorial(doc, 'td', texto)));
  return fila;
}

/**
 * Crea el contenedor de retos de la ventana auxiliar.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {Array<Object>} retos - Retos del usuario.
 * @returns {HTMLElement} Contenedor de tarjetas.
 */
function crearGridRetosHistorial(doc, retos) {
  const grid = doc.createElement('section');
  grid.classList.add('grid');

  if (retos.length === 0) {
    const card = doc.createElement('article');
    card.classList.add('card');
    card.append(
      crearNodoHistorial(doc, 'strong', 'Sin retos activos'),
      crearNodoHistorial(doc, 'p', 'No hay retos asignados.')
    );
    grid.appendChild(card);
    return grid;
  }

  retos.forEach((reto) => grid.appendChild(crearTarjetaRetoHistorial(doc, reto)));
  return grid;
}

/**
 * Crea una tarjeta de reto para el historial.
 * @param {Document} doc - Documento de la ventana auxiliar.
 * @param {Object} reto - Reto a mostrar.
 * @returns {HTMLElement} Tarjeta creada.
 */
function crearTarjetaRetoHistorial(doc, reto) {
  const card = doc.createElement('article');
  const progress = doc.createElement('progress');
  progress.max = Number(reto.meta);
  progress.value = Number(reto.progreso);
  card.classList.add('card');
  card.append(
    crearNodoHistorial(doc, 'span', reto.empleadoNombre ?? 'Todo el equipo'),
    crearNodoHistorial(doc, 'strong', reto.titulo),
    crearNodoHistorial(doc, 'p', reto.descripcion),
    progress,
    crearNodoHistorial(doc, 'small', `${Number(reto.progreso)}/${Number(reto.meta)} acciones`)
  );
  return card;
}
