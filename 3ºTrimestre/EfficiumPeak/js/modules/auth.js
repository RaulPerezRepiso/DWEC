/**
 * @file auth.js
 * @description Autenticación, sesión y navegación por rol en Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

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
  const usuario = usuarios.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!usuario || password.length < 8) throw new Error('Credenciales no válidas');
  guardarSesion(usuario);
  recordarEmail(usuario.email);
  aceptarCookies();
  return usuario;
}

/**
 * Inicia sesión mediante autenticación biométrica compatible con WebAuthn.
 * @returns {Promise<Object>} Usuario autenticado para la demo.
 */
export async function iniciarSesionBiometrico() {
  const usuarios = await cargarUsuarios();
  const usuarioDemo = usuarios.find((usuario) => usuario.rol === 'empleado') ?? usuarios[0];
  if (!usuarioDemo) throw new Error('No hay usuarios disponibles para iniciar sesión');

  if (window.PublicKeyCredential && navigator.credentials) {
    await solicitarPasskeyDemo(usuarioDemo.email);
  } else {
    window.alert('Este navegador no expone WebAuthn. Se usará el acceso demo del proyecto.');
  }

  guardarSesion(usuarioDemo);
  recordarEmail(usuarioDemo.email);
  aceptarCookies();
  return usuarioDemo;
}

/**
 * Solicita una credencial WebAuthn de plataforma para simular Face ID/passkey.
 * @param {string} email - Email del usuario demo.
 * @returns {Promise<void>} Finalización de la solicitud.
 */
async function solicitarPasskeyDemo(email) {
  const reto = new Uint8Array(32);
  crypto.getRandomValues(reto);
  try {
    await navigator.credentials.get({
      publicKey: {
        challenge: reto,
        timeout: 60000,
        userVerification: 'preferred',
        rpId: location.hostname === 'localhost' ? 'localhost' : location.hostname,
        allowCredentials: []
      }
    });
  } catch (error) {
    console.info(`WebAuthn no completado para ${email}. Se continúa en modo demo.`, error);
  }
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
    empleado: './dashboard-empleado.html',
    manager: './dashboard-manager.html',
    admin: './dashboard-admin.html'
  };
  location.href = rutas[rol] ?? './login.html';
}

/**
 * Devuelve info del entorno del navegador para diagnóstico.
 * @returns {{idioma: string, online: boolean, ruta: string, pagina: string}} Información del navegador.
 */
export function obtenerInfoNavegador() {
  return {
    idioma: navigator.language,
    online: navigator.onLine,
    ruta: location.pathname,
    pagina: location.href
  };
}
