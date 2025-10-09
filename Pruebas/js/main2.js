/* let info = document.getElementById("info");
let obj1 = {
    nombre: "Pepe",
    edad: 34,
    email: "pepe@mail.com"
}; */

// Define propiedades para los objetos Writable hace que se puedan modificar valores, enumerable que salga en la consola y valor el valor que le queremos dar a esa propiedad nueva
/* Object.defineProperty(obj1, "color", { writable: true, enumerable: true, value: "red" });
obj1.color = "yellow";

let obj2 = new Object({
    nombre: "Ana",
    edad: 25,
    email: "ana@mail.com"
}); */

// Podemos definir varias propiedas usando Properties
/* Object.defineProperties(obj2, {
    "color": { writable: true, enumerable: true, value: "blue" },
    "notas": { writable: true, enumerable: true, value: [6, 7, 8] }
}); */

// Añade una variable con el valor asociado
/* obj2.tlf = "666777888"; */

// Object.getPrototypeOf y Object.setPrototypeOf Trae y da valor al objeto

// Object.preventExtensions impide asignar nuevos valores al objeto
/* Object.preventExtensions(obj2);
obj2.colordefondo = "green"; */


// Borra el valor de la variable
/* delete obj2.tlf;

info.innerHTML += "Datos de Pepe: " + obj1.nombre + ", " + obj1.edad + ", " + obj1.email + " " + obj1.color + "<br>";
info.innerHTML += "obj1.nombre es enumerable:  " + obj1.nombre.enumerable + "<br>";

info.innerHTML += "<hr>Datos de Ana: " + obj2.nombre + ", " + obj2.edad + ", " + obj2.email + " Tlf: " + obj2.tlf + " " + obj2.color + "<br>";
info.innerHTML += "obj2.nombre es enumerable:  " + obj2.nombre.enumerable + "<br>";

console.log("Recorriendo obj1: ")
for (prop in obj1)
    console.log(obj1[prop]);

console.log("Recorriendo obj2: ")
for (prop in obj2)
    console.log(obj2[prop]);

info.innerHTML += "<br>Datos de obj1: " +Object.keys(obj1);

info.innerHTML += "<hr>Datos de obj2: " +Object.keys(obj2); */


/* for of NO sirve para objetos pero si en la llamda de objetos dentro de keys
for(prop of obj1)
    console.log[prop]; */

// Usamos el for of porque saca el objeto directo por el que estamos haciendo la pregunta
/* console.log("Recorriendo obj2: ")
for (prop of Object.keys(obj2))
    console.log("Propiedad "+prop +". Value: "+obj2[prop]); */

// Propiedad para ver si se puede añadir algo o no al Obj2
/* if(Object.isExtensible(obj2))
    obj2.colordefondo = "green";
else alert("No es extensible"); */

// Restrictivo no deja ni borrar ni añadir
/* Object.seal(obj2); */

// Permite preguntar si el objeto es modificable o no
/* if(!Object.isSealed(obj2))
    delete obj2.nombre;
else alert("No es Modificable");

delete obj2.notas */

// Congela el objeto NO deja modificarlo
/* Object.freeze(obj2);

if(!Object.isFrozen(obj2))
    delete obj2.nombre;
else alert("Esta congelado");

console.log("Recorriendo obj2: ")
for (prop of Object.keys(obj2))
    console.log("Propiedad "+prop +". Value: "+obj2[prop]);
 */

// Comillas simples y dobles para declarar bien el cuerpo
/* eval("document.open(); document.write('<h1>Web Eliminada!</h1>')"); */

let info = document.getElementById("info");


/* info.innerHTML = Math.ceil(4.1);
info.innerHTML = Math.round(Math.random() * 100);
info.innerHTML = 5 / 0;
info.innerHTML = 5 / "a";

info.innerHTML = Math.PI.toFixed(3);
info.innerHTML = Math.PI.toExponential(3); */

/* let num = (Number.MAX_VALUE);
num = num/0;

if(Number.isFinite(num))
    info.innerHTML = num;
info.innerHTML = "Valor infinito inesperado"; */

// let num = 2134.1234
// info.innerHTML = num.toLocaleString;

let myString = "Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit fugit rem! Consectetur quibusdam nesciunt, enim soluta, hic similique eius, non qui aspernatur explicabo totam nam ad repellendus ipsa cupiditate.";

// Si mostramos algo fuera de la cadena no mostrara nada o si pedimos un caracter que no este
// info.innerHTML = myString.charAt(100);
// info.innerHTML = myString.indexOf("a");

// Mostrar caracteres por codigo
/* info.innerHTML = String.fromCharCode("0x0bd0");

info.innerHTML = myString.charCodeAt("L");
info.innerHTML = myString.indexOf("L"); */

/* let resultado = myString.replaceAll("textoOriginal", "textoNuevo");

for (let encontrado of myString.matchAll("sit")) {
    console.log(encontrado);
} */

/* let mySlice = myString.slice(100,150);

console.log(mySlice); */

/* let mySplit= myString.split(" ");

console.log(mySplit); */

let myArray = new Array(1, true, { nombre: "Pepe", apellidos: "Garcia perez", }, 45.67, Math.PI, false);

// Podemos definir la posicion con el contenido que queramos pero estarán vacias los demas sitios del array solo llenar el asignado los demás Undefined
// myArray[10001] = "Mery";

// info.innerHTML = myArray[9999];

// Push añade al final y pop elimina el ultimo elemnto
/* myArray.push([1,2,3,4,5])
myArray.push(2025);

myArray.pop(); */

// Unshif añade delante y Shift elimina de delante
/* myArray.unshift(2025);
myArray.unshift("Lorem ipsum");

myArray.shift();
myArray.shift();
myArray.shift();
 */

// Sino ponemos como lo ordenada por rango
/* let prueba = myArray.sort();

console.log(prueba); */

// 1 Posición a partir de la que quieres añadir 2 Posición a partir de la que quieres borrra y lo demás numero a añadir desde la posición indicada +1
myArray.splice(3, 0, "Hola", false, 9999);

/* Números que sean negativos
    true a flase y viceversa
    Los string se le anteponga "Nombre:" */

/* let myArrayR = myArray.map(function (elem) {
    console.log("Elemento: " + elem)
    switch (typeof elem) {
        case "number":
            return elem * -1;
        case "boolean":
            return !elem;
        case "string":
            return "Nombre: " + elem;
    }
}) */
/* info.innerHTML = myArrayR;
console.log(myArrayR); */

// CallBacks con funciones
/* let myArrayResult = myArray.map(modificaArray)

function modificaArray(elem) {
    switch (typeof elem) {
        case "number":
            return (elem * -1);
        case "boolean":
            return !elem;
        case "string":
            return "Nombre: " + elem;
    }
}

info.innerHTML = myArrayResult;
console.log(myArrayResult); */

let myArrayR = myArray.filter(function (elem) {
    return typeof elem == "boolean";
})

/* for (let i in myArray) {
    if (myArray.length - 1 == i) {
        info.innerHTML += myArray[i];
    } else
        info.innerHTML += myArray[i] + " - ";
} */
