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


var alumno = new Object();

alumno.name = "Pepe";
alumno.age = 19;
alumno.course = 2;
alumno.fp = "DAW";

console.log(alumno);
console.log(JSON.stringify(alumno));

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
            //Diferencia entre reponseText y response es que el text siempre devuelve texto plano en html y el
            // response es más flexible y depende del responseType


            //Procesamos los datos
            document.getElementById("data").value = xhr.responseText;

            // Ver todas las cabeceras de lo que se ha mandado
            // console.log(this.getAllResponseHeaders());

            // var alumnos = xhr.responseXML;
            info.innerHTML = xhr.response;
            // alumnos = alumnos.getElementsByTagName("Alumnos")[0].getElementsByTagName("alumno");

            //Procesamos la respuesta del servidor
            // info.innerHTML = xhr.response;
            // info.innerHTML = xhr.responseXML;

            // console.log(alumnos[0]);
            // Leer datos concretos de un XML
            // console.log(alumnos[1].getElementsByTagName("name")[0].textContent);
            // info.innerHTML = "Nombre: "+ alumnos[1].getElementsByTagName("name")[0].textContent;

            // Para sacar el valor del atributo
            // info.innerHTML = "Nombre: "+ alumnos[0].getElementsByTagName("name")[0].getAttribute("course");

        }

    }

    // Método  que establece al conexión mediante una petición HTTP (En este caso direccion vhost)
    // xhr.open("GET", "http://www.pruebasjs.es/server/hello.txt");

    // Mandar algo al Servidor enlazados con la URL
    // xhr.open("POST", "http://www.pruebasjs.es/server/hello.php");
    // xhr.open("POST", "http://www.pruebasjs.es/server/alumnos.xml");

    xhr.open("POST", "http://www.pruebasjs.es/server/hello.php");


    // xhr.open("GET", "http://www.pruebasjs.es/server/hello.php?login=Pepe&pass=1234");

    //Hacer la resqueste al header + llamada a la misma solo hara falta si se mandan datos
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //Datos a leer del php con POST
    // xhr.send("login=Pepe&pass=1234");

    //Si queremos hacerlo con get simplemente enviamos los datos que ya van cargados en el GET
    // xhr.send();

    // Para convertir un json en cadena
    xhr.send(JSON.stringify(alumno));

});