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
  // El spinner se usa para que la carga asíncrona tenga una respuesta visual en pantalla.
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
 * Obtiene una frase positiva aleatoria en español desde una API externa.
 * @returns {Promise<{id: string, titulo: string, descripcion: string, tipo: string, icono: string}>} Frase positiva del día.
 */
export async function obtenerHabitoDia() {
  toggleSpinner(true);
  try {
    // Esta llamada externa no cambia datos del usuario; solo añade una frase a la vista del empleado.
    const respuesta = await fetch('https://www.positive-api.online/phrase/esp', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-cache'
    });
    if (!respuesta.ok) throw new Error(`Error API externa: ${respuesta.status}`);
    const datos = await respuesta.json();
    const frase = datos.phrase ?? datos.text ?? datos.message ?? 'Hoy toca avanzar con calma y constancia.';
    const autor = datos.author ? ` · ${datos.author}` : '';
    return {
      id: `ext-${datos.id ?? 'esp'}`,
      titulo: 'Frase positiva del dia',
      descripcion: `${frase}${autor}`,
      tipo: 'diario',
      icono: '💡'
    };
  } catch (error) {
    // Si la API falla, la app sigue funcionando igual usando una frase local de reserva.
    console.warn('API externa en español no disponible, usando fallback:', error);
    return {
      id: 'fallback-001',
      titulo: 'Frase positiva del dia',
      descripcion: 'Pequenos pasos constantes construyen grandes cambios.',
      tipo: 'diario',
      icono: '💡'
    };
  } finally {
    toggleSpinner(false);
  }
}

/**
 * Envía el progreso del usuario a un endpoint remoto de demostración en formato JSON.
 * @param {Object} progreso - Datos del progreso del usuario.
 * @returns {Promise<{ok: boolean, mensaje: string, recibido?: Object}>} Resultado remoto o fallback.
 */
export async function guardarProgresoServidor(progreso) {
  try {
    // Este endpoint es de prueba y se usa para demostrar un envío real de JSON sin backend propio.
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(progreso)
    });
    if (!respuesta.ok) {
      throw new Error(`Error al guardar progreso: ${respuesta.status}`);
    }
    const recibido = await respuesta.json();
    return {
      ok: true,
      mensaje: 'Progreso enviado correctamente al endpoint de demostración',
      recibido
    };
  } catch (error) {
    console.warn('No se pudo enviar el progreso al endpoint remoto:', error);
    return {
      ok: true,
      mensaje: 'No hubo respuesta remota; el progreso queda guardado en modo demo local',
      recibido: progreso
    };
  }
}
