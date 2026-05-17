/**
 * @file Mision.js
 * @description Clase Mision mensual de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

import { Reto } from './Reto.js';

export class Mision {
  #id;
  #titulo;
  #descripcion;
  #retos;
  #activa;
  #fechaInicio;
  #fechaFin;
  #puntosBonus;

  /**
   * Crea una misión mensual compuesta por retos.
   * @param {string} id - Identificador único.
   * @param {string} titulo - Título de la misión.
   * @param {string} descripcion - Descripción de la misión.
   * @param {number} puntosBonus - Puntos extra por completarla.
   */
  constructor(id, titulo, descripcion, puntosBonus = 500) {
    this.#id = id;
    this.#titulo = titulo;
    this.#descripcion = descripcion;
    this.#retos = [];
    this.#activa = true;
    this.#fechaInicio = new Date();
    this.#fechaFin = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.#puntosBonus = puntosBonus;
  }

  get id() { return this.#id; }
  get titulo() { return this.#titulo; }
  get descripcion() { return this.#descripcion; }
  get retos() { return [...this.#retos]; }
  get activa() { return this.#activa; }
  get puntosBonus() { return this.#puntosBonus; }

  /**
   * Añade un reto a la misión.
   * @param {Reto} reto - Reto mensual asociado.
   * @returns {void}
   */
  añadirReto(reto) {
    if (!(reto instanceof Reto)) {
      throw new TypeError('Solo se pueden añadir instancias de Reto');
    }
    this.#retos.push(reto);
  }

  /**
   * Calcula el progreso ponderado de la misión.
   * @returns {number} Porcentaje entre 0 y 100.
   */
  calcularProgresoPonderado() {
    if (this.#retos.length === 0) return 0;
    const suma = this.#retos.reduce((acc, reto) => acc + reto.getPorcentaje(), 0);
    return parseFloat((suma / this.#retos.length).toFixed(1));
  }

  /**
   * Comprueba si todos los retos están completados.
   * @returns {boolean} Estado de misión completada.
   */
  estaCompletada() {
    return this.#retos.length > 0 && this.#retos.every((reto) => reto.completado);
  }

  /**
   * Calcula los días restantes de la misión.
   * @returns {number} Días restantes.
   */
  diasRestantes() {
    const hoy = new Date();
    const diff = this.#fechaFin - hoy;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /**
   * Serializa la misión a objeto plano.
   * @returns {Object} Misión serializada.
   */
  toJSON() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      descripcion: this.#descripcion,
      activa: this.#activa,
      progreso: this.calcularProgresoPonderado(),
      completada: this.estaCompletada(),
      diasRestantes: this.diasRestantes(),
      puntosBonus: this.#puntosBonus,
      retos: this.#retos.map((reto) => reto.toJSON())
    };
  }
}
