// TODO Guardado en LocalStorage
/**
 * Guarda el email del último usuario logueado.
 * @param {string} email - Email a recordar.
 * @returns {void}
 */
export function recordarEmail(email) {
  localStorage.setItem('recordar_email', email);
}

/**
 * Recupera el email recordado.
 * @returns {string|null} Email guardado.
 */
export function obtenerEmailRecordado() {
  return localStorage.getItem('recordar_email');
}

/**
 * Guarda la sesión activa del usuario.
 * @param {Object} usuario - Datos del usuario logueado.
 * @returns {void}
 */
export function guardarSesion(usuario) {
  // Se guarda tanto el usuario como la hora de inicio para poder ampliar la lógica de sesión si hiciera falta.
  sessionStorage.setItem('sesion_usuario', JSON.stringify(usuario));
  sessionStorage.setItem('sesion_inicio', new Date().toISOString());
}

/**
 * Elimina la sesión activa.
 * @returns {void}
 */
export function eliminarSesion() {
  sessionStorage.removeItem('sesion_usuario');
  sessionStorage.removeItem('sesion_inicio');
  localStorage.setItem('sesion_usuario', '');
  localStorage.removeItem('sesion_usuario');
}

/**
 * Crea o actualiza una cookie.
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor de la cookie.
 * @param {number} dias - Días de expiración.
 * @returns {void}
 */
export function setCookie(nombre, valor, dias = 0) {
  let expira = '';
  if (dias > 0) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    expira = `; expires=${fecha.toUTCString()}`;
  }
  document.cookie = `${nombre}=${encodeURIComponent(valor)}${expira}; path=/; SameSite=Strict`;
}

/**
 * Lee el valor de una cookie.
 * @param {string} nombre - Nombre de la cookie.
 * @returns {string|null} Valor de la cookie.
 */
export function getCookie(nombre) {
  const clave = `${nombre}=`;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const c = cookie.trim();
    if (c.startsWith(clave)) return decodeURIComponent(c.substring(clave.length));
  }
  return null;
}

/**
 * Elimina una cookie.
 * @param {string} nombre - Nombre de la cookie.
 * @returns {void}
 */
export function deleteCookie(nombre) {
  setCookie(nombre, '', -1);
}

/**
 * Acepta las cookies y guarda el consentimiento.
 * @returns {void}
 */
export function aceptarCookies() {
  // Además del consentimiento, se aprovecha para recordar el idioma principal del navegador.
  setCookie('cookies_aceptadas', 'true', 365);
  setCookie('idioma_preferido', navigator.language.split('-')[0], 365);
}

/**
 * Guarda el estado persistido de los hábitos de un usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @param {Array<Object>} habitos - Hábitos serializados.
 * @returns {void}
 */
export function guardarHabitosUsuario(usuarioId, habitos) {
  // Aquí se persiste el estado completo para que la UI pueda reconstruirse al recargar.
  localStorage.setItem(`habitos_usuario_${usuarioId}`, JSON.stringify(habitos));
}

/**
 * Recupera el estado persistido de los hábitos de un usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Array<Object>} Hábitos guardados o lista vacía.
 */
export function obtenerHabitosUsuario(usuarioId) {
  const raw = localStorage.getItem(`habitos_usuario_${usuarioId}`);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Guarda un resumen calculado del progreso de un usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @param {Object} resumen - Datos agregados del usuario.
 * @returns {void}
 */
export function guardarResumenUsuario(usuarioId, resumen) {
  localStorage.setItem(`resumen_usuario_${usuarioId}`, JSON.stringify(resumen));
}

/**
 * Recupera el resumen guardado de un usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Object|null} Resumen guardado o null.
 */
export function obtenerResumenUsuario(usuarioId) {
  const raw = localStorage.getItem(`resumen_usuario_${usuarioId}`);
  return raw ? JSON.parse(raw) : null;
}
