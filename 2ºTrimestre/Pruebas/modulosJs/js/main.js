//Importe el valor de la varaible y la funcion con la ruta completa y bien
// No hace falta hacer import de valor de la variable la coge automaticante de la clase con exportar el método basta

// import { actualYear, sayHello } from "./modules/lib.js";

// Por el exporte default tendremos que llamar fuera de los corchetes al sayHello 
// import sayHello, { actualYear } from "./modules/lib.js";

//Llamada con pseudonimo (Tendremos que hacer despues lib.nombre).
import sayHello, * as lib from "./modules/lib.js";

// Ejecuta el código de la libreria pero no puede llamarlo
// import "./modules/lib.js";


let info = document.getElementById("info");

info.innerHTML = "<b>Año actual " + lib.actualYear + "</b>";
info.innerHTML += "<br>" + sayHello();

// URL completa del archivo JS que se está ejecutando.
console.log(import.meta);