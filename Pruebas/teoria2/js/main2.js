let word = document.getElementById("word");
let palabra = document.getElementById("palabra");
let bMos = document.getElementById("bMos");
let bIns = document.getElementById("bIns");

let error, letra, letras, bLetra, contador;
let juego = true;
let intentos = 6;
let adivina = "";
let intervalo;
let arrayLetras = [];

function createNode(tipoNodo, tipoTexto) {
    let nodo, nodoText;
    switch (arguments.length) {
        case 0:
            throw "Se necesita al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
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
    word.type = word.type === "password" ? "text" : "password";
    bMos.innerText = word.type === "text" ? "Ocultar" : "Mostrar";
};

bIns.onclick = () => {
    let valor = word.value;
    let val = /^[A-Za-z]+$/;
    if (val.test(valor) && juego) {
        empezarJuego();
        juego = false;
        bMos.disabled = true;
        bIns.disabled = true;
        word.disabled = true;
    } else {
        palabra.innerText = "Solo letras mayúsculas o minúsculas.";
    }
};

function empezarJuego() {
    error = createNode("h3");
    error.style.color = "red";
    document.body.appendChild(error);

    contador = createNode("h4");
    document.body.appendChild(contador);

    letra = createNode("input");
    letra.maxLength = 1;
    document.body.appendChild(letra);

    bLetra = createNode("button", "Probar Letra");
    bLetra.onclick = () => registraIntento();
    document.body.appendChild(bLetra);

    letras = createNode("h4");
    document.body.appendChild(letras);

    adivina = word.value;
    word.value = "";
    palabra.innerText = "";
    arrayLetras = Array(adivina.length).fill("-");
    palabra.innerText = arrayLetras.join(" ");

    let tiempoTotal = adivina.length * 50;
    contador.innerText = "Tiempo restante: " + tiempoTotal + " segundos";
    contador.style.color = "darkblue";

    intervalo = setInterval(() => {
        tiempoTotal--;
        contador.innerText = "Tiempo restante: " + tiempoTotal + " segundos";
        contador.style.color = contador.style.color === "blue" ? "darkblue" : "blue";

        if (tiempoTotal <= 0) {
            clearInterval(intervalo);
            contador.style.color = "red";
            contador.innerText = "¡Tiempo agotado!";
            letra.disabled = true;
            bLetra.disabled = true;
        }
    }, 1000);
}

function registraIntento() {
    let intento = letra.value.toLowerCase();
    letra.value = "";

    if (!/^[a-zA-Z]$/.test(intento)) {
        error.innerText = "Introduce una letra válida.";
        letra.focus();
        return;
    } else {
        error.innerText = "";
    }

    letra.focus();
    let acierto = false;

    for (let i = 0; i < adivina.length; i++) {
        if (adivina[i].toLowerCase() === intento && arrayLetras[i] === "-") {
            arrayLetras[i] = adivina[i];
            acierto = true;
        }
    }

    palabra.innerText = arrayLetras.join(" ");

    if (!acierto) {
        intentos--;
        letras.innerText += "Letra incorrecta: " + intento + " | Intento " + (6 - intentos) + "/" + 6 + "\n";
    }

    if (!arrayLetras.includes("-")) {
        contador.innerText = "¡Has adivinado la palabra!";
        clearInterval(intervalo);
        letra.disabled = true;
        bLetra.disabled = true;
    } else if (intentos <= 0) {
        letras.style.color = "red";
        letras.innerText += "Intentos agotados\n";
        contador.style.color = "red";
        contador.innerText = "¡Tiempo agotado!";
        letra.disabled = true;
        bLetra.disabled = true;
        clearInterval(intervalo);
    }
}
