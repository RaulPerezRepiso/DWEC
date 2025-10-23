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

document.getElementById("bIf").onclick = () => {
  array2 = [];
  if (cadS1.value == "") {
    console.log(alert("Introduce un valor para usar el Botón Insertar al Final"))
  } else {
    array2 = [cadP.value];
    array2.push(cadS1.value);
  }
  rCadenaArray.innerText = array2;

}

document.getElementById("bIp").onclick = () => {
  if (cadS1.value == "") {
    console.log(alert("Introduce un valor para usar el Botón Insertar al principio"))
  } else {
    array2 = [cadP.value];
    array2.unshift(cadS1.value);
  }
  rCadenaArray.innerText = array2;
}

document.getElementById("bAelem").onclick = () => {

  if (array2 === "") {
    console.log(alert("Introduce cadenas"))
  } else {
    array2.push(cadP.value);
    cadP.value = "";
  }
  rCadenaArray.innerText = array2;

}

document.getElementById("bBp").onclick = () => {
  if (array2.length === 0) {
    console.log(alert("Introduce cadenas para borrar elemento al array"))
  } else {
    array2.shift();
  }
  rCadenaArray.innerText = array2;
}

document.getElementById("bBu").onclick = () => {
  if (array2.length === 0) {
    console.log(alert("Introduce cadenas para añadir elemento al array"))
  } else {
    array2.pop();
  }
  rCadenaArray.innerText = array2;
}

document.getElementById("bId").onclick = () => {
  

}

document.getElementById("bBd").onclick = () => {

}

document.getElementById("bOasc").onclick = () => {

}

document.getElementById("bOdes").onclick = () => {

}

/*Ejercicio 9 */

/*Ejercicio 10 */

/*Ejercicio 11 */

/*Ejercicio 12 */

/*Ejercicio 13 */

/*Ejercicio 14 */

/*Ejercicio 15 */

/*Ejercicio 16 */

/*Ejercicio 17 */

/*Ejercicio 18 */
