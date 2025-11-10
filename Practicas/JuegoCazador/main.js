let word = document.getElementById("word");
let palabra = document.getElementById("palabra");
let bMos = document.getElementById("bMos");
let bIns = document.getElementById("bIns");

let error;
let letra;
let letras;
let bLetra;
let contador;

let juego = true;
let intentos = 6;
let adivina = "";
let intervalo;
let arrayLetras = [];

function createNode(tipoNodo, tipoTexto) {

    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesitas al menos el tipo de elemetno a crear.";
        case 1: nodo = document.createElement(tipoNodo);
            nodo.id = "nuevoNodo";
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
    }

    return nodo;
}

bMos.onclick = () => {
    mostrarPalabra();
}

function mostrarPalabra() {
    if (word.type == "password") {
        word.type = "text";
        bMos.innerText = "Ocultar";
    } else {
        word.type = "password";
        bMos.innerText = "Mostrar";
    }
}

bIns.onclick = () => {
    validarPalabra();
}

function validarPalabra() {
    let valor = word.value;
    let val = /^[A-Za-z]+$/;

    if (val.test(valor) && juego == true) {
        empezarJuego();
        juego = false;
        bMos.disabled = true;
        bIns.disabled = true;
        word.disabled = true;
    } else {
        palabra.innerText = "Solo letras mayúsculas o minúsculas.";
    }

}

function empezarJuego() {

    // Crear campo de error
    error = createNode("h3");
    error.style.color = "red";
    document.body.appendChild(error);

    // Crear campo de letra
    contador = createNode("h4");
    document.body.appendChild(contador);

    //Crear campo de letras
    letra = createNode("input");
    document.body.appendChild(letra);

    // Crear botón de letra
    bLetra = createNode("button", "Probar Letra");
    bLetra.onclick = () => {
        registraIntento();
    }
    document.body.appendChild(bLetra);

    // Crear campo de letra
    letras = createNode("h4");
    document.body.appendChild(letras);

    palabra.innerText = "";
    word.placeholder = "Juego Comenzado"
    adivina = word.value;
    word.value = "";
    word.type = "text";

    for (let i = 1; i <= adivina.length; i++) {
        arrayLetras[i] = "-";
    }
    palabra.innerText = arrayLetras.join(" ");

    let tiempoTotal = adivina.length * 5;

    contador.innerText = "Tiempo restante: " + tiempoTotal + " segundos";
    contador.style.color = "darkblue";

    intervalo = setInterval(() => {
        tiempoTotal--;
        contador.innerText = "Tiempo restante: " + tiempoTotal + " segundos";
        if (contador.style.color == "blue") {
            contador.style.color = "darkblue";
        } else {
            contador.style.color = "blue";
        }
        if (tiempoTotal <= 0) {
            clearInterval(intervalo);
            contador.style.color = "red";
            contador.innerText = "¡Tiempo agotado!";
            bIns.disabled = true;
            letra.disabled = true;
            bLetra.disabled = true;
        }
    }, 1000);
}

function registraIntento() {
    let intento = letra.value;
    letra.value = "";

    if (!/^[a-zA-Z]$/.test(intento)) {
        error.innerText = "Introduce una Letra por intento (Solo caracteres válidos)";
        letra.focus();
        return;
    } else {
        error.innerText = "";
    }
    letra.focus();
    intentos--;

    if (intentos > 0) {
        letras.innerText = "Intento " + (6 - intentos) + "/" + 6 + ": " + intento + "\n";
    } else {
        letras.style.color = "red";
        letras.innerText = "Intentos Acabados";
        contador.style.color = "red";
        contador.innerText = "¡Tiempo agotado!";
        contador = 0;
        letra.disabled = true;
        bLetra.disabled = true;
    }
}

