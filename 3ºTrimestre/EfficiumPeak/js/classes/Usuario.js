/**
 * @file Usuario.js
 * @description Clase base Usuario y subclases Empleado y Manager
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

export class Usuario {
  #id;
  #nombre;
  #email;
  #rol;
  #fechaCreacion;
  #avatar;

  /**
   * Crea un usuario base de Efficium Peak.
   * @param {string} id - Identificador único del usuario.
   * @param {string} nombre - Nombre visible del usuario.
   * @param {string} email - Email corporativo.
   * @param {string} rol - Rol del usuario.
   */
  constructor(id, nombre, email, rol) {
    this.#id = id;
    this.#nombre = nombre;
    this.#email = email;
    this.#rol = rol;
    this.#fechaCreacion = new Date();
    this.#avatar = nombre.charAt(0).toUpperCase();
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get email() { return this.#email; }
  get rol() { return this.#rol; }
  get fechaCreacion() { return this.#fechaCreacion; }
  get avatar() { return this.#avatar; }

  set nombre(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 2) {
      throw new Error('Nombre inválido');
    }
    this.#nombre = valor.trim();
  }

  /**
   * Representa el usuario como texto legible.
   * @returns {string} Descripción del usuario.
   */
  toString() {
    return `[${this.#rol.toUpperCase()}] ${this.#nombre} <${this.#email}>`;
  }

  /**
   * Serializa el usuario a objeto plano.
   * @returns {Object} Usuario serializado.
   */
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      email: this.#email,
      rol: this.#rol,
      fechaCreacion: this.#fechaCreacion.toISOString()
    };
  }
}

export class Empleado extends Usuario {
  #puntos;
  #racha;
  #habitosCompletados;
  #nivel;

  /**
   * Crea un empleado con métricas de rendimiento.
   * @param {string} id - Identificador único.
   * @param {string} nombre - Nombre del empleado.
   * @param {string} email - Email del empleado.
   */
  constructor(id, nombre, email) {
    super(id, nombre, email, 'empleado');
    this.#puntos = 0;
    this.#racha = 0;
    this.#habitosCompletados = [];
    this.#nivel = 1;
  }

  get puntos() { return this.#puntos; }
  get racha() { return this.#racha; }
  get habitosCompletados() { return [...this.#habitosCompletados]; }
  get nivel() { return this.#nivel; }

  /**
   * Registra un hábito como completado y suma puntos.
   * @param {import('./Habito.js').Habito} habito - Hábito completado.
   * @returns {void}
   */
  completarHabito(habito) {
    habito.completar();
    this.#habitosCompletados.push(habito);
    this.#puntos += habito.puntos;
    this.#racha++;
    this.#actualizarNivel();
  }

  /**
   * Recalcula el nivel según los puntos actuales.
   * @returns {void}
   */
  #actualizarNivel() {
    const umbrales = [0, 500, 1500, 3000, 6000, 10000];
    this.#nivel = umbrales.filter((umbral) => this.#puntos >= umbral).length;
  }

  /**
   * Serializa el empleado a objeto plano.
   * @returns {Object} Empleado serializado.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      puntos: this.#puntos,
      racha: this.#racha,
      nivel: this.#nivel,
      habitos: this.#habitosCompletados.map((habito) => habito.toJSON())
    };
  }
}

export class Manager extends Usuario {
  #equipo;
  #departamento;

  /**
   * Crea un manager con un equipo asignable.
   * @param {string} id - Identificador único.
   * @param {string} nombre - Nombre del manager.
   * @param {string} email - Email del manager.
   * @param {string} departamento - Departamento gestionado.
   */
  constructor(id, nombre, email, departamento) {
    super(id, nombre, email, 'manager');
    this.#equipo = [];
    this.#departamento = departamento;
  }

  get equipo() { return [...this.#equipo]; }
  get departamento() { return this.#departamento; }

  /**
   * Añade un empleado al equipo.
   * @param {Empleado} empleado - Empleado que se incorporará al equipo.
   * @returns {void}
   */
  añadirEmpleado(empleado) {
    if (!(empleado instanceof Empleado)) {
      throw new TypeError('Solo se pueden añadir instancias de Empleado');
    }
    if (!this.#equipo.find((miembro) => miembro.id === empleado.id)) {
      this.#equipo.push(empleado);
    }
  }

  /**
   * Elimina un empleado del equipo por id.
   * @param {string} id - Identificador del empleado.
   * @returns {void}
   */
  eliminarEmpleado(id) {
    this.#equipo = this.#equipo.filter((empleado) => empleado.id !== id);
  }

  /**
   * Calcula estadísticas del equipo.
   * @returns {{media: number, total: number, top: Empleado|null, totalEmpleados?: number}} Estadísticas agregadas.
   */
  obtenerEstadisticasEquipo() {
    if (this.#equipo.length === 0) return { media: 0, total: 0, top: null };
    const total = this.#equipo.reduce((acc, empleado) => acc + empleado.puntos, 0);
    const top = this.#equipo.reduce((a, b) => (a.puntos > b.puntos ? a : b));
    return {
      media: Math.round(total / this.#equipo.length),
      total,
      top,
      totalEmpleados: this.#equipo.length
    };
  }

  /**
   * Serializa el manager a objeto plano.
   * @returns {Object} Manager serializado.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      departamento: this.#departamento,
      equipo: this.#equipo.map((empleado) => empleado.toJSON())
    };
  }
}
