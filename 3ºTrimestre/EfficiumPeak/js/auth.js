/**
 * @file auth.js
 * @description Compatibilidad con clases y autenticación de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

export { Usuario, Empleado, Manager } from './classes/Usuario.js';
export { iniciarSesion, iniciarSesionBiometrico, iniciarSesionFacialDemo, cerrarSesion, redirigirSegunRol, obtenerInfoNavegador } from './modules/auth.js';
