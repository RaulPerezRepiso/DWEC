/*Ejercicio 1 */
// Declaracion de variables
let persona = document.getElementById("persona");
let profesor = document.getElementById("profesor");
let estudiante = document.getElementById("estudiante")

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

    return "Nombre: " + Persona.nombre + ". Edad: " + Persona.edad + " y género " + Persona.genero;
}

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
    Estudiante.grupo = "A"

    return ObjDetalles() + " Curso " + Estudiante.curso + " y grupo " + Estudiante.grupo;
}

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
    Profesor.grnivelupo = "2"

    return ObjDetalles() + " Imparte " + Profesor.asignatura + " en el Curso " + Profesor.nivel;
}

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

    nDias.innerText = "Llevas vivo " + parseInt(result / 1000 / 60 / 60 / 24 / 365) + " años";
}

/*Ejercicio 5 */
let nDias1 = document.getElementById("nDias1");
let bCalcula1 = document.getElementById("bCalcula1");
let fecha1 = document.getElementById("fecha1");
bCalcula.onclick = () => {
    let date = new Date();
    let dateCumple = new Date(fecha.value);

    let result = date - dateCumple;

    nDias.innerText = "Llevas vivo " + parseInt(result / 1000 / 60 / 60 / 24 / 365) + " años";
}

/*Ejercicio 6 */

/*Ejercicio 7 */

/*Ejercicio 8 */

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