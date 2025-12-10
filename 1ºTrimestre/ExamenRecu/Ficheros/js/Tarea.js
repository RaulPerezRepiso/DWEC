export class Tarea {
  #nombre = "";
  descripcion = "";
  #prioridad = "";
  responsable = "";
  fecha = "";
  estado = "";
  constructor(nombre, descripcion, prioridad, responsable, fecha, estado) {
    this.#nombre = nombre;
    this.descripcion = descripcion;
    this.#prioridad = prioridad;
    this.responsable = responsable;
    let fechaEsp = new Date(fecha)
    this.fecha = fechaEsp.toLocaleDateString();
    this.estado = estado;
  }
  get nombre() {
    return this.#nombre;
  }
  get descripcion() {
    return this.descripcion;
  }
  get prioridad() {
    return this.#prioridad;
  }
  get responsable() {
    return this.responsable;
  }
  get fecha() {
    return this.fecha;
  }
  get estado() {
    return this.estado;
  }

  set nombre(p) {
    this.#nombre = p;
  }
  set descripcion(p) {
    this.descripcion = p;
  }
  set prioridad(p) {
    this.#prioridad = p;
  }
  set responsable(p) {
    this.responsable = p;
  }
  set fecha(p) {
    this.fecha = p;
  }
  set estado(p) {
    this.estado = p;
  }
}
