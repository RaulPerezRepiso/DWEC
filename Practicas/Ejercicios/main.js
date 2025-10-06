// Declaracion de Variables
// Variables Ejercicio 1
let nombre = document.getElementById("nombre");
let apellidos = document.getElementById("apellidos");
let curso = document.getElementById("curso");
let nota1 = document.getElementById("nota1");
let nota2 = document.getElementById("nota2");
let nota3 = document.getElementById("nota3");
let b1 = document.getElementById("b1");
let alumnos = document.getElementById("alumnos");

// Variables Ejercicio 2
let n1 = document.getElementById("n1");
let n2 = document.getElementById("n2");
let resultado = document.getElementById("resultado");
let bBinario = document.getElementById("bBinario");

// Variables Ejercicio 3
let euros = document.getElementById("euros");
let dollares = document.getElementById("dollares");
let yenes = document.getElementById("yenes");
let bEur = document.getElementById("bEur");

// Variables Ejercicio 4
let radio = document.getElementById("radio");
let area = document.getElementById("area");
let perimetro = document.getElementById("perimetro");
let b2 = document.getElementById("b2");

// Variables Ejercicio 5
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let bPares = document.getElementById("bPares");
let rPares = document.getElementById("rPares");

// Variables Ejercicio 6
let nume1 = document.getElementById("nume1");
let nume2 = document.getElementById("nume2");
let bOpe = document.getElementById("bOpe");
let rOpe = document.getElementById("rOpe");
let rSuma = document.getElementById("rSuma");
let rResta = document.getElementById("rResta");
let rMulti = document.getElementById("rMulti");
let rDivi = document.getElementById("rDivi");

// Variables Ejercicio 7
let note1 = document.getElementById("note1");
let note2 = document.getElementById("note2");
let note3 = document.getElementById("note3");
let rNota = document.getElementById("rNota");
let bMedia = document.getElementById("bMedia");

// Variables Ejercicio 8
let bGenerar = document.getElementById("bGenerar");
let rGenerar = document.getElementById("rGenerar");

// Variables Ejercicio 9
let bGenera1 = document.getElementById("bGenerar1");
let rGenerar1 = document.getElementById("rGenerar1");

/*********** Ejercicio 1 */
b1.onclick = () => {
  let myArrayC2 = [nota1.value, nota2.value, nota3.value];
  let myArrayC1 = [nombre.value, apellidos.value, curso.value, myArrayC2];

  for (elem of myArrayC1) {
    alumnos.innerHTML += elem + "  ";
  }
  alumnos.innerHTML += "<br>";
};

/*********** Ejercicio 2 */
bBinario.onclick = () => {
  if ((n1.value == 0 || n1.value == 1) && (n2.value == 0 || n2.value == 1)) {
  }
  if (n1.value == 0 && n2.value == 0) {
    resultado.innerText = "0";
  } else if (n1.value == 0 && n2.value == 1) {
    resultado.innerText = "1";
  } else if (n1.value == 1 && n2.value == 0) {
    resultado.innerText = "1";
  } else if (n1.value == 1 && n2.value == 1) {
    resultado.innerText = "0";
  } else {
    resultado.innerText = "Error: Introduce 0 o 1";
  }
};

/*********** Ejercicio 3 */
bEur.onclick = () => {
  dollares.innerText = euros.value * 1.18 + "$";
  yenes.innerText = euros.value * 173 + "¥";
};

/*********** Ejercicio 4 */
b2.onclick = () => {
  area.innerText = 2 * Math.pow(radio.value, 2) * Math.PI;
  perimetro.innerText = 2 * radio.value * Math.PI;
};

/*********** Ejercicio 5 */
bPares.onclick = () => {
  rPares.innerText = " ";
  if (num1.value > -100 && num2.value <= 5000) {
    for (let i = parseInt(num1.value); i <= parseInt(num2.value); i++) {
      if (i % 2 == 0) {
        rPares.innerText += " " + i;
      }
    }
  } else {
    rPares.innerText = "Error: Introduce números entre -99 y 5000";
  }
};

/*********** Ejercicio 6 */
bOpe.onclick = () => {
  if (nume2.value != 0) {
    rSuma.innerText = parseInt(nume1.value) + parseInt(nume2.value);
    rResta.innerText = parseInt(nume1.value) - parseInt(nume2.value);
    rMulti.innerText = parseInt(nume1.value) * parseInt(nume2.value);
    rDivi.innerText = parseInt(nume1.value) / parseInt(nume2.value);
  } else {
    rDivi.innerText = "Error: No se puede dividir entre 0";
  }
};

/*********** Ejercicio 7 */
bMedia.onclick = () => {
  rNota.innerText = " ";
  if (
    note1.value >= 0 &&
    note1.value <= 10 &&
    note2.value >= 0 &&
    note2.value <= 10 &&
    note3.value >= 0 &&
    note3.value <= 10
  ) {
    let notaMedia =
      (parseFloat(note1.value) +
        parseFloat(note2.value) +
        parseFloat(note3.value)) /
      3;
    switch (true) {
      case notaMedia < 5:
        rNota.innerText = "SUSPENSO";
        break;
      case notaMedia <= 7:
        rNota.innerText = "APROBADO";
        break;
      case notaMedia <= 8.5:
        rNota.innerText = "NOTABLE";
        break;
      default:
        rNota.innerHTML = "SOBRESALIENTE";
        break;
    }
  } else {
    rNota.innerText = "Error: Introduce notas entre 0 y 10";
  }
};

/*********** Ejercicio 8 */
bGenerar.onclick = () => {
  rGenerar.innerText = " ";
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= i; j++) {
      rGenerar.innerText += i;
    }
    rGenerar.innerText += "\n";
  }
};

/*********** Ejercicio 9 */
bGenerar1.onclick = () => {
  rGenerar.innerText = " ";
  for (let i = 1; i <= 50; i++) {
    rGenerar1.innerText += " ";
    for (let j = 1; j <= i; j++) {
      rGenerar1.innerText += j;
      
    }
    rGenerar1.innerText += "\n";
  }
};

/*********** Ejercicio 10 */

/*********** Ejercicio 11 */

/*********** Ejercicio 12 */

/*********** Ejercicio 13 */

/*********** Ejercicio 14 */

/*********** Ejercicio 15 */

/*********** Ejercicio 16 */

/*********** Ejercicio 17 */

/*********** Ejercicio 18 */

/*********** Ejercicio 19 */

/*********** Ejercicio 20 */
