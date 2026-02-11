export function saludar(nombre) {
  return `Hola ${nombre}, esto viene desde main2.js`;
}

export function contarLetras(texto) {
  return texto.length;
}

export default function version() {
  return "v1.0 - módulo main2";
}
