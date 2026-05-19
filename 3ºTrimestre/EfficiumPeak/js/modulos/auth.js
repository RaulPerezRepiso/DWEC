import { cargarUsuarios } from './api.js';
import { guardarSesion, eliminarSesion, recordarEmail, aceptarCookies } from './storage.js';

/**
 * Inicia sesión comprobando el email contra los usuarios locales.
 * @param {string} email - Email de acceso.
 * @param {string} password - Contraseña introducida.
 * @returns {Promise<Object>} Usuario autenticado.
 */
export async function iniciarSesion(email, password) {
  const usuarios = await cargarUsuarios();

  // La comprobación se hace contra el JSON local para simular un login sin tener servidor real.
  const usuario = usuarios.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!usuario || password.length < 8) throw new Error('Credenciales no válidas');
  guardarSesion(usuario);
  recordarEmail(usuario.email);
  aceptarCookies();
  return usuario;
}

/**
 * Inicia sesión tras completar el acceso facial demo con webcam.
 * @returns {Promise<Object>} Usuario autenticado para la demo facial.
 */
export async function iniciarSesionFacialDemo() {
  const usuarios = await cargarUsuarios();
  const usuarioDemo = usuarios.find((usuario) => usuario.rol === 'empleado') ?? usuarios[0];
  if (!usuarioDemo) throw new Error('No hay usuarios disponibles para iniciar sesión');
  guardarSesion(usuarioDemo);
  recordarEmail(usuarioDemo.email);
  aceptarCookies();
  return usuarioDemo;
}

/**
 * Cierra la sesión del usuario actual.
 * @returns {void}
 */
export function cerrarSesion() {
  const confirmar = window.confirm('¿Quieres cerrar la sesión de Efficium Peak?');
  if (!confirmar) return;
  eliminarSesion();
  location.href = './login.html';
}

/**
 * Redirige al panel según el rol del usuario.
 * @param {string} rol - Rol empleado, manager o admin.
 * @returns {void}
 */
export function redirigirSegunRol(rol) {
  const rutas = {
    empleado: './dashboard.html',
    manager: './dashboard.html',
    admin: './dashboard.html'
  };
  location.href = rutas[rol] ?? './login.html';
}
