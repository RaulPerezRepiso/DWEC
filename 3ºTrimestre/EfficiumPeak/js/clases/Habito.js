export class Habito {
  #id;
  #titulo;
  #descripcion;
  #tipo;
  #puntos;
  #completado;
  #fechaCompletado;
  #icono;

  /**
   * Crea un hábito puntuable.
   * @param {string} id - ID del hábito.
   * @param {string} titulo - Título del hábito.
   * @param {string} descripcion - Descripción breve del hábito.
   * @param {'diario'|'semanal'|'mensual'} tipo - Frecuencia del hábito.
   * @param {number} puntos - Puntos que da al completarse.
   * @param {string} icono - Icono representativo.
   */
  constructor(id, titulo, descripcion, tipo, puntos, icono = '⭐') {
    this.#id = id;
    this.#titulo = titulo;
    this.#descripcion = descripcion;
    this.#tipo = tipo;
    this.#puntos = puntos;
    this.#completado = false;
    this.#fechaCompletado = null;
    this.#icono = icono;
  }

  get id() { return this.#id; }
  get titulo() { return this.#titulo; }
  get descripcion() { return this.#descripcion; }
  get tipo() { return this.#tipo; }
  get puntos() { return this.#puntos; }
  get completado() { return this.#completado; }
  get fechaCompletado() { return this.#fechaCompletado; }
  get icono() { return this.#icono; }

  /**
   * Marca el hábito como completado.
   * @throws {Error} Si el hábito ya estaba completado.
   * @returns {void}
   */
  completar() {
    if (this.#completado) {
      throw new Error(`El hábito "${this.#titulo}" ya está completado hoy`);
    }
    this.#completado = true;
    this.#fechaCompletado = new Date();
  }

  /**
   * Reinicia el hábito para un nuevo ciclo.
   * @returns {void}
   */
  reiniciar() {
    this.#completado = false;
    this.#fechaCompletado = null;
  }

  /**
   * Aplica un estado seguro al hábito sin pasar por la interacción de la UI.
   * @param {{completado?: boolean, fechaCompletado?: string|null}} estado Estado guardado.
   * @returns {void}
   */
  aplicarEstado(estado = {}) {
    this.#completado = Boolean(estado.completado);
    this.#fechaCompletado = estado.fechaCompletado ? new Date(estado.fechaCompletado) : null;
  }

  /**
   * Indica si el hábito está completado.
   * @returns {boolean} Estado completado.
   */
  estaCompletado() {
    return this.#completado;
  }

  /**
   * Devuelve una representación en tipo cadena del habito.
   * @returns {string} Texto del hábito.
   */
  toString() {
    return `${this.#icono} [${this.#tipo.toUpperCase()}] ${this.#titulo} (${this.#puntos} pts)`;
  }

  /**
   * Convierte el objeto en memoría a un formato bytes o cadena para devolver el hábito a objeto plano.
   * @returns {Object} Hábito.
   */
  toJSON() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      descripcion: this.#descripcion,
      tipo: this.#tipo,
      puntos: this.#puntos,
      completado: this.#completado,
      fechaCompletado: this.#fechaCompletado?.toISOString() ?? null, // Meror que toString porque guarda la fecha con formato Fecha + Hora
      icono: this.#icono
    };
  }
}
