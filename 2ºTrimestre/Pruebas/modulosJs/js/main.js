//Importe el valor de la varaible y la funcion con la ruta completa y bien
// No hace falta hacer import de valor de la variable la coge automaticante de la clase con exportar el método basta

// import { actualYear, sayHello } from "./modules/lib.js";

// Por el exporte default tendremos que llamar fuera de los corchetes al sayHello 
// import sayHello, { actualYear } from "./modules/lib.js";

//Llamada con pseudonimo (Tendremos que hacer despues lib.nombre).
// import sayHello, * as lib from "./modules/lib.js";

// // Ejecuta el código de la libreria pero no puede llamarlo
// // import "./modules/lib.js";

let info = document.getElementById("info");

// info.innerHTML = "<b>Año actual " + lib.actualYear + "</b>";
// info.innerHTML += "<br>" + sayHello();

// //   URL completa del archivo JS que se está ejecutando.
// console.log(import.meta);

//Al enlace le damos evento para que al clickarlo acceda el txt
document.getElementById("leeTxt").addEventListener("click", () => {
    // Nombre de variable de XML HTTP REQUEST
    let xhr = new XMLHttpRequest();

    // Preparamos la función lista para la respuesta
    xhr.onreadystatechange = function () {
        /**
            * El readyState revisa el Estado y status el estado
            0	UNSENT → XHR creado pero no configurado
            1	OPENED → xhr.open() ya se llamó
            2	HEADERS_RECEIVED → El servidor respondió con cabeceras
            3	LOADING → Se están recibiendo datos (parcialmente)
            4	DONE → La petición terminó y la respuesta está completa
            Y Estado 200 porque garantiza que la peteción este BIEN
        */

        console.log("Estado: " + xhr.readyState + ". Nivel: " + xhr.status);
        // El responseText lee el contenido de la petición del xhr
        // info.innerHTML = xhr.responseText;

        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            //Procesamos los datos
            document.getElementById("data").value = xhr.responseText;

            // Ver todas las cabeceras de lo que se ha mandado
            console.log(this.getAllResponseHeaders());
        }

    }

    // Método  que establece al conexión mediante una petición HTTP (En este caso direccion vhost)
    // xhr.open("GET", "http://www.pruebasjs.es/server/hello.txt");

    // Mandar algo al Servidor enlazados con la URL
    xhr.open("POST", "http://www.pruebasjs.es/server/hello.php");
    //Hacer la resqueste al header + llamada a la misma
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //Datos a leer del php
    xhr.send("login=Pepe&pass=1234");

});