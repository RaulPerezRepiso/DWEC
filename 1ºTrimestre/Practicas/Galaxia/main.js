/**
 * Funcion para crear Nodos que nos servira para crear los nodos necesarios para crear los planetas
 * @param {*} tipoNodo
 * @param {*} tipoTexto
 * @returns
 */
function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesitas al menos el tipo de elemento a crear.";
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

let bIns = document.getElementById("bIns");
let color = document.getElementById("color");
let eX = document.getElementById("eX");
let eY = document.getElementById("eY");
let diametro = document.getElementById("diametro");
let nombre = document.getElementById("nombre");
let satel = document.getElementById("satel");

let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

// 20% del ancho de la ventana en píxeles

bIns.onclick = () => {

    empezarGalaxia();
}

let div2 = document.getElementById("div2");
div2.style.position = "relative"; // clav

function empezarGalaxia() {
    planeta = createNode("div", nombre.value);
    planeta.style.textAlign = "center";
    planeta.style.lineHeight = diametro.value + "px"; // centra vertical
    planeta.style.color = "white";
    planeta.style.width = diametro.value + "px";   // Ancho
    planeta.style.height = diametro.value + "px"; // Alto

    // Necesario para que top funcione
    planeta.style.position = "absolute";

    if (satel.checked) {
        planeta.style.border = "5px solid white";
    }

    // Convertimos el valor del input eX a número
    let valorX = parseInt(eX.value) || 0;
    let posX = valorX;   // sumamos el 20% + lo que ponga el usuario

    planeta.style.top = eY.value + "px";
    planeta.style.left = posX + "px";

    planeta.style.backgroundColor = color.value; // Color para que se vea
    planeta.style.borderRadius = "50%"
    div2.appendChild(planeta);
}
