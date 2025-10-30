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

let myString =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit fugit rem! Consectetur quibusdam nesciunt, enim soluta, hic similique eius, non qui aspernatur explicabo totam nam ad repellendus ipsa cupiditate.";

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

/* let myArray = new Array(
    1,
    true,
    { nombre: "Pepe", apellidos: "Garcia perez" },
    45.67,
    Math.PI,
    false
); */

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
// myArray.splice(3, 0, "Hola", false, 9999);

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

/* let myArrayR = myArray.filter(function (elem) {
    return typeof elem == "boolean";
}); */

/* for (let i in myArray) {
    if (myArray.length - 1 == i) {
        info.innerHTML += myArray[i];
    } else
        info.innerHTML += myArray[i] + " - ";
} */

// Manera de hacer funcoines con funcinoes con o sin nombre
/* myArray.forEach(function (elem, indice, arrayActual) {
console.log("myArray es: "+arrayActual);

info.innerHTML += "<br>Elemto actual es: "+elem+ ", situado en la posición: "+indice;
}); */

/* let existBoolean = false;

existBoolean = myArray.some(function (elem) {
    return typeof elem == "boolean";
});

if(existBoolean) alert("Existen booleanos en el Array"); */

// Con Arrow no existe el This ni el Arguments
/* existBoolean = myArray.findIndex( elem => {
    return typeof elem == "boolean";
});

if(existBoolean) alert("Se ha encontrado el Index"); */

/* let fecha = document.getElementById("fecha");

let date = new Date();
// Número de segndos desde 1970 
let myDate = new Date(3468644494944);

// Fecha por parámetros
myDate = new Date(1980, 6, 31, 23, 54, 15);

myDate = new Date("Wed Jul 30 1980 11:00:15");

fecha.value = Date.parse(date);
info.innerHTML = date.getMonth();

info.innerHTML = myDate;

// El desfase de horas entre hora local y UTC
info.innerHTML = date.getTimezoneOffset();

// Hora internacional
info.innerHTML = date.getUTCHours();

// Formato de Fecha y Hora normal
info.innerHTML = date.toDateString();

// Hora local del dispositivo
info.innerHTML = date.toLocaleString();

info.innerHTML = "La hora en tu ciudad: "+ date.toUTCString() + " añadiendo un offset de " +date.getTimezoneOffset()*-1/60 +" horas";   */

// Un script que si son más de las 8 de la tarde colores oscuros en la web
/* Html = document.getElementById("main");
let date = new Date;

if (date.getHours() >= 20 || date.getHours()<=7 && (date.getMonth()>=9 || date.getMonth() <=2))  {
    mainHtml.style.backgroundColor = "#252850";
    mainHtml.style.color = "white";
} else {
    mainHtml.style.backgroundColor = "white";
    mainHtml.style.color = "black"; 
} */
/* let fecha = document.getElementById("fecha");
let bCal = document.getElementById("bCalcula"); */

/* bCal.onclick = () => {
    let date = new Date();
    let dateCumple = new Date(fecha.value);

    let result = date - dateCumple;

    info.innerHTML = "Llevas vivo " + parseInt(result/1000/60/60/24/365) +  " años";
}

// Saber si mi aplicación web esta conectada a internet (No detecta si tiene RED)
info.innerHTML = "¿Estas online? " +navigator.onLine;

// Saber el navegador en el que estas
info.innerHTML = "¿Cual es tu navegador? " +navigator.userAgent; */

// Comprueba si la página tiene cookies
// info.innerHTML = "¿Están las cookies habilitadas? " +navigator.cookieEnabled;

//Cantidad de núcleos
// info.innerHTML = "Número de nucleos? " +navigator.hardwareConcurrency;

//Cantidad de memoría
// info.innerHTML = "Cantidad de memoria? " +navigator.deviceMemory;

// Resolución usada de la pantalla
// info.innerHTML = "Resolución de la pantala (px): " +screen.availWidth +" - "+ screen.availHeight;

// Resolución total que puede alcanzar
// info.innerHTML = "Resolución TOTAL de la pantala (px): " +screen.width +" - "+ screen.height;

// Colores usados
// info.innerHTML = "Bits para colores " +screen.colorDepth;

// Bits usados en la pantalla
// info.innerHTML = "Bits para colores " +screen.pixelDepth;

// Orientación de la pantalla
// info.innerHTML = "Orientación " +screen.orientation.angle;


/* let main = document.getElementById("main");
let hora = document.getElementById("hora");
let texto = document.getElementById("texto");

let backgroundColorMain = "rgb(128, 130, 97)";
let backgroundColorMain2 = "rgba(232,52,7,1)"; */

/* setTimeout(function () {
    mainHtml.style.backgroundColor = "rgb(233,233,233, 1)"
}, 5000) */

/* let intervalo = setInterval(function () {
    if (main.style.backgroundColor == backgroundColorMain)
        main.style.backgroundColor = backgroundColorMain2;
    else
        main.style.backgroundColor = backgroundColorMain;
}, 2000);

document.getElementById("paraIntervalo").onclick = function () {
    clearInterval(intervalo);
} */

/* document.getElementById("bRecordar").onclick = () => {
    let mensaje = texto.value;
    let tiempo = new Date(hora.value);

    let fechaNow = new Date();
    
    tiempo = Math.abs(fechaNow - tiempo);

    setTimeout(function () {
        alert(mensaje)
    }, tiempo);

} */

/* let vAux = undefined;

document.getElementById("bAbrir").onclick = () => {

    vAux = window.open("./usuarios.html", "_blank", "width=300px, height=400px, left=400px, top=100px",);

}

document.getElementById("bMover").onclick = () => {

    if ((vAux) && (!vAux.closed))
        vAux.moveTo(200, 200);
    vAux.focus(); //Para que mantenga el foco y no se queda atras
    // vAux.blur(); //Quita el foco de la pestaña donde se encuentra

}
document.getElementById("bMoverBy").onclick = () => {

    if ((vAux) && (!vAux.closed))
        vAux.moveBy(200, 200);
    vAux.focus(); //Para que mantenga el foco y no se queda atras
}
document.getElementById("bResizeTo").onclick = () => {

    if ((vAux) && (!vAux.closed))
        vAux.resizeTo(400, 400);
    vAux.focus(); //Para que mantenga el foco y no se queda atras
}
document.getElementById("bResizeBy").onclick = () => {

    if ((vAux) && (!vAux.closed))
        vAux.resizeBy(200, 200);
    vAux.focus(); //Para que mantenga el foco y no se queda atras
}
document.getElementById("bPrint").onclick = () => {

    if ((vAux) && (!vAux.closed))
        vAux.print();
}

document.getElementById("aEnviarLogin").onclick = () => {
    if (!vAux.closed)
        vAux.document.getElementById("loginText").value = document.getElementById("login").value;

    vAux.focus();
} */

// Crear una cookie que expire en un determinado momento
/* document.cookie = "name=Pepe; max-age=20000000"; */

// Número de formularios que hay creados
/* alert(document.forms.length) */

/* let opt = document.createElement("option");
opt.innerHTML = "Alemania"
document.getElementById("lista").appendChild(opt); */

/* document.getElementById("uno").style.backgroundColor = "pink";
document.getElementById("dos").style.backgroundColor = "black"; */

//URL de la página y URL de la página que ha llamado a esta
/* info.innerHTML = "URL: " + document.location + "\nReferencia desde: " + document.referrer;
 */
// Muestra el contenido de nuestro árboo DOM
/* console.log(document.children[0].children)
 */
// NO FUNCIONA
/* document.getElementById("bSalir").onclick = ()=>{
    document.exitFullscreen();
} */

/* document.open();

document.writeln("<h1>Has ganando un premio!! Dime tu cuenta para ingresar el premio: </h1><input input type = 'text'></input>");

document.close(); */

/* console.log(history) */
/* info.innerHTML = "Número de webs visitadas: " + history.length; */
/* info.innerHTML += "¿Cuál es la última?: " + history.current+ "<br>";
info.innerHTML += "¿Cuál es la siguiente?: " + history.next+ "<br>"; */

/* info.innerHTML = "URL: " + location.port;

document.getElementById("back").onclick = () => {
    history.back()
}

document.getElementById("forward").onclick = () => {
    history.forward()
}

document.getElementById("byoutube").onclick = () => {
    // location.href = "./usuarios.html";
    location.assign("./usuarios.html");
    // location.reload("./usuarios.html");
    // location.replace("./usuarios.html");

} */

// let text = document.getElementById("texto");

// let er1 = new RegExp("\\+");
// let er2 = /o$/ig;
// let er2 = /^[A-Z]/ig;
// let er2 = /.$/ig;
// let er2 = /../ig;
// let er2 = /[viernes|Mancha]+/;
// let er2 = /\d{1,2}/g;

// console.log(text.innerHTML)

// let result = er1.test(text.innerText);

/* let tmpIndex = er2.lastIndex;

// Podemos encontrar x ocurriencis dentro de un texto recorriendolo así
while (er2.test(text.innerText)) {
    console.info("LastIndex después de test: " + er2.lastIndex);

    er2.lastIndex = tmpIndex;

    let result = er2.exec(text.innerText);
    console.info("LastIndex después de exec: " + er2.lastIndex);

    console.log(result);
    info.innerHTML += "Encontrado " + result["0"] + " en la posición " + result.index + "<br>";

    tmpIndex = er2.lastIndex;
} */

// Manera corta y más clara sin lastIndex 
/*let result;
while ((result = er2.exec(text.innerText)) !== null) {
    console.info("LastIndex después de exec: " + er2.lastIndex);
    console.log(result);
    info.innerHTML += "Encontrado " + result[0] + " en la posición " + result.index + "<br>";
} */

// Se útiliza para devolver un encontrado o no encontrado simplemente
/* while (text.match(er2)) 
    info.innerHTML = "Encontrado: " + text.match(er2); */

// Búsca en un texto como el metodo de antes
/* if (text.match(er2)) 
    for(enc of text.matchAll(er2))
        console.log(enc) */

/* if (text.innerText.match(er2)) 
    text.innerHTML = text.innerText.replaceAll(er2,"<strong style='color:red'><u>REF</u></strong>"); */


// info.innerHTML = result;
// info.innerHTML = result1;

// '\' Especificar metacaracteres complejos \x y para escapar otros metacaracteres
// '^' Empieza por '$' acaba por '*' algo que se repite 0 o más veces '+' 1 o más '?' 0 o una vez
// '.' calquier caracter solo 1 '{x,x}' Devolver de x a x indempendiente mente de si las x no están declaradas
// 


// Empiece por mayúscula (al menos uno) entre D-R
// Contenga, al menos, 2 símbolos entre (_,-,$;(,))
let login = document.getElementById("login");
let pass = document.getElementById("pass");

document.getElementById("bLogin").onclick = () => {
    let value = pass.value;

    let start = /^[D-R]/.test(value);
    let simbolos = (value.match(/[_\-\$\(\)]/g) || []).length;

    if (start && simbolos >= 2) {
        info.innerHTML = "Login válido";
    } else {
        info.innerHTML = "Login inválido";
    }

}












