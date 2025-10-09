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

// Variables Ejercicio 10
let arrow = document.getElementById("arrow");
let bArrow = document.getElementById("bArrow");
let rArrow = document.getElementById("rArrow");

// Variables Ejercicio 11
let bPum = document.getElementById("bPum");
let rPum = document.getElementById("rPum");
let bPumGene = document.getElementById("bPumGene");

// Variables Ejercicio 12
let bConteo = document.getElementById("bConteo");
let rConteo = document.getElementById("rConteo");

// Variables Ejercicio 13
let bDados = document.getElementById("bDados");
let rDados = document.getElementById("rDados");

// Variables Ejercicio 14
let numeros = document.getElementById("numeros");
let rNums = document.getElementById("rNums");
let bNums = document.getElementById("bNums");

// Variables Ejercicio 15
let texto = document.getElementById("texto");
let rInv = document.getElementById("rInv");
let bAña = document.getElementById("bAña");
let bInv = document.getElementById("bInv");

// Variables Ejercicio 16
let pass = document.getElementById("pass");
let rPass = document.getElementById("rPass");
let bPass = document.getElementById("bPass");

// Variables Ejercicio 17

// Variables Ejercicio 18

// Variables Ejercicio 19

// Variables Ejercicio 20

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
        rNota.innerText = "SOBRESALIENTE";
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
    for (let j = 1; j <= i; j++) {
      rGenerar1.innerText += j;
    }
    rGenerar1.innerText += "\n";
  }
};

/*********** Ejercicio 10 */
bArrow.onclick = () => {
  rArrow.innerText = " ";
  if (parseFloat(arrow.value) % 2 == 0) rArrow.innerText += "Par";
  else rArrow.innerText += "Impar";
};

/*********** Ejercicio 11 */
bPum.onclick = () => {
  rPum.innerText = " ";
  for (let i = 1; i <= 100; i++) {
    if (i % 7 == 0 || i % 10 == 7) rPum.innerText += "PUM" + ", ";
    else rPum.innerText += i + ", ";
  }
};

function* generadorPum() {
  for (let i = 1; i <= 100; i++) {
    if (i % 10 === 7 || i % 7 === 0) {
      yield "PUM";
    } else {
      yield i.toString();
    }
  }
}

bPumGene.onclick = () => {
  const gen = generadorPum();
  let resultado = "";
  let count = 1;

  for (let valor of gen) {
    resultado += valor;

    count++;
  }

  rPum.innerText += resultado;
};

/*********** Ejercicio 12 */
bConteo.onclick = () => {
  rConteo.innerText = " ";
  for (let i = 1; i <= 300; i++) {
    const span = document.createElement("span");
    span.innerText = i + " ";

    // Estilos condicionales
    if (i % 4 === 0 && i % 9 === 0) {
      span.style.color = "purple"; // mezcla visual
      span.style.fontSize = "22px"; // 16 + 4 + 2
    } else if (i % 4 === 0) {
      span.style.color = "green";
      span.style.fontSize = "20px"; // 16 + 4
    } else if (i % 9 === 0) {
      span.style.color = "red";
      span.style.fontSize = "18px"; // 16 + 2
    }

    rConteo.appendChild(span);

    // Salto de línea cada 10 números
    if (i % 10 === 0) {
      rConteo.appendChild(document.createElement("br"));
    }
  }
};

/*********** Ejercicio 13 */
bDados.onclick = () => {
  rDados.innerText = "";
  let resultados = {};

  // Guarda los resultados desde el 2 al 12
  for (let i = 2; i <= 12; i++) {
    resultados[i] = 0;
  }

  // Genera los 36000 resultados de lanzar 2 dados
  for (let i = 1; i <= 36000; i++) {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    let suma = d1 + d2;

    resultados[suma]++;
  }

  // Muestra los resultado con un for in
  for (let suma in resultados) {
    rDados.innerText +=
      "Suma " + suma + ": " + resultados[suma] + " apariciones\n";
  }
};
/*********** Ejercicio 14 */
// Array fuera sino vamos a estar reiniciandolo a 0 cada vez que hacemos click
let arrayNums = [];
let resumenMostrado = false;

bNums.onclick = () => {
  let num = Number(numeros.value); // Convertimos a número

  while (num === 0) {
    // Orden descendente
    let ordenados = [...arrayNums].sort((a, b) => b - a);

    // Mayor y menor
    let max = Math.max(...arrayNums);
    let min = Math.min(...arrayNums);

    // Ocurrencias
    let ocurrenciasMax = arrayNums.filter((n) => n === max).length;
    let ocurrenciasMin = arrayNums.filter((n) => n === min).length;

    // Mostrar resultados
    rNums.innerText =
      "Números introducidos (orden descendente):\n" +
      ordenados.join(", ") +
      "\n\n" +
      `Mayor: ${max} (ocurre ${ocurrenciasMax} veces)\n` +
      `Menor: ${min} (ocurre ${ocurrenciasMin} veces)\n`;

    arrayNums = []; // Reiniciamos el array
    resumenMostrado = true; // Activamos la bandera
    numeros.value = "";
    numeros.focus();
    return;
  }

  // Si ya se mostró el resumen, limpiamos antes de continuar
  if (resumenMostrado) {
    rNums.innerText = "";
    resumenMostrado = false;
  }

  // Guardamos el número
  arrayNums.push(num);

  // Mostramos el número actual
  rNums.innerText += num + ", ";

  // Limpiamos el input y mantenemos el foco
  numeros.value = "";
  numeros.focus();
};

/*********** Ejercicio 15 */
let arrayTodo = [];
let resumenMostrado2 = false;

bAña.onclick = () => {
  let text = texto.value;
  arrayTodo.push(text);
  texto.focus();
  texto.value = "";
  rInv.innerText += text + ", ";
  resumenMostrado2 = true;

  // Si ya se mostró el resumen, limpiamos antes de continuar
  if (resumenMostrado2) {
    rInv.innerText = "";
    resumenMostrado2 = false;
  }
};

bInv.onclick = () => {
  rInv.innerText = "";
  arrayTodo.reverse();
  for (let i = 0; i < arrayTodo.length; i++) {
    rInv.innerText += arrayTodo[i] + ", ";
  }
  arrayTodo = [];
};

/*********** Ejercicio 16 */


let conjunto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ" + "abcdefghijklmnñopqrstuvwxyz" +"áéíóúÁÉÍÓÚ"+ "0123456789!@#$%^&*()";

bPass.onclick = () => {
  rPass.innerText = "";

  if (pass.value == "" || pass.value < 8)
    rPass.innerText = "Debe introducir un número mínimo de 8 Bytes";
  else {
    for (let i = 0; i < pass.value; i++) {
      let randomIndex = Math.floor(Math.random() * conjunto.length);
      rPass.innerText += conjunto[randomIndex];
    }
  }
};

/*********** Ejercicio 17 */

/*********** Ejercicio 18 */

/*********** Ejercicio 19 */

/*********** Ejercicio 20 */
