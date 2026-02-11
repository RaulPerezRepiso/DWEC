import versionBasica, {
  saludar as saludarBasico,
  contarLetras,
} from "./main2.js";

import * as Utils from "./utils.js";

const btn = document.getElementById("btn");
const salida = document.getElementById("resultado");
const input = document.getElementById("nombre");

btn.addEventListener("click", () => {
  const nombre = input.value;

  if (!nombre) {
    salida.textContent = "Escribe un nombre primero";
    return;
  }

  // main2.js
  const mensajeBasico = saludarBasico(nombre);
  const letras = contarLetras(nombre);
  const version1 = versionBasica();

  // utils.js
  const saludoAvanzado = Utils.saludar(nombre);
  const iva = Utils.IVA;
  const user = new Utils.Usuario(nombre);
  const suma = Utils.Calculadora.sumar(10, 5);
  const version2 = Utils.default();

  salida.innerText =
    "=== MÓDULO main2.js ===\n" +
    mensajeBasico +
    "\nTu nombre tiene " +
    letras +
    " letras\nVersión básica: " +
    version1 +
    "\n\n=== MÓDULO utils.js ===\n" +
    saludoAvanzado +
    "\n" +
    user.info() +
    "\nIVA: " +
    iva +
    "\n10 + 5 = " +
    suma +
    "\nVersión avanzada: " +
    version2;
});
