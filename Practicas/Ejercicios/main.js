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

// Variables Ejercicio 6

// Variables Ejercicio 7

// Variables Ejercicio 8



/*********** Ejercicio 1 */
b1.onclick = () => {
    let myArrayC2 = [nota1.value, nota2.value, nota3.value];
    let myArrayC1 = [nombre.value, apellidos.value, curso.value, ...myArrayC2];

    for (elem of myArrayC1) {
        alumnos.innerHTML += elem + "  ";
    }
    alumnos.innerHTML += "<br>";
}

/*********** Ejercicio 2 */


/*********** Ejercicio 3 */
bEur.onclick = () => {
    dollares.innerText = euros.value * 1.18 + "$";
    yenes.innerText = euros.value * 173 + "¥";
}


/*********** Ejercicio 4 */
b2.onclick = () => {
    area.innerText = 2 * Math.pow(radio.value, 2) * Math.PI;
    perimetro.innerText = 2 * radio.value * Math.PI;
}

/*********** Ejercicio 5 */

/*********** Ejercicio 6 */

/*********** Ejercicio 7 */

/*********** Ejercicio 8 */

/*********** Ejercicio 9 */

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
