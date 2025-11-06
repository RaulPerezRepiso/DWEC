//---------------------------------
/*Ejercicio 1 */
//---------------------------------
// Declaracion de variables
let persona = document.getElementById("persona");
let profesor = document.getElementById("profesor");
let estudiante = document.getElementById("estudiante");

// Clase base Persona con propiedades comunes
class Persona {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }
}

// Función que muestra los detalles de una instancia de Persona en el HTML
function objDetalles(personaObj) {
  persona.innerText =
    "Nombre: " +
    personaObj.nombre +
    " Edad: " +
    personaObj.edad +
    " Género: " +
    personaObj.genero;
}

// Se crea una instancia de Persona y se muestran sus datos
const persona1 = new Persona("Raúl", 22, "Hombre");
objDetalles(persona1);

// ----------------------------------------

// Clase Estudiante que hereda de Persona y añade curso y grupo
class Estudiante extends Persona {
  constructor(nombre, edad, genero, curso, grupo) {
    super(nombre, edad, genero); // Hereda nombre, edad y género
    this.curso = curso;
    this.grupo = grupo;
  }
}

// Función que muestra los datos del estudiante en el HTML
function registrar(estudianteObj) {
  estudiante.innerText =
    "Estudiante " +
    estudianteObj.nombre +
    " registrado correctamente en el curso " +
    estudianteObj.curso +
    " " +
    estudianteObj.grupo;
}

// Se crea una instancia de Estudiante y se registra
const estudiante1 = new Estudiante("Raúl", 23, "Hombre", 2, "DAW");
registrar(estudiante1);

// ----------------------------------------

// Clase Profesor que hereda de Persona y añade asignatura y nivel
class Profesor extends Persona {
  constructor(nombre, edad, genero, asignatura, nivel) {
    super(nombre, edad, genero); // Hereda nombre, edad y género
    this.asignatura = asignatura;
    this.nivel = nivel;
  }
}

// Función que muestra los datos del profesor en el HTML
function asignar(profesorObj) {
  profesor.innerText =
    "El profesor " +
    profesorObj.nombre +
    " con la asignatura " +
    profesorObj.asignatura +
    " y nivel " +
    profesorObj.nivel +
    " ha sido asignado";
}

// Se crea una instancia de Profesor y se asigna
const profesor1 = new Profesor("Pepe", 19, "Hombre", "DAWC", "Alto");
asignar(profesor1);

//---------------------------------
/*Ejercicio 2 */
//---------------------------------
document.getElementById("bCalcular").onclick = () => {
  // Captura de coordenadas desde los inputs, convirtiendo a número decimal. Si están vacíos, se asigna 0.
  let x1 = parseFloat(document.getElementById("x1").value) || 0;
  let y1 = parseFloat(document.getElementById("y1").value) || 0;
  let x2 = parseFloat(document.getElementById("x2").value) || 0;
  let y2 = parseFloat(document.getElementById("y2").value) || 0;

  // Cálculo de diferencia en X y Y entre los dos puntos
  let dx = x2 - x1;
  let dy = y2 - y1;

  // Cálculo de la longitud de la pendiente (distancia entre puntos)
  let pendiente = Math.sqrt(dx ** 2 + dy ** 2);

  // Cálculo del ángulo en radianes usando arcotangente
  let anguloRad = Math.atan(dy / dx);

  // Conversión del ángulo de radianes a grados
  let anguloGrados = anguloRad * (180 / Math.PI);

  // Cálculo del porcentaje de inclinación respecto a la pendiente
  let pendientePorcentaje = (dy / pendiente) * 100;

  // Mostrar resultados en el HTML con dos decimales
  longitud.innerHTML =
    "Longitud de la pendiente: " + pendiente.toFixed(2) + " m";
  angulo.innerHTML = "Ángulo de inclinación: " + anguloGrados.toFixed(2) + "°";
  porcentaje.innerHTML = "Pendiente: " + pendientePorcentaje.toFixed(2) + "%";

  // Validación: si todos los valores son iguales, se considera entrada inválida
  if (x1 == x2 && x1 == y1 && x1 == y2) {
    longitud.innerHTML = "Introduce valores válidos";
    angulo.innerHTML = "Introduce valores válidos";
    porcentaje.innerHTML = "Introduce valores válidos";
  }
};

//---------------------------------
/*Ejercicio 3 */
//---------------------------------
// Captura de elementos HTML donde se mostrarán los valores de PI
let pi1 = document.getElementById("pi1");
let pi2 = document.getElementById("pi2");

// Mostrar PI con 4 decimales
pi1.innerText = Math.PI.toFixed(4);

// Mostrar PI con 5 cifras significativas
pi2.innerText = Math.PI.toPrecision(5);

//---------------------------------
/*Ejercicio 4 */
//---------------------------------
// Captura de elementos HTML para mostrar resultado y obtener fecha
let nDias = document.getElementById("nDias");
let bCalcula = document.getElementById("bCalcula");
let fecha = document.getElementById("fecha");

bCalcula.onclick = () => {
  // Fecha actual
  let date = new Date();

  // Fecha introducida por el usuario
  let dateCumple = new Date(fecha.value);

  // Diferencia en milisegundos entre ambas fechas
  let result = date - dateCumple;

  // Conversión de milisegundos a años aproximados (sin considerar años bisiestos)
  nDias.innerText =
    "Llevas vivo " + parseInt(result / 1000 / 60 / 60 / 24 / 365) + " años";
};

bCalcula.onclick = () => {
  let date = new Date();
  let dateCumple = new Date(fecha.value);

  let result = date - dateCumple;

  nDias.innerText =
    "Llevas vivo " + parseInt(result / 1000 / 60 / 60 / 24 / 365) + " años";
};

//---------------------------------
/*Ejercicio 5 */
//---------------------------------
// Captura de elementos HTML para mostrar resultado y obtener fecha
let nDias1 = document.getElementById("nDias1");
let bCalcula1 = document.getElementById("bCalcula1");
let fecha1 = document.getElementById("fecha1");

bCalcula1.onclick = () => {
  // Fecha actual
  let date = new Date();

  // Fecha introducida por el usuario
  let dateCumple = new Date(fecha1.value);

  // Diferencia en milisegundos entre ambas fechas
  let result = date - dateCumple;

  // Cálculo de años completos considerando años bisiestos (365.25 días)
  let años = Math.floor(result / (1000 * 60 * 60 * 24 * 365.25));

  // Resto de milisegundos tras quitar los años
  let restoMs = result - años * 365.25 * 24 * 60 * 60 * 1000;

  // Cálculo de días completos
  let dias = Math.floor(restoMs / (1000 * 60 * 60 * 24));
  restoMs -= dias * 24 * 60 * 60 * 1000;

  // Cálculo de horas completas
  let horas = Math.floor(restoMs / (1000 * 60 * 60));
  restoMs -= horas * 60 * 60 * 1000;

  // Cálculo de minutos completos
  let min = Math.floor(restoMs / (1000 * 60));

  // Mostrar resultado detallado en el HTML
  nDias1.innerText =
    "Llevas vivo " +
    años +
    " años, " +
    dias +
    " dias,  " +
    horas +
    " horas y  " +
    min +
    " minutos";
};

//---------------------------------
/*Ejercicio 6 */
//---------------------------------
// Declaración del array fuera del evento para que no se reinicie cada vez que se pulsa el botón
let eventos = [];

document.getElementById("bAgregar").onclick = () => {
  // Captura de valores desde los inputs
  let titulo = document.getElementById("titulo").value;
  let fechaHora = document.getElementById("fechaHora").value;
  let rEventos = document.getElementById("rEventos");

  // Se añade un nuevo objeto al array con título y fecha convertida a objeto Date
  eventos.push({ titulo: titulo, fecha: new Date(fechaHora) });

  // Se ordenan los eventos por fecha ascendente
  eventos.sort((a, b) => a.fecha - b.fecha);

  // Se limpia el contenido anterior
  rEventos.innerText = "";

  // Se recorre el array y se muestra cada evento con su fecha formateada
  for (let i = 0; i < eventos.length; i++) {
    rEventos.innerText +=
      eventos[i].titulo + " " + eventos[i].fecha.toLocaleString() + "\n";
  }
};

//---------------------------------
/*Ejercicio 7 */
//---------------------------------
// Declaración de array vacío (no se usa en este ejercicio pero está presente)
let array = [];

document.getElementById("bCadena").onclick = () => {
  // Captura de la cadena introducida por el usuario
  let cad = document.getElementById("cad").value;
  let rCadena = document.getElementById("rCadena");
  rCadena.innerText = "";

  // Recorre cada carácter de la cadena y muestra el carácter junto con su índice
  for (let i = 0; i < cad.length; i++) {
    rCadena.innerText += "Carácter: " + cad[i] + " en posición:  " + i + "\n";
  }
};

//---------------------------------
/*Ejercicio 8 */
//---------------------------------
// Captura de elementos HTML
let cadP = document.getElementById("cadP");
let cadS1 = document.getElementById("cadS1");
let cadS2 = document.getElementById("cadS2");
let rCadenaArray = document.getElementById("rCadenaArray");

// Array que se manipulará con los botones
let array2 = [];

/**
 * Inserta un valor al final del array
 */
document.getElementById("bIf").onclick = () => {
  if (cadS1.value == "") {
    alert("Introduce un valor para usar el Botón Insertar al Final");
  } else {
    array2.push(cadS1.value);
  }
  rCadenaArray.innerText = array2;
};

/**
 * Inserta un valor al principio del array
 */
document.getElementById("bIp").onclick = () => {
  if (cadS1.value == "") {
    alert("Introduce un valor para usar el Botón Insertar al principio");
  } else {
    array2.unshift(cadS1.value);
  }
  rCadenaArray.innerText = array2;
};

/**
 * Añade el valor del input cadP al final del array
 */
document.getElementById("bAelem").onclick = () => {
  if (array2 === "") {
    alert("Introduce cadenas");
  } else {
    array2.push(cadP.value);
    cadP.value = ""; // Limpia el input después de añadir
  }
  rCadenaArray.innerText = array2;
};

/**
 * Elimina el primer elemento del array
 */
document.getElementById("bBp").onclick = () => {
  if (array2.length === 0) {
    alert("Introduce cadenas para borrar elemento al array");
  } else {
    array2.shift();
  }
  rCadenaArray.innerText = array2;
};

/**
 * Elimina el último elemento del array
 */
document.getElementById("bBu").onclick = () => {
  if (array2.length === 0) {
    alert("Introduce cadenas para añadir elemento al array");
  } else {
    array2.pop();
  }
  rCadenaArray.innerText = array2;
};

/**
 * Inserta un valor en una posición específica del array
 */
document.getElementById("bId").onclick = () => {
  let valor = cadS1.value;
  let posicion = parseInt(cadS2.value);

  if (valor === "" || isNaN(posicion)) {
    alert("Introduce un valor y una posición válida para insertar");
    return;
  }

  array2.splice(posicion, 0, valor); // Inserta sin eliminar
  rCadenaArray.innerText = array2;
};

/**
 * Elimina el elemento en la posición indicada
 */
document.getElementById("bBd").onclick = () => {
  let posicion = parseInt(cadS2.value);

  if (isNaN(posicion) || posicion < 0 || posicion >= array2.length) {
    alert("Introduce una posición válida para borrar");
    return;
  }

  array2.splice(posicion, 1); // Elimina un elemento en la posición dada
  rCadenaArray.innerText = array2;
};

/**
 * Ordena el array alfabéticamente de forma ascendente
 */
document.getElementById("bOasc").onclick = () => {
  array2.sort();
  rCadenaArray.innerText = array2;
};

/**
 * Ordena el array alfabéticamente de forma descendente
 */
document.getElementById("bOdes").onclick = () => {
  array2.sort().reverse();
  rCadenaArray.innerText = array2;
};

//---------------------------------
/*Ejercicio 9 */
//---------------------------------
// Captura de elementos HTML donde se mostrará el tipo de pantalla y la resolución
let rRes = document.getElementById("rRes");
let rTipoRes = document.getElementById("rTipoRes");

// Evento que se ejecuta cada vez que se redimensiona la ventana del navegador
window.addEventListener("resize", () => {
  rTipoRes.innerText = "La pantalla es de: ";

  // Captura del ancho y alto de la ventana visible
  ancho = window.innerWidth;
  alto = window.innerHeight;

  // Clasificación del tipo de dispositivo según el ancho
  if (ancho < 768) rTipoRes.innerText += " Móvil";
  else if (ancho < 1024) rTipoRes.innerText += " Tablet";
  else rTipoRes.innerText += " Desktop";

  // Mostrar la resolución actual de la ventana
  rRes.innerText =
    "La resolución de la pantalla es ancho " + ancho + " y alto " + alto;
});

//---------------------------------
/*Ejercicio 10 */
//---------------------------------
// Variable global para guardar la referencia a la nueva ventana
let aux = undefined;

// Calcula el tamaño de la nueva ventana restando márgenes
let x = (window.innerWidth - 40);
let y = (window.innerHeight - 20);

document.getElementById("bVen").onclick = function () {
  // Abre una nueva ventana con la URL indicada y dimensiones calculadas
  aux = window.open(
    "/Pruebas/teoria2/usuarios.html", // Ruta del archivo a abrir
    "NuevaVentana", // Nombre de la ventana
    "width=" + x + ",height=" + y
  );
};

//---------------------------------
/*Ejercicio 11 */
//---------------------------------
document.getElementById("bRed").onclick = () => {
  // Cambia el tamaño de la ventana secundaria a 600x500 píxeles
  aux.resizeTo(600, 500);

  // Trae la ventana secundaria al frente
  aux.focus();
};

//---------------------------------
/*Ejercicio 12 */
//---------------------------------
// Botón para retroceder una página en el historial
document.getElementById("bR").onclick = () => {
  history.back();
};

// Botón para avanzar una página en el historial
document.getElementById("bA").onclick = () => {
  history.forward();
};

//---------------------------------
/*Ejercicio 13 */
//---------------------------------
document.getElementById("bCam").onclick = () => {
  // Verifica que la ventana secundaria esté abierta
  if (!aux.closed) {
    // Captura el valor del input en la ventana principal
    const principal = document.getElementById("t1").value;

    // Captura el valor del input en la ventana secundaria
    const secundaria = aux.document.getElementById("loginText").value;

    // Intercambia los valores entre ambas ventanas
    document.getElementById("t1").value = secundaria;
    aux.document.getElementById("loginText").value = principal;

    // Trae la ventana secundaria al frente
    aux.focus();
  } else {
    alert("Primero abre la ventana secundaria.");
  }
};

//---------------------------------
/*Ejercicio 14 */
//---------------------------------
// Declaración de expresión regular para buscar la letra "l" (mayúscula o minúscula)
let er1 = new RegExp("l", "ig");

document.getElementById("bExpr").onclick = () => {
  // Captura del elemento donde se mostrará el resultado
  let res = document.getElementById("rExp");

  // Captura del texto introducido por el usuario
  let texto = document.getElementById("expresion").value;

  // Busca todas las coincidencias de la expresión regular en el texto
  let coincidencias = texto.match(er1);

  // Verifica si al menos una coincidencia existe
  let existe = er1.test(texto);

  // Reemplaza cada coincidencia con una versión resaltada en rojo y subrayada
  let resaltado = texto.replace(
    er1,
    (match) => `<strong style='color:red'><u>${match}</u></strong>`
  );

  // Muestra los resultados: existencia, número de coincidencias y texto resaltado
  res.innerHTML = `
        ${existe ? "Existe la letra L" : "No existe la letra L"}<br>
        Número de coincidencias: ${coincidencias ? coincidencias.length : 0}<br>
        Texto resaltado: ${resaltado}
    `;
};

//---------------------------------
/*Ejercicio 15 */
//---------------------------------
document.getElementById("bFecha").onclick = () => {
  // Expresión regular para validar fechas en formato dd/mm/yyyy
  let regFecha = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}", "ig");

  // Elemento donde se mostrará el resultado
  let texto = document.getElementById("rFecha");

  // Valor introducido por el usuario
  let input = document.getElementById("fechaC").value;

  // Verifica si el texto cumple con el formato de fecha
  texto.innerText = regFecha.test(input)
    ? "Fecha introducida: " + input
    : "Introduce fecha";
};

//---------------------------------
/*Ejercicio 16 */
//---------------------------------
document.getElementById("bCorreo").onclick = () => {
  // Elemento donde se mostrará el resultado
  let res = document.getElementById("rCorreo");

  // Valor introducido por el usuario
  let input = document.getElementById("correo").value;

  // Expresión regular para validar correos electrónicos simples
  let regCorreo = new RegExp(
    "[0-9A-Za-z-.]{2,}@[A-Za-z0-9]{2,}.[a-z0-9]{2,3}",
    "i"
  );

  // Verifica si el correo es válido según la expresión regular
  res.innerText = regCorreo.test(input) ? "Correo Correcto" : "Inserta correo";
};

//---------------------------------
/*Ejercicio 17 */
//---------------------------------
document.getElementById("bNombre").onclick = () => {
  // Elemento donde se mostrará el resultado
  const res = document.getElementById("rNombre");

  // Captura del valor introducido, eliminando espacios al inicio y al final
  const input = document.getElementById("nombre").value.trim();

  // Verifica que el input tenga al menos dos palabras separadas por espacio
  // Permite letras con acentos y mayúsculas/minúsculas
  const regNombre = /^([A-Za-zÁÉÍÓÚáéíóúÑñ]+)\s+([A-Za-zÁÉÍÓÚáéíóúÑñ]+)$/;
  
  //Sirve pero no abarca las tildes
  // const regNombre = /^(\w+)\s+(\w+)$/;

  if (regNombre.test(input)) {
    // Extrae las dos palabras y las invierte en formato "Apellido, Nombre"
    const partes = input.match(regNombre);
    const formatted = `${partes[2]}, ${partes[1]}`;
    res.textContent = formatted;
  } else {
    // Mensaje de error si el formato no es válido
    res.textContent = "Por favor, introduce nombre y apellido válidos.";
  }
};

//---------------------------------
/*Ejercicio 18 */
//---------------------------------
document.getElementById("bHTML").onclick = () => {
  // Valor introducido por el usuario
  let input = document.getElementById("HTML").value;

  // Elemento donde se mostrará el resultado
  let res = document.getElementById("rHTML");

  // Expresión regular para detectar cualquier bloque <script>...</script>
  let regScript = new RegExp("<script[\\s\\S]*?<\\/script>", "ig");

  // Elimina cualquier bloque <script> del texto
  res.innerText = input.replace(regScript, "");
};
