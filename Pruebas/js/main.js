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

// Variables declaradas
let h11 = document.getElementById("h11");
let it2 = document.getElementById("b1");
let it1 = document.getElementById("it1");
let b2 = document.getElementById("b2");
let a = "Pepe";
let b = "García";

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
// let myArray = [1,2,3,4,5,6,7,8,9,10];

/* for (let i=0; i<myArray.length; i++){
    h11.innerHTML += myArray[i] + ", ";
}
 */
// Bucles For in (Dentro de bucles como el for in las variables no serán super globales)
/* let myArray = [1,2,3,4,5,6,7,8,9,10];

for(i in myArray){
    h11.innerHTML += myArray[i] + ", ";
}*/

let myObj = {
    nombre: "Pepe",
    edad: 34,
    email: "pepe@gmail.es"
}

/* for(i in myObj){
    h11.innerHTML += myObj[i] + ", ";
} */

// elem es la variable determinada para el for of aunque podemos usar otras
// Lo que especificamos a la izquierda del of la propia variable a mostrar menos
// Dedicad casi siempre para Arrays
/* for(elem of myArray){
    h11.innerHTML += elem + ", ";
} */

// Para caso de array de objetos puede devolver valores predeterminados de una array 
/* for(elem of myObj){
    h11.innerHTML += elem.nombre + ", ";
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

// Sentencias Break & Continue
// let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Continue para mostrar los impares
/* for (let i=0; i<myArray.length; i++){
    if ((myArray[i]%2)==0)
        continue;
    else
    h11.innerHTML += myArray[i] + ", ";
} */

// Break para mostrar el primer numero par que encuentre y se salga
/* for (let i=0; i<myArray.length; i++){
    if ((myArray[i]%2)==0)
        break;
    h11.innerHTML += myArray[i] + ", ";
} */

/* let result = multiplica(3, 5);
h11.innerHTML = result; */

// b2.onclick = multiplicaButton;

// Función para coger dos valores de los text y hacer la multiplicación al clickar en el boton se mostrar en otro text 
var itop1 = document.getElementById("itop1");
var itop2 = document.getElementById("itop2");

/* function multiplicaButton() {
    let result = 0;
    if (itop1.value == "")
        result = multiplica(parseFloat(itop1.value));
    else if (itop2.value == "")
        result = multiplica(parseFloat(itop2.value));
    else
        result = multiplica(itop1.value * itop2.value);
    document.getElementById("it1").value = result;
}
 */
/* function multiplica(op1, op2) {
    let result = 0;
    
    if ((!op1) && (!op2)) {
        alert("Debe introducir al menos un valor!!!")
    }
    else {
        let op1_dentreo = op1 || 1;
        let op2_dentreo = op2 || 1;

        result = op1_dentreo * op2_dentreo;
    }

    return result;
} */

// Multiplica en cascada tantos x elementos de demos gracis a argumemts
// multiplica(2,3,5,6,7);

/* function multiplica() {
    let result = 1;
    
    for(op of arguments){
        result *= op;
    }

    h11.innerHTML = result;
}  */

/* function multiplica() {
    let result = 1;
    
    for (let i = 0; i < arguments.length; i++) {
        result *= arguments[i];
    }

    h11.innerHTML = result;
}  */

/* function multiplica() {
    let result = 1;
    
    for(i in arguments){
        result *= arguments[i];
    }

    h11.innerHTML = result;
}  */

// Parámetro REST
/* function multiplica(op1,op2, ...rest){
    let result = 1;

    console.log(rest);

    for(i of rest){
        result *= i;
    }

    h11.innerHTML = result;
}
 */
// Parametro Spread usamos arguments para usarlo
let myArray = [true, 5, 7, 9];


/**
 * @returns Devuelve la media de las notas si el primer parámetro 
 * es un boolean a true. En caso contrario, devuelve "Suspenso"
 */
/* function calculaMedia(op1, ...rest) {
    let result = 0;

    if (op1 == true) {
        for (i of rest) {
            result += i / rest.length;
        }
        h11.innerHTML = "Nota media: " +result;

    } else
        h11.innerHTML = "Suspenso";
} */

// Usa el parámetro ( ...myArray ) para coger los valores del array llamandlos con argumente depende de como queramos usalros con ( arguments[x] )
/* function calculaMedia() {
    if ((typeof arguments[0] == "boolean") && (arguments[0])) {
        let result = 0;
        for (i = 1; i < arguments.length; i++)
            if (typeof arguments[i] == "number")
                result += arguments[i];

        result /= arguments.length - 1;

        h11.innerHTML = "Nota media: " + result;
    }
    else
        h11.innerHTML = "Nota media: Suspenso";
} */

/* calculaMedia(...myArray); */

// Ejemplo de Generadores "NO ENTRA"
let myArray2 = [true, 5, 7, 9, false, 45, "Pepe", true, "Maria", false, false, 88];

/* let counter = contadorFuncion();
let data = counter.next();

while (!data.done) {

    h11.innerHTML += data.value + " - ";
    data = counter.next();
}
 */
// Para usar el Generador tenemos que usar "function*" | usamos yield para mostrar dentro de las funciones Generadoras
/* function* contadorFuncion() {
    for (let i in myArray2) {
        if (typeof myArray2[i] == "boolean")
            yield myArray2[i];
    }
} */

// Función main que se carga cada vez que carga el body y lanza la funcion anónima. Podemos llamarlo de dos maneras "() =>" || "function()"
// Podemos mostrar valores de variables o pasarle el valor de una como parametro sin parantesis
/* document.body.onload = () => {
    alert("Empezando... " + a +" " +b)
} */

// Funciones Anónimas. No tienen nombre se pueden declarar dentro de una variable sirven para usarse una vez porque una vez se la encuntra se ejecuta
/* b2.onclick = function(){
    it1.value = parseFloat(itop1.value) * parseFloat(itop2.value);
} */

// Cada uno manda un tipo de dato por el tipo de llamada que hace
/* b2.onclick = () => {
    alert("Empezando... " + this)
    console.log("Arguments en => es: " + arguments)
}

b1.onclick = function () {
    it1.value = this;
    console.log("Argumentes en function() es: " +arguments)
} */

recorre(myArray2);

function recorre(a) {
    for (i in a)
        h11.innerHTML += a[i] + ", ";
}