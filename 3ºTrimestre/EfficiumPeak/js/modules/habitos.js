/**
 * @file habitos.js
 * @description Lógica de hábitos, rachas y transformaciones de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

import { Habito } from '../classes/Habito.js';
import { cargarHabitos as cargarHabitosApi } from './api.js';
import { renderizarListaHabitos, mostrarNotificacion, aplicarEstiloCompletado } from './dom.js';

let habitosActuales = [];

/**
 * Calcula los días de racha activa del empleado.
 * @param {Array<string>} historial - Array de fechas de hábitos completados.
 * @returns {number} Días de racha consecutiva.
 */
export function calcularRacha(historial) {
  const hoy = new Date();
  const fechasOrdenadas = historial.map((fecha) => new Date(fecha)).sort((a, b) => b - a);
  let racha = 0;
  let fechaActual = hoy;

  for (const fecha of fechasOrdenadas) {
    const diffDias = Math.floor((fechaActual - fecha) / (1000 * 60 * 60 * 24));
    if (diffDias <= 1) {
      racha++;
      fechaActual = fecha;
    } else {
      break;
    }
  }
  return racha;
}

/**
 * Formatea una fecha para mostrarla en la UI.
 * @param {Date|string} fecha - Fecha a formatear.
 * @returns {string} Fecha formateada en español.
 */
export function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Filtra hábitos por tipo.
 * @param {Array<Habito|Object>} habitos - Lista de hábitos.
 * @param {string} tipo - Tipo diario, semanal o mensual.
 * @returns {Array<Habito|Object>} Hábitos filtrados.
 */
export function filtrarPorTipo(habitos, tipo) {
  return habitos.filter((habito) => habito.tipo === tipo);
}

/**
 * Busca un hábito por id.
 * @param {Array<Habito|Object>} habitos - Lista de hábitos.
 * @param {string} id - Identificador del hábito.
 * @returns {Habito|Object|undefined} Hábito encontrado.
 */
export function buscarHabitoPorId(habitos, id) {
  return habitos.find((habito) => habito.id === id);
}

/**
 * Calcula el porcentaje de hábitos completados.
 * @param {Array<Habito|Object>} habitos - Lista de hábitos.
 * @returns {number} Porcentaje completado.
 */
export function calcularPorcentajeCompletados(habitos) {
  if (habitos.length === 0) return 0;
  const completados = habitos.filter((habito) => habito.completado).length;
  return Math.round((completados / habitos.length) * 100);
}

/**
 * Obtiene los top N empleados por puntos.
 * @param {Array<Object>} empleados - Lista de empleados.
 * @param {number} n - Número de empleados a devolver.
 * @returns {Array<Object>} Top de empleados.
 */
export function obtenerTopEmpleados(empleados, n = 3) {
  return [...empleados].sort((a, b) => b.puntos - a.puntos).slice(0, n);
}

/**
 * Suma total de puntos de todos los empleados.
 * @param {Array<Object>} empleados - Lista de empleados.
 * @returns {number} Total de puntos.
 */
export function calcularTotalPuntos(empleados) {
  return empleados.reduce((acc, empleado) => acc + empleado.puntos, 0);
}

/**
 * Mapea hábitos a formato para la UI.
 * @param {Array<Habito|Object>} habitos - Lista de hábitos.
 * @returns {Array<Object>} Hábitos preparados para la UI.
 */
export function habitosAFormatoUI(habitos) {
  return habitos.map((habito) => ({
    id: habito.id,
    titulo: habito.titulo,
    completado: habito.completado,
    puntos: habito.puntos,
    icono: habito.tipo === 'diario' ? '📅' : habito.tipo === 'semanal' ? '📆' : '🗓️'
  }));
}

/**
 * Carga hábitos desde datos locales y los convierte en instancias.
 * @returns {Promise<Array<Habito>>} Hábitos cargados.
 */
export async function cargarHabitos() {
  const datos = await cargarHabitosApi();
  habitosActuales = datos.map((habito) => new Habito(
    habito.id,
    habito.titulo,
    habito.descripcion,
    habito.tipo,
    habito.puntos,
    habito.icono
  ));
  renderizarListaHabitos(habitosActuales);
  return habitosActuales;
}

/**
 * Renderiza los hábitos actuales con un filtro opcional.
 * @param {string} filtro - Filtro seleccionado.
 * @returns {void}
 */
export function renderizarHabitos(filtro = 'todos') {
  renderizarListaHabitos(habitosActuales, filtro);
}

/**
 * Completa un hábito por id y actualiza su tarjeta.
 * @param {string} id - Identificador del hábito.
 * @returns {Habito|null} Hábito completado o null.
 */
export function completarHabito(id) {
  const habito = buscarHabitoPorId(habitosActuales, id);
  if (!habito) return null;
  try {
    habito.completar();
    const card = document.querySelector(`[data-habito-id="${id}"]`);
    if (card) aplicarEstiloCompletado(card);
    mostrarNotificacion(`${habito.titulo} completado: +${habito.puntos} puntos`, 'exito');
    return habito;
  } catch (error) {
    mostrarNotificacion(error.message, 'info');
    return null;
  }
}

/**
 * Devuelve una copia de los hábitos actuales.
 * @returns {Array<Habito>} Hábitos actuales.
 */
export function obtenerHabitosActuales() {
  return [...habitosActuales];
}
