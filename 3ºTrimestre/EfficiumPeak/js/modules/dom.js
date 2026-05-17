/**
 * @file dom.js
 * @description Utilidades de manipulación del DOM para Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

/**
 * Crea una tarjeta de hábito de forma dinámica.
 * @param {import('../classes/Habito.js').Habito|Object} habito - Hábito a renderizar.
 * @returns {HTMLElement} Tarjeta creada.
 */
export function crearTarjetaHabito(habito) {
  const card = document.createElement('div');
  card.classList.add('habito-card');
  card.dataset.habitoId = habito.id;
  card.dataset.accion = 'completar-habito';
  card.dataset.id = habito.id;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-checked', String(habito.completado));
  card.setAttribute('tabindex', '0');

  const icono = document.createElement('span');
  icono.classList.add('habito-icono');
  icono.textContent = habito.icono;

  const info = document.createElement('div');
  info.classList.add('habito-info');

  const titulo = document.createElement('h3');
  titulo.classList.add('habito-titulo');
  titulo.textContent = habito.titulo;

  const desc = document.createElement('p');
  desc.classList.add('habito-desc');
  desc.textContent = habito.descripcion;

  const puntos = document.createElement('span');
  puntos.classList.add('habito-puntos');
  puntos.textContent = `+${habito.puntos} pts`;

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
  if (card.classList.contains('completado')) return;
  card.classList.add('completado');
  card.setAttribute('aria-checked', 'true');
  card.style.opacity = '0.6';
  card.style.borderColor = '#22c55e';
  card.style.cursor = 'default';

  const check = document.createElement('span');
  check.classList.add('check-completado');
  check.textContent = '✅';
  check.setAttribute('aria-label', 'Completado');
  card.prepend(check);
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
  const div = document.createElement('div');
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
  const notif = document.createElement('div');
  notif.classList.add('notificacion', `notificacion--${tipo}`);
  notif.setAttribute('role', 'alert');
  notif.setAttribute('aria-live', 'polite');
  notif.textContent = mensaje;
  const iconos = { exito: '✅', error: '❌', info: 'ℹ️' };
  notif.prepend(Object.assign(document.createElement('span'), { textContent: iconos[tipo] }));
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add('visible'));
  setTimeout(() => {
    notif.classList.remove('visible');
    notif.addEventListener('transitionend', () => notif.remove(), { once: true });
  }, duracion);
}

/**
 * Abre una ventana auxiliar con el historial del empleado.
 * @param {Object|string} empleado - Empleado o identificador disponible.
 * @returns {void}
 */
export function abrirHistorialEmpleado(empleado) {
  const datos = normalizarEmpleadoHistorial(empleado);
  const ventana = window.open('', `historial_${datos.id}`, 'width=620,height=540,scrollbars=yes,resizable=yes,location=no');
  if (!ventana) {
    mostrarNotificacion('Activa las ventanas emergentes para ver el historial', 'error');
    return;
  }
  const filas = datos.habitosCompletados.map((habito) => `
    <tr class="${habito.completado ? 'ok' : 'nok'}">
      <td>${habito.icono ?? '⭐'} ${habito.titulo}</td>
      <td>${habito.tipo ?? 'diario'}</td>
      <td>${habito.puntos ?? 0} pts</td>
      <td>${habito.fechaCompletado ? new Date(habito.fechaCompletado).toLocaleDateString('es-ES') : '—'}</td>
    </tr>
  `).join('');
  const retos = (datos.retosAsignados ?? []).map((reto) => `
    <article class="historial-card">
      <strong>${reto.titulo}</strong>
      <span>${reto.empleadoNombre ?? 'Asignado'} · ${reto.progreso ?? 0}/${reto.meta ?? 1}</span>
      <p>${reto.descripcion}</p>
    </article>
  `).join('');
  const misiones = (datos.misionesCompletadas ?? []).map((mision) => `
    <article class="historial-card">
      <strong>${mision.titulo}</strong>
      <span>${mision.completada ? 'Completada' : 'En curso'} · ${mision.progreso}% · ${mision.puntosBonus} pts bonus</span>
      <p>${mision.descripcion}</p>
    </article>
  `).join('');
  ventana.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Historial · ${datos.nombre}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#151528;color:#e2e8f0;padding:2rem}
    h1{color:#8b5cf6;margin-bottom:.5rem}
    p{color:#94a3b8;margin-bottom:1.5rem;font-size:.9rem}
    table{width:100%;border-collapse:collapse}
    th{background:#242447;padding:.75rem 1rem;text-align:left;font-size:.85rem;color:#a78bfa}
    td{padding:.65rem 1rem;border-bottom:1px solid #2f2f55;font-size:.9rem}
    .ok td:first-child{border-left:3px solid #22c55e}
    .nok td:first-child{border-left:3px solid #ef4444}
    tr:hover td{background:#2f2f5555}
    section{margin-top:1.6rem}
    h2{font-size:1rem;color:#a78bfa;margin-bottom:.8rem}
    .historial-grid{display:grid;gap:.75rem}
    .historial-card{border:1px solid #2f2f55;border-radius:8px;padding:1rem;background:#1f2540}
    .historial-card strong,.historial-card span{display:block}
    .historial-card span{margin:.25rem 0 .5rem;color:#22d3ee;font-size:.85rem}
    .historial-card p{margin:0;color:#94a3b8}
  </style>
</head>
<body>
  <h1>📊 Historial de ${datos.nombre}</h1>
  <p>Racha: <strong>${datos.racha ?? 0} días</strong> | Puntos: <strong>${datos.puntos ?? 0}</strong> | Nivel: <strong>${datos.nivel ?? 1}</strong></p>
  <table>
    <thead><tr><th>Hábito</th><th>Tipo</th><th>Puntos</th><th>Completado</th></tr></thead>
    <tbody>${filas || '<tr><td colspan="4">Sin hábitos registrados</td></tr>'}</tbody>
  </table>
  <section>
    <h2>Retos asignados</h2>
    <div class="historial-grid">${retos || '<article class="historial-card"><strong>Sin retos asignados</strong><p>El manager todavía no ha creado retos para este empleado.</p></article>'}</div>
  </section>
  <section>
    <h2>Misiones</h2>
    <div class="historial-grid">${misiones || '<article class="historial-card"><strong>Sin misiones registradas</strong><p>No hay misiones completadas o en curso.</p></article>'}</div>
  </section>
</body>
</html>`);
  ventana.document.close();
}

/**
 * Normaliza los datos del empleado para la ventana auxiliar.
 * @param {Object|string} empleado - Datos o id del empleado.
 * @returns {Object} Empleado normalizado.
 */
function normalizarEmpleadoHistorial(empleado) {
  if (typeof empleado === 'string') {
    return { id: empleado, nombre: 'Empleado', racha: 0, puntos: 0, nivel: 1, habitosCompletados: [] };
  }
  return { habitosCompletados: [], ...empleado };
}

/**
 * Elimina una tarjeta de hábito del DOM con animación.
 * @param {string} habitoId - Identificador del hábito.
 * @returns {void}
 */
export function eliminarTarjetaHabito(habitoId) {
  const card = document.querySelector(`[data-habito-id="${habitoId}"]`);
  if (!card) return;
  card.style.transition = 'opacity 0.3s, transform 0.3s';
  card.style.opacity = '0';
  card.style.transform = 'translateX(100%)';
  card.addEventListener('transitionend', () => card.remove(), { once: true });
}

/**
 * Muestra u oculta el spinner de carga.
 * @param {boolean} visible - Estado visible.
 * @returns {void}
 */
export function toggleSpinner(visible) {
  let spinner = document.getElementById('spinner-global');
  if (!spinner && visible) {
    spinner = document.createElement('div');
    spinner.id = 'spinner-global';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Cargando...');
    spinner.innerHTML = '<div class="spinner-anillo"></div>';
    document.body.appendChild(spinner);
  } else if (spinner && !visible) {
    spinner.remove();
  }
}
