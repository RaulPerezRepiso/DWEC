/**
 * Clase que representa un reto asignable a un empleado o a todo el equipo.
 */
export class Reto {
  #id;
  #titulo;
  #descripcion;
  #empleadoId;
  #empleadoNombre;
  #meta;
  #progreso;
  #creadoPor;

  constructor({ id, titulo, descripcion, empleadoId, empleadoNombre, meta, progreso = 0, creadoPor }) {
    this.#id = id;
    this.#titulo = titulo;
    this.#descripcion = descripcion;
    this.#empleadoId = empleadoId;
    this.#empleadoNombre = empleadoNombre;
    this.#meta = Number(meta);
    this.#progreso = Number(progreso);
    this.#creadoPor = creadoPor;
  }

  get id() { return this.#id; }
  get titulo() { return this.#titulo; }
  get descripcion() { return this.#descripcion; }
  get empleadoId() { return this.#empleadoId; }
  get empleadoNombre() { return this.#empleadoNombre; }
  get meta() { return this.#meta; }
  get progreso() { return this.#progreso; }
  get creadoPor() { return this.#creadoPor; }

  perteneceA(empleadoId) {
    return this.#empleadoId === 'todos' || this.#empleadoId === empleadoId;
  }

  getPorcentaje() {
    return this.#meta > 0 ? Math.min(100, Math.round((this.#progreso / this.#meta) * 100)) : 0;
  }

  toJSON() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      descripcion: this.#descripcion,
      empleadoId: this.#empleadoId,
      empleadoNombre: this.#empleadoNombre,
      meta: this.#meta,
      progreso: this.#progreso,
      porcentaje: this.getPorcentaje(),
      creadoPor: this.#creadoPor
    };
  }
}
