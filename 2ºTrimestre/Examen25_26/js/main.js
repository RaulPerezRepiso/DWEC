import { cookie, borrarCookie, localStorage } from "./storage.js"




document.getElementById("btn-login-user").addEventListener("click", cookie => {
    const login = document.getElementById("login").value;
    const email = document.getElementById("email").value;

    console.log("Login: " + login.value + ", Email: " + email.value);

    // window.onload = function cargarNombre() {

    //     document.getElementById("loged-user").innerHTML = "Usuario" +login.value;
    // }

    document.cookie = "login=" + login.value + ";max-age=" + (2 * 24 * 60 * 60);
    document.cookie = "email=" + email.value + ";expires=Thu, 31 Dec 2026 15:00:00UTC";

});

document.getElementById("btn-primary").addEventListener("click", localStorage => {

    const title = document.getElementById("incident-title").value;
    const inc = document.getElementById("incident-desc").value;
    // const fecha = new Date();

    localStorage.title = title.value;
    localStorage.inc = inc.value;
    // localStorage.fecha = fecha;

});


document.getElementById("btn-clear-storage").addEventListener("click", borrarCookie => {
    const login = document.getElementById("login").value;
    const email = document.getElementById("email").value;
    const title = document.getElementById("incident-title").value;
    const inc = document.getElementById("incident-desc").value;

    document.cookie = `${login}=; max-age=0`;
    document.cookie = `${email}=; max-age=0`;
    localStorage.title = 0;
    localStorage.inc = 0;

});


// FUNCIÓN PARA CREAR NODOS
function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesitas al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
    }

    return nodo;
}
