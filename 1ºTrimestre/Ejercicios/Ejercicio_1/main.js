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
let Nc1 = document.getElementById("Nc1");
let Nc2 = document.getElementById("Nc2");
let bCalc = document.getElementById("bCalc");
let rCalc = document.getElementById("rCalc");

// Variables Ejercicio 18
let nMenu = document.getElementById("nMenu");
let nMenu2 = document.getElementById("nMenu2");
let bMenu = document.getElementById("bMenu");
let rMenu = document.getElementById("rMenu");
let bOpera = document.getElementById("bOpera");

// Variables Ejercicio 19
let nHoras = document.getElementById("nHoras");
let bHoras = document.getElementById("bHoras");
let rHoras = document.getElementById("rHoras");
let bMañana = document.getElementById("bMañana");
let bTarde = document.getElementById("bTarde");
let bNoche = document.getElementById("bNoche");
let nNombre = document.getElementById("nNombre");
let nApellido = document.getElementById("nApellido");

// Variables Ejercicio 20
let nAleatorio = document.getElementById("nAleatorio");
let bComprobar = document.getElementById("bComprobar");
let rPistas = document.getElementById("rPistas");

/*********** Ejercicio 1 */
// Recoge datos del alumno: nombre, apellidos, curso y tres notas.
// Agrupa las notas en un array interno (myArrayC2) y todo en otro array (myArrayC1).
// Luego recorre el array principal y muestra cada elemento en pantalla.
b1.onclick = () => {
  let myArrayC2 = [nota1.value, nota2.value, nota3.value]; // Array de notas
  let myArrayC1 = [nombre.value, apellidos.value, curso.value, myArrayC2]; // Datos completos del alumno

  for (elem of myArrayC1) {
    alumnos.innerHTML += elem + "  "; // Muestra cada dato seguido
  }
  alumnos.innerHTML += "<br>"; // Salto de línea al final
};

/*********** Ejercicio 2 */
// Simula una operación lógica XOR entre dos bits (0 o 1).
// Valida que los valores sean binarios y muestra el resultado correspondiente.
// Si los valores no son válidos, muestra un mensaje de error.
bBinario.onclick = () => {
  if ((n1.value == 0 || n1.value == 1) && (n2.value == 0 || n2.value == 1)) {
    // Validación binaria (aunque no hace nada aquí)
  }

  // Operaciones XOR manuales
  if (n1.value == 0 && n2.value == 0) {
    resultado.innerText = "0";
  } else if (n1.value == 0 && n2.value == 1) {
    resultado.innerText = "1";
  } else if (n1.value == 1 && n2.value == 0) {
    resultado.innerText = "1";
  } else if (n1.value == 1 && n2.value == 1) {
    resultado.innerText = "0";
  } else {
    resultado.innerText = "Error: Introduce 0 o 1"; // Si no son binarios
  }
};

/*********** Ejercicio 3 */
// Convierte una cantidad en euros a dólares y yenes.
// Usa tasas fijas: 1€ = 1.18$ y 1€ = 173¥.
bEur.onclick = () => {
  dollares.innerText = euros.value * 1.18 + "$"; // Conversión a dólares
  yenes.innerText = euros.value * 173 + "¥"; // Conversión a yenes
};

/*********** Ejercicio 4 */
// Calcula el área y el perímetro de un círculo dado su radio.
// Fórmulas:
// Área = 2 * r² * π (no es la fórmula estándar, normalmente es π * r²)
// Perímetro = 2 * r * π
b2.onclick = () => {
  area.innerText = 2 * Math.pow(radio.value, 2) * Math.PI; // Área modificada
  perimetro.innerText = 2 * radio.value * Math.PI; // Perímetro
};

/*********** Ejercicio 5 */
// Muestra todos los números pares entre dos valores dados.
// Valida que estén dentro del rango permitido (-99 a 5000).
bPares.onclick = () => {
  rPares.innerText = " ";
  if (num1.value > -100 && num2.value <= 5000) {
    for (let i = parseInt(num1.value); i <= parseInt(num2.value); i++) {
      if (i % 2 == 0) {
        rPares.innerText += " " + i; // Solo muestra pares
      }
    }
  } else {
    rPares.innerText = "Error: Introduce números entre -99 y 5000"; // Validación de rango
  }
}

/*********** Ejercicio 6 */
// Al hacer clic en el botón bOpe, se realizan operaciones matemáticas básicas entre nume1 y nume2.
// Se comprueba que nume2 no sea 0 para evitar división por cero.
// Si es válido, se calcula y muestra: suma, resta, multiplicación y división.
// Si nume2 es 0, se muestra un mensaje de error en rDivi.
bOpe.onclick = () => {
  if (nume2.value != 0) {
    rSuma.innerText = parseInt(nume1.value) + parseInt(nume2.value); // suma
    rResta.innerText = parseInt(nume1.value) - parseInt(nume2.value); // resta
    rMulti.innerText = parseInt(nume1.value) * parseInt(nume2.value); // multiplicación
    rDivi.innerText = parseInt(nume1.value) / parseInt(nume2.value); // división
  } else {
    rDivi.innerText = "Error: No se puede dividir entre 0"; // control de error
  }
};

/*********** Ejercicio 7 */
// Al hacer clic en bMedia, se calcula la media de tres notas.
// Primero se limpia el resultado y se valida que las tres notas estén entre 0 y 10.
// Si son válidas, se calcula la media y se clasifica en: SUSPENSO, APROBADO, NOTABLE o SOBRESALIENTE.
// Si alguna nota no es válida, se muestra un mensaje de error.
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
        rNota.innerText = "SUSPENSO"; // media menor que 5
        break;
      case notaMedia <= 7:
        rNota.innerText = "APROBADO"; // media entre 5 y 7
        break;
      case notaMedia <= 8.5:
        rNota.innerText = "NOTABLE"; // media entre 7 y 8.5
        break;
      default:
        rNota.innerText = "SOBRESALIENTE"; // media mayor a 8.5
        break;
    }
  } else {
    rNota.innerText = "Error: Introduce notas entre 0 y 10"; // control de error
  }
};

/*********** Ejercicio 8 */
// Al hacer clic en bGenerar, se genera una pirámide de números.
// Por cada número del 1 al 50, se repite ese número tantas veces como su valor.
// Cada línea representa un número repetido.
bGenerar.onclick = () => {
  rGenerar.innerText = " ";
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= i; j++) {
      rGenerar.innerText += i; // repite el número i
    }
    rGenerar.innerText += "\n"; // salto de línea
  }
};

/*********** Ejercicio 9 */
// Al hacer clic en bGenerar1, se genera una pirámide ascendente.
// Por cada número del 1 al 50, se imprime una secuencia desde 1 hasta ese número.
// Cada línea muestra una secuencia creciente.
bGenerar1.onclick = () => {
  rGenerar.innerText = " ";
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= i; j++) {
      rGenerar1.innerText += j; // imprime j en orden ascendente
    }
    rGenerar1.innerText += "\n"; // salto de línea
  }
};

/*********** Ejercicio 10 */
// Al hacer clic en bArrow, se determina si el número introducido es par o impar.
// Se convierte el valor a número y se evalúa con el operador módulo.
// Se muestra "Par" si es divisible por 2, "Impar" si no lo es.
bArrow.onclick = () => {
  rArrow.innerText = " ";
  if (parseFloat(arrow.value) % 2 == 0) rArrow.innerText += "Par"; // número par
  else rArrow.innerText += "Impar"; // número impar
};

/*********** Ejercicio 11 */
// Al hacer clic en bPum, se imprime del 1 al 100.
// Si el número es múltiplo de 7 o termina en 7, se muestra "PUM".
// Si no, se muestra el número normal.
bPum.onclick = () => {
  rPum.innerText = " ";
  for (let i = 1; i <= 100; i++) {
    if (i % 7 == 0 || i % 10 == 7) rPum.innerText += "PUM" + ", ";
    else rPum.innerText += i + ", ";
  }
};

// Función generadora que produce la secuencia del ejercicio anterior.
// Usa yield para devolver "PUM" o el número como string.
function* generadorPum() {
  for (let i = 1; i <= 100; i++) {
    if (i % 10 === 7 || i % 7 === 0) {
      yield "PUM";
    } else {
      yield i.toString();
    }
  }
}

// Al hacer clic en bPumGene, se recorre el generador y se acumulan los valores.
// Se muestra el resultado completo en rPum.
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
// Al hacer clic en bConteo, se imprimen los números del 1 al 300.
// Se aplican estilos condicionales si el número es múltiplo de 4, 9 o ambos.
// Se añade salto de línea cada 10 números.
bConteo.onclick = () => {
  rConteo.innerText = " ";
  for (let i = 1; i <= 300; i++) {
    const span = document.createElement("span");
    span.innerText = i + " ";

    // Estilo púrpura si es múltiplo de 4 y 9
    if (i % 4 === 0 && i % 9 === 0) {
      span.style.color = "purple";
      span.style.fontSize = "22px";
    }
    // Estilo verde si es múltiplo de 4
    else if (i % 4 === 0) {
      span.style.color = "green";
      span.style.fontSize = "20px";
    }
    // Estilo rojo si es múltiplo de 9
    else if (i % 9 === 0) {
      span.style.color = "red";
      span.style.fontSize = "18px";
    }

    rConteo.appendChild(span);

    // Salto de línea cada 10 números
    if (i % 10 === 0) {
      rConteo.appendChild(document.createElement("br"));
    }
  }
};

/*********** Ejercicio 13 */
// Al hacer clic en bDados, se simulan 36000 lanzamientos de dos dados.
// Se cuenta cuántas veces aparece cada suma posible (2 a 12).
// Se muestra el conteo final en rDados.
bDados.onclick = () => {
  rDados.innerText = "";
  let resultados = {};

  // Inicializa el objeto con claves del 2 al 12
  for (let i = 2; i <= 12; i++) {
    resultados[i] = 0;
  }

  // Simula los lanzamientos
  for (let i = 1; i <= 36000; i++) {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    let suma = d1 + d2;

    resultados[suma]++;
  }

  // Muestra los resultados
  for (let suma in resultados) {
    rDados.innerText +=
      "Suma " + suma + ": " + resultados[suma] + " apariciones\n";
  }
};

/*********** Ejercicio 14 */
// Al hacer clic en bNums, se guarda el número introducido en arrayNums.
// Si el número es 0, se muestra un resumen: orden descendente, mayor, menor y ocurrencias.
// Luego se reinicia el array y el estado.
let arrayNums = [];
let resumenMostrado = false;

bNums.onclick = () => {
  let num = Number(numeros.value); // Convertimos a número

  while (num === 0) {
    let ordenados = [...arrayNums].sort((a, b) => b - a);
    let max = Math.max(...arrayNums);
    let min = Math.min(...arrayNums);
    let ocurrenciasMax = arrayNums.filter((n) => n === max).length;
    let ocurrenciasMin = arrayNums.filter((n) => n === min).length;

    rNums.innerText =
      "Números introducidos (orden descendente):\n" +
      ordenados.join(", ") +
      "\n\n" +
      `Mayor: ${max} (ocurre ${ocurrenciasMax} veces)\n` +
      `Menor: ${min} (ocurre ${ocurrenciasMin} veces)\n`;

    arrayNums = [];
    resumenMostrado = true;
    numeros.value = "";
    numeros.focus();
    return;
  }

  // Si ya se mostró el resumen, se limpia antes de continuar
  if (resumenMostrado) {
    rNums.innerText = "";
    resumenMostrado = false;
  }

  arrayNums.push(num);
  rNums.innerText += num + ", ";
  numeros.value = "";
  numeros.focus();
};

/*********** Ejercicio 15 */
// Al hacer clic en bAña, se guarda el texto introducido en arrayTodo.
// Si ya se mostró el resumen, se limpia antes de continuar.
let arrayTodo = [];
let resumenMostrado2 = false;

bAña.onclick = () => {
  let text = texto.value;
  arrayTodo.push(text);
  texto.focus();
  texto.value = "";
  rInv.innerText += text + ", ";
  resumenMostrado2 = true;

  if (resumenMostrado2) {
    rInv.innerText = "";
    resumenMostrado2 = false;
  }
};

// Al hacer clic en bInv, se muestra el contenido de arrayTodo en orden inverso.
// Luego se reinicia el array.
bInv.onclick = () => {
  rInv.innerText = "";
  arrayTodo.reverse();
  for (let i = 0; i < arrayTodo.length; i++) {
    rInv.innerText += arrayTodo[i] + ", ";
  }
  arrayTodo = [];
};

/*********** Ejercicio 16 */
// Al hacer clic en bPass, se genera una contraseña aleatoria.
// Se usa el conjunto de caracteres definido en la variable 'conjunto'.
// Si el valor introducido es menor a 8, se muestra un mensaje de error.
// Si es válido, se genera una contraseña con longitud igual al valor introducido.
let conjunto =
  "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ" +
  "abcdefghijklmnñopqrstuvwxyz" +
  "áéíóúÁÉÍÓÚ" +
  "0123456789!@#$%^&*()";

bPass.onclick = () => {
  rPass.innerText = "";

  if (pass.value == "" || pass.value < 8)
    rPass.innerText = "Debe introducir un número mínimo de 8 Bytes"; // validación mínima
  else {
    for (let i = 0; i < pass.value; i++) {
      let randomIndex = Math.floor(Math.random() * conjunto.length); // índice aleatorio
      rPass.innerText += conjunto[randomIndex]; // añade carácter aleatorio
    }
  }
};

/*********** Ejercicio 17 */
// Al hacer clic en bCalc, se calcula y muestra los números entre Nc1 y Nc2 (excluidos).
// También se muestra cuál es el menor y cuántos números hay entre ambos.
bCalc.onclick = () => {
  rCalc.innerText = "";

  let array = [];

  array.push(Nc1.value);
  array.push(Nc2.value);

  let min = Math.min(...array); // menor de los dos
  let max = Math.max(...array); // mayor de los dos

  for (let i = min + 1; i < max; i++) {
    if (i == max - 1) rCalc.innerText += i; // último número sin coma
    else {
      rCalc.innerText += i + ", "; // números intermedios
    }
  }

  let contador = max - min;
  rCalc.innerText +=
    "\nEl menor es: " + min + " hay " + contador + " entre ellos";
};

/*********** Ejercicio 18 */
// Al hacer clic en bMenu, se muestra un menú de opciones para verificar múltiplos.
// Al hacer clic en bOpera, se ejecuta la opción seleccionada según el valor de nMenu2.
// Las funciones uno(), dos() y tres() verifican si nMenu es múltiplo de 2, 3 o 5 respectivamente.
bMenu.onclick = () => {
  rMenu.innerText =
    "Menú\n ---\n 1.Calcular si es múliplo de 2\n 2.Calcular si es múliplo de 3\n 3.Calcular si es múliplo de 5\n 0. Salir";
};

bOpera.onclick = () => {
  if (nMenu2.value == 0) {
    rMenu.innerText = ""; // salir
  } else if (nMenu2.value == 1) {
    uno(); // opción 1
  } else if (nMenu2.value == 2) {
    dos(); // opción 2
  } else if (nMenu2.value == 3) {
    tres(); // opción 3
  } else {
    rMenu.innerText = "Número introducido no válido"; // error
  }

  function uno() {
    if (nMenu.value % 2 == 0) {
      rMenu.innerText = "El número es multiplo de 2";
    } else rMenu.innerText = "El número no es múltiplo de 2";
  }

  function dos() {
    if (nMenu.value % 3 == 0) {
      rMenu.innerText = "El número es multiplo de 3";
    } else rMenu.innerText = "El número no es múltiplo de 3";
  }

  function tres() {
    if (nMenu.value % 5 == 0) {
      rMenu.innerText = "El número es multiplo de 5";
    } else rMenu.innerText = "El número no es múltiplo de 5";
  }
};

/*********** Ejercicio 19 */
// Al hacer clic en bEmpleado, se recogen los datos del empleado y se calculan salario bruto y neto.
// Se guarda en el array empleados y se muestra mensaje de confirmación.
// Al hacer clic en bHoras, se muestra la lista de empleados con sus salarios y el total acumulado.
const empleados = [];

bEmpleado.onclick = () => {
  const datos = datosEmpleado(); // nombre y apellido
  const salarioBruto = calHoras(); // cálculo según turno
  const salarioNeto = calNeto(); // cálculo con retención

  empleados.push([datos, salarioBruto, salarioNeto]); // guarda datos

  nNombre.value = "";
  nApellido.value = "";
  nHoras.value = "";
  rHoras.innerText = "Trabajador añadido correctamente.";
};

bHoras.onclick = () => {
  rHoras.innerText = "";

  let contador = 1;
  let salarioTotal = 0;

  for (const empleado of empleados) {
    const [datos, bruto, neto] = empleado;
    const nombreCompleto = datos[0] + " " + datos[1];
    salarioTotal += bruto + neto;
    rHoras.innerText += contador + " " + nombreCompleto + " Bruto: " + bruto + " €, Neto: " + neto + "€\n";
    contador++;
  }
  rHoras.innerText += "\nSalario Total: " + salarioTotal;
};

// Calcula el salario bruto según el turno seleccionado
function calHoras() {
  let horas;
  if (bMañana.checked || bTarde.checked || bNoche.checked) {
    if (bMañana.checked) {
      horas = nHoras.value * 25;
    } else if (bTarde.checked) {
      horas = nHoras.value * 30;
    } else {
      horas = nHoras.value * 35;
    }
  } else {
    rHoras.innerText = "Tienes que seleccionar el turno";
  }
  return horas;
}

// Calcula el salario neto aplicando retenciones según el bruto
function calNeto() {
  let salario = calHoras();

  if (salario < 600) {
    salario *= 0.92;
  } else if (salario < 1000) {
    salario *= 0.9;
  } else if (salario > 10000) {
    salario *= 0.88;
  }
  return salario;
}

// Devuelve array con nombre y apellido del empleado
function datosEmpleado() {
  let myArrayD = [nNombre.value, nApellido.value];
  return myArrayD;
}

/*********** Ejercicio 20 */
// Se genera un número aleatorio entre 1 y 100 al cargar.
// Al hacer clic en bComprobar, se compara con el valor introducido.
// Se muestra pista si el número es mayor o menor, o mensaje de acierto.
// Se cuenta el número de intentos.
const aleatorio = Math.floor(Math.random() * 100) + 1;
let cont = 1;

bComprobar.onclick = () => {
  if (aleatorio == nAleatorio.value) {
    rPistas.innerText = "Felicidades has acertado el número en " + cont + "intentos";
    cont++;
  }
  else if (aleatorio > nAleatorio.value) {
    rPistas.innerText = "El número es mayor que " + nAleatorio.value;
    cont++;
  } else {
    rPistas.innerText = "El número es menor que " + nAleatorio.value;
    cont++;
  }
};