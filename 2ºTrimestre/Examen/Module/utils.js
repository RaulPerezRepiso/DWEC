export function saludar(nombre) {
  return `Hola ${nombre}, bienvenido al sistema avanzado`;
}

export const IVA = 0.21;

export class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }

  info() {
    return `Usuario: ${this.nombre}`;
  }
}

export const Calculadora = {
  sumar(a, b) {
    return a + b;
  }
};

export default function version() {
  return "Módulo avanzado v2.0";
}
  