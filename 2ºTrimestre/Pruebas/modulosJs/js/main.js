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


// var alumno = new Object();

// alumno.name = "Pepe";
// alumno.age = 19;
// alumno.course = 2;
// alumno.fp = "DAW";

// console.log(alumno);
// console.log(JSON.stringify(alumno));

//Al enlace le damos evento para que al clickarlo acceda el txt
// document.getElementById("leeTxt").addEventListener("click", () => {
//     // Nombre de variable de XML HTTP REQUEST
//     let xhr = new XMLHttpRequest();


//     xhr.responseType = "json";

//     // Preparamos la función lista para la respuesta
//     xhr.onreadystatechange = function () {
//         /**
//             * El readyState revisa el Estado y status el estado
//             0	UNSENT → XHR creado pero no configurado
//             1	OPENED → xhr.open() ya se llamó
//             2	HEADERS_RECEIVED → El servidor respondió con cabeceras
//             3	LOADING → Se están recibiendo datos (parcialmente)
//             4	DONE → La petición terminó y la respuesta está completa
//             Y Estado 200 porque garantiza que la peteción este BIEN
//         */

//         console.log("Estado: " + xhr.readyState + ". Nivel: " + xhr.status);
//         // El responseText lee el contenido de la petición del xhr
//         // info.innerHTML = xhr.responseText;



//         if ((xhr.readyState == 4) && (xhr.status == 200)) {
//             //Diferencia entre reponseText y response es que el text siempre devuelve texto plano en html y el
//             // response es más flexible y depende del responseType


//             //Procesamos los datos
//             // let textarea = document.getElementById("data").value 
//             // textarea = xhr.responseText;

//             // Ver todas las cabeceras de lo que se ha mandado
//             // console.log(this.getAllResponseHeaders());

//             // var alumnos = xhr.responseXML;
//             // info.innerHTML = xhr.response;
//             info.innerHTML = "";

//             // alumnos = alumnos.getElementsByTagName("Alumnos")[0].getElementsByTagName("alumno");

//             //Procesamos la respuesta del servidor
//             // info.innerHTML = xhr.response;
//             // info.innerHTML = xhr.responseXML;

//             // console.log(alumnos[0]);
//             // Leer datos concretos de un XML
//             // console.log(alumnos[1].getElementsByTagName("name")[0].textContent);
//             // info.innerHTML = "Nombre: "+ alumnos[1].getElementsByTagName("name")[0].textContent;

//             // Para sacar el valor del atributo
//             // info.innerHTML = "Nombre: "+ alumnos[0].getElementsByTagName("name")[0].getAttribute("course");

//             // let respData = xhr.response;
//             // console.log("Usuario: " + respData.name + ", con edad " + respData.age + " años.");

//             // Sacaremos el nombre concreto del hueco concreto del JSON
//             console.log(xhr.response.animales[3].nombre);
//             let datos = xhr.response.animales
//             console.log(datos);
//             for (let index = 0; index < datos.length; index++) {
//                 info.innerHTML += xhr.response.animales[index].nombre + " <br>";
//             }
//         }

//     }

//     // Método  que establece al conexión mediante una petición HTTP (En este caso direccion vhost)
//     // xhr.open("GET", "http://www.pruebasjs.es/server/hello.txt");

//     // Mandar algo al Servidor enlazados con la URL
//     // xhr.open("POST", "http://www.pruebasjs.es/server/hello.php");
//     // xhr.open("POST", "http://www.pruebasjs.es/server/alumnos.xml");

//     xhr.open("POST", "http://www.pruebasjs.es/server/animales.json");


//     // xhr.open("GET", "http://www.pruebasjs.es/server/hello.php?login=Pepe&pass=1234");

//     //Hacer la resqueste al header + llamada a la misma solo hara falta si se mandan datos a un php
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     //Datos a leer del php con POST
//     // xhr.send("login=Pepe&pass=1234");

//     //Si queremos hacerlo con get simplemente enviamos los datos que ya van cargados en el GET
//     // xhr.send();

//     // Para convertir un json en cadena
//     // xhr.send(JSON.stringify(alumno));
//     xhr.send();

// });

//Asignar al boton un addEvenListener
document.getElementById("boton").addEventListener("click", () => {
    const login = document.getElementById("login");
    const pass = document.getElementById("pass");

    console.log("Login: " + login.value + ", Password: " + pass.value);

    //Crear una cookie
    document.cookie = "login= " + login.value
    document.cookie = "pass= " + pass.value;
});

const input = document.getElementById("selectorColor");
input.addEventListener("change", function () {
    const color = this.value;
    document.cookie = `prefColor=${color}; path=/; max-age=86400`;
})

function getCookie(nombre) {
    const partes = document.cookie.split("; ");
    for (const parte of partes) {
        const [clave, valor] = parte.split("=");
        if (clave === nombre) return valor;
    }
    return null;
}

window.addEventListener("DOMContentLoaded", () => {
    const color = getCookie("prefColor");
    if (color) {
        document.body.style.backgroundColor = color;
    }
});


// let info = document.getElementById("info");

// document.getElementById("bLogin").addEventListener("click", () => {
//     const login = document.getElementById("login");
//     const pass = document.getElementById("pass");
//     const prefColor = document.getElementById("prefColor");

//     console.log("Login: " + login.value + ", Password: " + pass.value);

//     document.cookie = "login=" + login.value;
//     document.cookie = "pass=" + pass.value;
//     document.cookie = "prefColor=" + prefColor.value;

//     let color = checkCookie("prefColor");
//     if (color)
//         document.body.style.backgroundColor = color;    
// });


// /************************************ */

// function checkCookie(c) {
//     let result = false;
//     if (document.cookie.match(c)) {
//         let myCookies = document.cookie.split(";");
//         for (let i = 0; i < myCookies.length; i++)
//             if (myCookies[i].match(c)) {
//                 let color = myCookies[i].split("=");
//                 result = color[1];
//                 break;
//             } 
//     }
//     else {
//         result = false;
//     }

//     return result;
// }






