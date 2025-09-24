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

let myObj = {
    name: "Pepe",
    edad: 34
}

console.dir(myObj);

//Declaracion de funciones y sus valores independientemente de donde se encuentre la función
console.log(typeof hello);
/*********************** */
function hello () {
    console.log("hello");
}