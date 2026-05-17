/**
 * @file storage.js
 * @description Gestión de localStorage, sessionStorage y cookies
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

/**
 * Guarda las preferencias del usuario en localStorage.
 * @param {string} usuarioId - Identificador del usuario.
 * @param {Object} preferencias - Preferencias elegidas.
 * @returns {void}
 */
export function guardarPreferencias(usuarioId, preferencias) {
  localStorage.setItem(
    `prefs_${usuarioId}`,
    JSON.stringify({ ...preferencias, ultimaActualizacion: new Date().toISOString() })
  );
}

/**
 * Recupera las preferencias del usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {Object|null} Preferencias guardadas.
 */
export function obtenerPreferencias(usuarioId) {
  const raw = localStorage.getItem(`prefs_${usuarioId}`);
  return raw ? JSON.parse(raw) : null;
}

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
 * Elimina todos los datos locales del usuario.
 * @param {string} usuarioId - Identificador del usuario.
 * @returns {void}
 */
export function limpiarDatosLocales(usuarioId) {
  localStorage.removeItem(`prefs_${usuarioId}`);
  localStorage.removeItem('recordar_email');
}

/**
 * Guarda la sesión activa del usuario.
 * @param {Object} usuario - Datos del usuario logueado.
 * @returns {void}
 */
export function guardarSesion(usuario) {
  sessionStorage.setItem('sesion_usuario', JSON.stringify(usuario));
  sessionStorage.setItem('sesion_inicio', new Date().toISOString());
}

/**
 * Recupera la sesión activa.
 * @returns {Object|null} Usuario de sesión.
 */
export function obtenerSesion() {
  const raw = sessionStorage.getItem('sesion_usuario');
  return raw ? JSON.parse(raw) : null;
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
 * Comprueba si hay una sesión activa válida.
 * @returns {boolean} Estado de sesión.
 */
export function haySesionActiva() {
  return sessionStorage.getItem('sesion_usuario') !== null;
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
  setCookie('cookies_aceptadas', 'true', 365);
  setCookie('idioma_preferido', navigator.language.split('-')[0], 365);
}

/**
 * Comprueba si el usuario ya aceptó las cookies.
 * @returns {boolean} Estado del consentimiento.
 */
export function cookiesAceptadas() {
  return getCookie('cookies_aceptadas') === 'true';
}
