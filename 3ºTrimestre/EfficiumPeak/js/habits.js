/**
 * @file habits.js
 * @description Compatibilidad con hábitos de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

export { Habito } from './classes/Habito.js';
export {
  calcularRacha,
  formatearFecha,
  filtrarPorTipo,
  buscarHabitoPorId,
  calcularPorcentajeCompletados,
  obtenerTopEmpleados,
  calcularTotalPuntos,
  habitosAFormatoUI,
  cargarHabitos,
  renderizarHabitos,
  completarHabito,
  obtenerHabitosActuales
} from './modules/habitos.js';
