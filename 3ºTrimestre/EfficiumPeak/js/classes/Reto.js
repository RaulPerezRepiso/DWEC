/**
 * @file Reto.js
 * @description Clase Reto semanal de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

import { Habito } from './Habito.js';

export class Reto extends Habito {
  #meta;
  #progreso;
  #participantes;
  #esColaborativo;

  /**
   * Crea un reto semanal.
   * @param {string} id - Identificador único.
   * @param {string} titulo - Título del reto.
   * @param {string} descripcion - Descripción del reto.
   * @param {number} puntos - Puntos de recompensa.
   * @param {number} meta - Número de acciones para completar el reto.
   * @param {boolean} esColaborativo - Define si participan varios empleados.
   */
  constructor(id, titulo, descripcion, puntos, meta, esColaborativo = false) {
    super(id, titulo, descripcion, 'semanal', puntos, '🏆');
    this.#meta = meta;
    this.#progreso = 0;
    this.#participantes = [];
    this.#esColaborativo = esColaborativo;
  }

  get meta() { return this.#meta; }
  get progreso() { return this.#progreso; }
  get esColaborativo() { return this.#esColaborativo; }

  /**
   * Actualiza el progreso del reto.
   * @param {number} incremento - Acciones añadidas.
   * @returns {void}
   */
  actualizarProgreso(incremento = 1) {
    this.#progreso = Math.min(this.#progreso + incremento, this.#meta);
    if (this.#progreso >= this.#meta && !this.completado) {
      this.completar();
    }
  }

  /**
   * Calcula el porcentaje de progreso.
   * @returns {number} Porcentaje entre 0 y 100.
   */
  getPorcentaje() {
    return parseFloat(((this.#progreso / this.#meta) * 100).toFixed(1));
  }

  /**
   * Añade un participante al reto colaborativo.
   * @param {string} empleadoId - Identificador del empleado.
   * @returns {void}
   */
  añadirParticipante(empleadoId) {
    if (!this.#participantes.includes(empleadoId)) {
      this.#participantes.push(empleadoId);
    }
  }

  /**
   * Serializa el reto a objeto plano.
   * @returns {Object} Reto serializado.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      meta: this.#meta,
      progreso: this.#progreso,
      porcentaje: this.getPorcentaje(),
      esColaborativo: this.#esColaborativo,
      participantes: this.#participantes
    };
  }
}
