// No es necesario crear la funcion main para JS 
// function main(){

/* var name2 = "Jhon";

console.log("Nombre es: " + name2+ " Tipo: " + typeof name2);

var name2 = 7;

console.log("Nombre es: " + name2+ " Tipo: " + typeof name2);

var name2 = true;

console.log("Nombre es: " + name2+ " Tipo: " + typeof name2);

var name2 = [5,6,7,8];

console.log("Nombre es: " + name2+ " Tipo: " + typeof name2);

var name2 = -1/0;

console.log("Nombre es: " + name2+ " Tipo: " + typeof name2); */

// document.getElementById("h11").style.backgroundColor = "red";
// document.getElementById("h11").style.color = "white";

// }

// main();

// Implementación de funciones
/* let a = "Pepe";

console.log("Valor de a:" + a + ". Tipo: " +typeof a);

a = 5;

console.log("Valor de a:" + a + ". Tipo: " +typeof a); */

/************************* FUNCTIONS *******************/
/* if(typeof a == "number"){
    a = a +10;
}else if(typeof a == "string"){
    a = "Buenos dias " +a;
}
    console.log(a); */

// Usar siempre que tengamos más de 2 casos
/* switch(typeof a){
    case "number": 
        a = a +10;
        break;
    case "string":
        a = "Buenos dias " +a;
        break;
    case "boolean":
        a = !a;
        break;
}   */

/* Mala práxis hacer solo un RETURN por función siempre y cuando devolvamos algo 
function calcula(valor){
    let result = 0;

    if (...){
        result = 6
        return result;
    }

     if (...){
        result = 16
        return result;
    }


     if (...){
        result = 26
        return result;
    }

     if (...){
        result = 611
        return result;
    }
} */

// Cuando declaramos variables locales (let) dentro de un bloque de codigo solo funcionan dentro de ese bloque de código
// en cambio si usamos una variable global (var) funcionara en toda la clase y si usamos superglobal ("") funcionara en todas las clases
/* var a = 2345;
let b = "Hello";

if (true) {
    let c = true;
    var d = "d";
    console.log("Valor de c dentro :" + c)
    if (c) {
        console.log("Valor de d: " + d)
    }
}

console.log("Valor de 'd' fuera: " + d) */

/* let myObj = {
    name: "Pepe",
    edad: 34
}

console.dir(myObj); */

//Declaracion de funciones y sus valores independientemente de donde se encuentre la función
/* function hello () {
    console.log("hello");
}

console.log(typeof hello);
 */

// let nombre = "Pepe";
/* let nota = "8.45";

// Simplemente cambia el tipo de variable
// edad = edad.toString();

// let login = nombre + edad;

console.log("Tipo de Nota: " + typeof nota);

nota = parseFloat(nota);

console.log("Tipo de Nota: " + typeof nota +". Valor de la nota: " +nota) */

// let myArray = [1,2,3,4,5,6,7,8,9];

/* let myArray = [1, true, 34.56, "Pepe", {name:"Mary", age:45}, undefined]

console.log(myArray); */

// let myObj = {
//     name: "Pepe",
//     edad: 34,
//     email: "pepe@mail.com"
// }

// console.log("Email: " +myObj.email);

//Para usar comilla dobles debemos escapar con \ delante de la "
// document.getElementById("h11").innerHTML = "Él dijo: \"No voy a ir!!\"";

// document.getElementById("pre1").innerHTML = "Hola , \n¿Como estás?";
// document.getElementById("ta1").innerHTML = "Hola , \n¿Como estás?";

let h11 = document.getElementById("h11");
let b1 = document.getElementById("b1");
let it1 = document.getElementById("it1");

// let a = 5;
// let b = 10;

// if(a === b){
//     h11.innerHTML = "Son iguales";
// }
//     h11.innerHTML = "No son iguales"

//En un sitio preincremento suma y luego ve la variable y asigna y postincremento ve la variable y luego suma y asigna y b queda en 2++
// let c = ++b;
// h11.innerHTML += "Valor de c: "+c;

// let d = b++;
// h11.innerHTML += ".<br> Valor de d: "+d;

// h11.innerHTML += ".<br> Valor de b: "+b +".";

/* let a = 5;
a *= 5;
let b = 0; */

/* h11.innerHTML = "Valor de a "+ a;
 */
// ?? Para dar un valor a una variable indefinida si esta definida no asignara mantendra su valor
// a ??= b;
/* 
if((a == null) || (a == undefined))
    a = b;

h11.innerHTML += "<br>Nuevo valor de a " +a;
 */

// ?? Para dar un valor a una variable indefinida si esta definida no asignara mantendra su valor
// a ??= b;

// Los siguiente valores se resuelven siempre a falso: undefined, 0, null, ""
// && Se tienen que cumplir ambas || una de ellas, !valor opuesto al valor
/* if ((a) && (b))
    h11.innerHTML += "Verdadero";
else
    h11.innerHTML += "Falso";*/

// Cambia al bit anterior o posterior dependiendo de >> << para cambiar el valor
/* let a = 7;
let b = a << 1;

h11.innerHTML = b; */

/* let a = {
    nombre: "Pepe",
    edad: 34,
    email: "pepe@mail.es"
} */
//Operador . para llamar a algo dentro de un objeto independiemente donde borremos o añadamos se va a guardar en el objeto
/* delete a.email;
h11.innerHTML = a.nombre;

console.dir(a);

a.notas = [5,7,9];

// Muestra resultado falso si tenemos ese h1 vacío
h11.innerHTML = "toString" in String; */

/* if(h11.innerHTML == "")
    h11.innerHTML = "Vacio";
else
    h11.innerHTML += "-------------"; */

// (h11.innerHTML == "") ?h11.innerHTML = "Vacío":h11.innerHTML += "------------";

/* h11.innerHTML= this;
b1.onclick = pressButtonB1;

function pressButtonB1(){
    h11.innerHTML = this;
    h11.innerHTML += " - " + globalThis;
} */

// Solo coge el valor de la primera variable
// const i = 0;

// Bucles For
/* let myArray = [1,2,3,4,5,6,7,8,9,10];

for (let i=0; i<myArray.length; i++){
    h11.innerHTML += myArray[i] + ", ";
} */

// Bucles For in (Dentro de bucles como el for in las variables no serán super globales)
/* let myArray = [1,2,3,4,5,6,7,8,9,10];

for(i in myArray){
    h11.innerHTML += myArray[i] + ", ";
}*/

/* let myObj = {
    nombre: "Pepe",
    edad: 34,
    email: "pepe@gmail.es"
}

for(i in myObj){
    h11.innerHTML += myObj[i] + ", ";
} */

// Uso del switch con funciones
/* b1.onclick = sumar10;

function sumar10() {
    h11.innerHTML = "Resultado: ";

    switch (it1.value) {
        case "NaN":
            alert("Deber poner un valor númerico");
            break;
        case "10":
            h11.innerHTML = "Valor es 10";
            break;
        case "20":
            h11.innerHTML = "Valor es 20";
            break;
        case "30":
            h11.innerHTML = "Valor es 30";
            break;
        default:
            h11.innerHTML += parseFloat(it1.value) + 10;
    }
} */
