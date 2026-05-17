/**
 * @file api.js
 * @description Módulo de comunicación asíncrona con el servidor y APIs externas
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

import { toggleSpinner } from './dom.js';

/**
 * Carga los hábitos desde el fichero JSON local.
 * @returns {Promise<Array>} Hábitos recibidos.
 */
export async function cargarHabitos() {
  toggleSpinner(true);
  try {
    const respuesta = await fetch('./data/habitos.json', {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    if (!respuesta.ok) {
      throw new Error(`Error al cargar hábitos: ${respuesta.status} ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) throw new Error('El formato de datos recibido no es válido');
    return datos;
  } catch (error) {
    console.error('cargarHabitos:', error);
    throw error;
  } finally {
    toggleSpinner(false);
  }
}

/**
 * Carga usuarios desde el fichero JSON local.
 * @returns {Promise<Array>} Usuarios recibidos.
 */
export async function cargarUsuarios() {
  const respuesta = await fetch('./data/usuarios.json', {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  if (!respuesta.ok) throw new Error(`Error al cargar usuarios: ${respuesta.status}`);
  return respuesta.json();
}

/**
 * Obtiene un consejo/hábito aleatorio del día desde una API externa.
 * @returns {Promise<{id: string, titulo: string, descripcion: string, tipo: string, puntos: number, icono: string}>} Hábito sugerido.
 */
export async function obtenerHabitoDia() {
  toggleSpinner(true);
  try {
    const respuesta = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
    if (!respuesta.ok) throw new Error(`Error API externa: ${respuesta.status}`);
    const datos = await respuesta.json();
    return {
      id: `ext-${datos.slip.id}`,
      titulo: 'Hábito sugerido del día',
      descripcion: datos.slip.advice,
      tipo: 'diario',
      puntos: 25,
      icono: '💡'
    };
  } catch (error) {
    console.warn('API externa no disponible, usando fallback:', error);
    return {
      id: 'fallback-001',
      titulo: 'Hábito del día',
      descripcion: 'Dedica 10 minutos a reflexionar sobre tus objetivos de esta semana.',
      tipo: 'diario',
      puntos: 25,
      icono: '💡'
    };
  } finally {
    toggleSpinner(false);
  }
}

/**
 * Simula el envío de datos de progreso al servidor.
 * @param {Object} progreso - Datos del progreso del usuario.
 * @returns {Promise<{ok: boolean, mensaje: string}>} Resultado simulado.
 */
export async function guardarProgresoServidor(progreso) {
  try {
    console.info('Progreso que se enviaría al servidor:', JSON.stringify(progreso, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { ok: true, mensaje: 'Progreso guardado correctamente' };
  } catch (error) {
    return { ok: false, mensaje: error.message };
  }
}
