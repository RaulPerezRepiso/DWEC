/*Ejercicio 1 */
// Declaracion de variables
let persona = document.getElementById("persona");
let profesor = document.getElementById("profesor");
let estudiante = document.getElementById("estudiante");

class Persona {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }
}

ObjDetalles = () => {
  Persona.nombre = "Pepe";
  Persona.edad = 34;
  Persona.genero = "Hombre";

  return (
    "Nombre: " +
    Persona.nombre +
    ". Edad: " +
    Persona.edad +
    " y género " +
    Persona.genero
  );
};

persona.innerHTML = ObjDetalles();

class Estudiante extends Persona {
  constructor(nombre, edad, genero, curso, grupo) {
    super();
    this.curso = curso;
    this.grupo = grupo;
  }
}

registrar = () => {
  Estudiante.curso = "2";
  Estudiante.grupo = "A";

  return (
    ObjDetalles() +
    " Curso " +
    Estudiante.curso +
    " y grupo " +
    Estudiante.grupo
  );
};

estudiante.innerHTML = registrar();

class Profesor extends Persona {
  constructor(nombre, edad, genero, asignatura, nivel) {
    super();
    this.asignatura = asignatura;
    this.nivel = nivel;
  }
}

asignar = () => {
  Profesor.asignatura = "Matemáticas";
  Profesor.grnivelupo = "2";

  return (
    ObjDetalles() +
    " Imparte " +
    Profesor.asignatura +
    " en el Curso " +
    Profesor.nivel
  );
};

profesor.innerHTML = asignar();

/*Ejercicio 2 */
document.getElementById("bCalcular").onclick = () => {
  // Captura de coordenadas
  let x1 = parseFloat(document.getElementById("x1").value);
  let y1 = parseFloat(document.getElementById("y1").value);
  let x2 = parseFloat(document.getElementById("x2").value);
  let y2 = parseFloat(document.getElementById("y2").value);

  // Cálculos
  let dx = x2 - x1;
  let dy = y2 - y1;

  let pendiente = Math.sqrt(dx ** 2 + dy ** 2);
  let anguloRad = Math.atan(dy / dx);
  let anguloGrados = anguloRad * (180 / Math.PI);
  let pendientePorcentaje = (dy / pendiente) * 100;

  // Mostrar resultados
  longitud.innerHTML =
    "Longitud de la pendiente: " + pendiente.toFixed(2) + " m";
  angulo.innerHTML = "Ángulo de inclinación: " + anguloGrados.toFixed(2) + "°";
  porcentaje.innerHTML = "Pendiente: " + pendientePorcentaje.toFixed(2) + "%";
};

/*Ejercicio 3 */
let pi1 = document.getElementById("pi1");
let pi2 = document.getElementById("pi2");

pi1.innerText = Math.PI.toFixed(4);
pi2.innerText = Math.PI.toPrecision(5);

/*Ejercicio 4 */
let nDias = document.getElementById("nDias");
let bCalcula = document.getElementById("bCalcula");
let fecha = document.getElementById("fecha");

bCalcula.onclick = () => {
  let date = new Date();
  let dateCumple = new Date(fecha.value);

  let result = date - dateCumple;

  nDias.innerText =
    "Llevas vivo " + parseInt(result / 1000 / 60 / 60 / 24 / 365) + " años";
};

/*Ejercicio 5 */
let nDias1 = document.getElementById("nDias1");
let bCalcula1 = document.getElementById("bCalcula1");
let fecha1 = document.getElementById("fecha1");
bCalcula1.onclick = () => {
  let date = new Date();
  let dateCumple = new Date(fecha1.value);

  let result = date - dateCumple;

  let años = Math.floor(result / (1000 * 60 * 60 * 24 * 365.25));
  let restoMs = result - años * 365.25 * 24 * 60 * 60 * 1000;

  let dias = Math.floor(restoMs / (1000 * 60 * 60 * 24));
  restoMs -= dias * 24 * 60 * 60 * 1000;

  let horas = Math.floor(restoMs / (1000 * 60 * 60));
  restoMs -= horas * 60 * 60 * 1000;

  let min = Math.floor(restoMs / (1000 * 60));

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

/*Ejercicio 6 */
//Declarar fuera sinio cada vez que le demos al botón se inicializa vacía
let eventos = [];

document.getElementById("bAgregar").onclick = () => {
  let titulo = document.getElementById("titulo").value;
  let fechaHora = document.getElementById("fechaHora").value;
  let rEventos = document.getElementById("rEventos");

  //Agregarlo como objeto
  eventos.push({ titulo: titulo, fecha: new Date(fechaHora) });

  //Ordenar por fecha
  eventos.sort((a, b) => a.fecha - b.fecha);

  rEventos.innerText = "";

  for (let i = 0; i < eventos.length; i++) {
    rEventos.innerText +=
      eventos[i].titulo + " " + eventos[i].fecha.toLocaleString() + "\n";
  }
};

/*Ejercicio 7 */
let array = [];

document.getElementById("bCadena").onclick = () => {
  let cad = document.getElementById("cad").value;
  let rCadena = document.getElementById("rCadena");

  for (let i = 0; i < cad.length; i++) {
    rCadena.innerText += cad[i] + "" + i + "\n";
  }
};

/*Ejercicio 8 */
let cadP = document.getElementById("cadP");
let cadS1 = document.getElementById("cadS1");
let cadS2 = document.getElementById("cadS2");
let rCadenaArray = document.getElementById("rCadenaArray");

let array2 = [];

/**
 * Inserta un valor dado al final de la cadena
 */
document.getElementById("bIf").onclick = () => {
  if (cadS1.value == "") {
    console.log(
      alert("Introduce un valor para usar el Botón Insertar al Final")
    );
  } else {
    array2.push(cadS1.value);
  }
  rCadenaArray.innerText = array2;
};

/**
 * Inserta un valor dado al principio de la cadena
 */
document.getElementById("bIp").onclick = () => {
  if (cadS1.value == "") {
    console.log(
      alert("Introduce un valor para usar el Botón Insertar al principio")
    );
  } else {
    array2.unshift(cadS1.value);
  }
  rCadenaArray.innerText = array2;
};

/**
 * Un boton para añadir elementos a la cadena
 */
document.getElementById("bAelem").onclick = () => {
  if (array2 === "") {
    console.log(alert("Introduce cadenas"));
  } else {
    array2.push(cadP.value);
    cadP.value = "";
  }
  rCadenaArray.innerText = array2;
};

/**
 * Borra la primera posoción del array y sigue mostrando el contenido del array
 */
document.getElementById("bBp").onclick = () => {
  if (array2.length === 0) {
    console.log(alert("Introduce cadenas para borrar elemento al array"));
  } else {
    array2.shift();
  }
  rCadenaArray.innerText = array2;
};

/**
 * Borra la última posoción del array y sigue mostrando el contenido del array
 */
document.getElementById("bBu").onclick = () => {
  if (array2.length === 0) {
    console.log(alert("Introduce cadenas para añadir elemento al array"));
  } else {
    array2.pop();
  }
  rCadenaArray.innerText = array2;
};

/**
 * Introduce un elemento dado den el text de valor de arriba en la posicon dada en el text de abajo
 */
document.getElementById("bId").onclick = () => {
  let valor = cadS1.value;
  let posicion = parseInt(cadS2.value);

  if (valor === "" || isNaN(posicion)) {
    alert("Introduce un valor y una posición válida para insertar");
    return;
  }

  array2.splice(posicion, 0, valor);
  rCadenaArray.innerText = array2;
};

/**
 * Borra lo que haya en la posición dada
 */
document.getElementById("bBd").onclick = () => {
  let posicion = parseInt(cadS2.value);

  if (isNaN(posicion) || posicion < 0 || posicion >= array2.length) {
    alert("Introduce una posición válida para borrar");
    return;
  }

  array2.splice(posicion, 1);
  rCadenaArray.innerText = array2;
};

/**
 * Ordenada de manera ascendente
 */
document.getElementById("bOasc").onclick = () => {
  array2.sort();
  rCadenaArray.innerText = array2;
};

/**
 * Ordenad de manera descendente
 */
document.getElementById("bOdes").onclick = () => {
  array2.sort().reverse();
  rCadenaArray.innerText = array2;
};

/*Ejercicio 9 */
let rRes = document.getElementById("rRes");
let rTipoRes = document.getElementById("rTipoRes");

window.addEventListener("resize", () => {
  rTipoRes.innerText = "La pantalla es de: ";
  ancho = window.innerWidth;
  alto = window.innerHeight;

  if (ancho < 768) rTipoRes.innerText += " Móvil";
  else if (ancho < 1024) rTipoRes.innerText += " Tablet";
  else rTipoRes.innerText += " Desktop";

  rRes.innerText =
    "La resolución de la pantalla es ancho " + ancho + " y alto " + alto;
});

/*Ejercicio 10 */
let aux = undefined;
document.getElementById("bVen").onclick = () => {
  let rRes2 = document.getElementById("rRes2");
  rRes2.innerText = "Hola";

  let an = window.innerWidth - 40;
  let al = window.innerHeight - 20;

  aux = window.open("./pruebas.html", "_blank", `width=${an},height=${al}`);
};

/*Ejercicio 11 */
document.getElementById("bRed").onclick = () => {
  aux.resizeTo(600, 500);
};

/*Ejercicio 12 */
document.getElementById("bR").onclick = () => {
  history.back();
};

document.getElementById("bA").onclick = () => {
  history.forward();
};

/*Ejercicio 13 */

/*Ejercicio 14 */

/*Ejercicio 15 */
document.getElementById("bFecha").onclick = () => {
  let regFecha = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}", "ig");
  let texto = document.getElementById("rFecha");
  let input = document.getElementById("fechaC").value;

  texto.innerText = regFecha.test(input)
    ? "Fecha introducida: " + input
    : "Introduce fecha";
};

/*Ejercicio 16 */
document.getElementById("bCorreo").onclick = () => {
  let res = document.getElementById("rCorreo");
  let input = document.getElementById("correo").value;

  let regCorreo = new RegExp(
    "[0-9A-Za-z-.]{2,}@[A-Za-z0-9]{2,}.[a-z0-9]{2,3}",
    "i"
  );

  res.innerText = regCorreo.test(input) ? "Correo Correcto" : "Inserta correo";
};

/*Ejercicio 17 */
document.getElementById("bNombre").onclick = () => {
  const res = document.getElementById("rNombre");
  const input = document.getElementById("nombre").value.trim();

  // Verifica que el input tenga al menos dos palabras
  if (/^[a-zA-Z]+\s+[a-zA-Z]+$/.test(input)) {
    const formatted = input.replace(/([a-zA-Z]+)\s+([a-zA-Z]+)/, "$2, $1");
    res.textContent = formatted;
  } else {
    res.textContent = "Por favor, introduce nombre y apellido válidos.";
  }
};

/*Ejercicio 18 */
document.getElementById("bHTML").onclick = () => {
  let input = document.getElementById("HTML").value;
  let res = document.getElementById("rHTML");
  let regScript = new RegExp("<script[\\s\\S]*?<\\/script>", "ig");

  res.innerText = input.replace(regScript, "");
};
