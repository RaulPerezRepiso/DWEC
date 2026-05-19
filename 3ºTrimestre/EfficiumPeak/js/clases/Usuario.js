/**
 * Clase base para representar usuarios del sistema.
 */
export class Usuario {
  #id;
  #nombre;
  #email;
  #rol;

  constructor({ id, nombre, email, rol }) {
    this.#id = id;
    this.#nombre = nombre;
    this.#email = email;
    this.#rol = rol;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get email() { return this.#email; }
  get rol() { return this.#rol; }

  crearIniciales() {
    return this.#nombre
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'US';
  }

  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      email: this.#email,
      rol: this.#rol
    };
  }
}

/**
 * Clase de empleado.
 */
export class Empleado extends Usuario {
  #puntos;
  #racha;
  #habitos;
  #progreso;
  #riesgo;

  constructor(datos, resumen = null, riesgo = 'Bajo') {
    super({ ...datos, rol: 'empleado' });
    this.#puntos = Number(resumen?.puntosTotales ?? datos.puntos ?? 0);
    this.#racha = Number(resumen?.racha ?? datos.racha ?? 0);
    this.#habitos = Number(resumen?.habitosCompletados ?? datos.habitosCompletados?.length ?? 0);
    this.#progreso = Number(resumen?.progreso ?? datos.progreso ?? 0);
    this.#riesgo = riesgo;
  }

  get puntos() { return this.#puntos; }
  get racha() { return this.#racha; }
  get habitos() { return this.#habitos; }
  get progreso() { return this.#progreso; }
  get riesgo() { return this.#riesgo; }

  toPanelData() {
    return {
      ...this.toJSON(),
      iniciales: this.crearIniciales(),
      rol: 'Empleado',
      puntos: this.#puntos,
      racha: this.#racha,
      habitos: this.#habitos,
      progreso: this.#progreso,
      riesgo: this.#riesgo
    };
  }
}

/**
 * Clase de manager (responsbable de empleados).
 */
export class Manager extends Usuario {
  #departamento;
  #equipo;

  constructor(datos, equipo = []) {
    super({ ...datos, rol: 'manager' });
    this.#departamento = datos.departamento ?? 'Operaciones';
    this.#equipo = equipo;
  }

  get departamento() { return this.#departamento; }
  get equipo() { return [...this.#equipo]; }

  obtenerTotalEquipo() {
    return this.#equipo.length;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      departamento: this.#departamento,
      totalEquipo: this.obtenerTotalEquipo()
    };
  }
}
