let pelota = document.getElementById("pelota");

/**Centrar verticalmente la pelota */

/**
 1 - Obtener el alto ÚTIL de la ventana
 2 - Dividirlo por la mitad menos la mitad del alto la pelota
 3 - Aplicar el nuevo alto de la pelota
 */

let wHeight = window.innerHeight;
console.log("Alto :" + wHeight);

wHeight = wHeight / 2;

let pelotaCSS = window.getComputedStyle(pelota);
let pelotaHeight = pelotaCSS.getPropertyValue("height");

pelotaHeight = quitaPX(pelotaHeight);

let positionHeight = wHeight - (pelotaHeight / 2);

pelota.style.top = positionHeight + "px";

let pelotaLeft = 0;

rebota();

/************************************ Funciones ******************************/
// Elimina px
function quitaPX(cad) {
    cad = parseFloat(cad.slice(0, cad.length - 2));
    return cad;
}

//Función que aumenta el Left de la pelota hasta el final de la ventana
function LeftPlus() {
    let leftCSS = pelotaCSS.getPropertyValue("left");
    leftCSS = quitaPX(leftCSS);

    pelota.style.left = (leftCSS + 1) + "px";
}
function LeftMinus() {
    let leftCSS = pelotaCSS.getPropertyValue("left");
    leftCSS = quitaPX(leftCSS);

    pelota.style.left = (leftCSS - 1) + "px";
}

function rebota() {
    let wWindow = window.innerWidth;
    let leftCSS = pelotaCSS.getPropertyValue("left");
    leftCSS = quitaPX(leftCSS);
    let direccion = 1; //1 va a hacía la derecha. -1 va hacia la izquierda

    let widthPelota = pelotaCSS.getPropertyValue("width");
    widthPelota = quitaPX(widthPelota);

    setInterval(() => {
        // Mueva la direcion hasta que toca borde derecho
        if (leftCSS >= (wWindow - widthPelota)) {
            direccion = -1;
        }

        // Cambia dirección si toca borde izquierdo
        if (leftCSS <= 0) {
            direccion = 1;
        }

        // Mueve la pelota según dirección
        leftCSS += direccion;
        pelota.style.left = leftCSS + "px";

    }, 10);
}




