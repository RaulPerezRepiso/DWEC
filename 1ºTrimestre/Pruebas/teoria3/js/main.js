/* let info = document.getElementById("info");

document.body.addEventListener("mousemove", getCoord);

// Función que llama a las coordenaas que tiene el ratón y las muestra por pantalla con un color en el span
function getCoord(event) {
    info.innerHTML = "Coordenada X: <span style='color:lightblue'>" + event.pageX + "</span> - Coodenada Y: <span style='color:lightblue'>" + event.pageY + "</span>";
} */


/* function createNode(tipoNodo, tipoTexto) {
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

document.body.addEventListener("mousemove", juego);

divP = createNode("div");
div1 = createNode("div");
div3 = createNode("div");
div2 = createNode("div");
div4 = createNode("div");



function juego(ev) {

    divP.id = "divP";
    divP.style.width = "100%";
    divP.style.height = "100vh";


    div1.style.backgroundColor = "yellow";
    div1.id = "divs";

    div2.style.backgroundColor = "red";
    div2.id = "divs";

    div3.style.backgroundColor = "blue";
    div3.id = "divs";

    div4.style.backgroundColor = "green";
    div4.id = "divs";

    divP.appendChild(div1);
    divP.appendChild(div2);
    divP.appendChild(div3);
    divP.appendChild(div4);

    document.body.appendChild(divP);

} */

// Una constante con los 4 divs con los estilos, id y demás para recorrerlo después e ir creandolos
const Divs = [{ elem: "div", id: "div1", style: "display:inline-block;width:50%;height:50%;" },
{ elem: "div", id: "div2", style: "display:inline-block;width:50%;height:50%;" },
{ elem: "div", id: "div3", style: "display:inline-block;width:50%;height:50%;" },
{ elem: "div", id: "div4", style: "display:inline-block;width:50%;height:50%;" }
];

//Recorre la constante con los div y crea uno a uno con las propiedades asignadas en la constante
for (div of Divs) {
    // Crea la variable con el elemento que le hemos especificado en la constante
    let d = document.createElement(div.elem);
    //Asiganamos que los valores de id y style sean los mismo que los del div que estamos creando
    d.style = div.style;
    d.id = div.id;
    // Creamos directamente los div en el body
    document.body.appendChild(d);

    //Controlamos el evento
    d.addEventListener("mousemove", show);
}

//Función para ir mostrando dependiendo del div en el foco en el que encontremos el raton con el mouse evente 
function show(event) {

    const x = event.pageX;
    const y = event.pageY;
    const widthPage = window.innerWidth;
    const heightPage = window.innerHeight;

    //Creamos variables para cada uno
    let div1 = document.getElementById("div1");
    let div2 = document.getElementById("div2");
    let div3 = document.getElementById("div3");
    let div4 = document.getElementById("div4");

    // Los encendemos todos y apagamos en funcion del que no este seleccionado (Ver más abajo)
    div1.style.backgroundColor = "yellow";
    div2.style.backgroundColor = "red";
    div3.style.backgroundColor = "blue";
    div4.style.backgroundColor = "green";

    // Div superior - izquierdo: amarillo
    // Controlamos la posicion de cada div en la pantalla con lo que ocupa para poder encender o apagar los div dependiendo de donde se encuentre
    if ((x < (widthPage / 2)) && (y < (heightPage / 2))) {
        // Apago...
        div2.style.backgroundColor = "";
        div3.style.backgroundColor = "";
        div4.style.backgroundColor = "";
    }
    // Div superior - derecho: rojo
    else if ((x >= (widthPage / 2)) && (y < (heightPage / 2))) {
        // Apago...
        div1.style.backgroundColor = "";
        div3.style.backgroundColor = "";
        div4.style.backgroundColor = "";
    }
    // Div inferior - izquierdo: azul
    else if ((x < (widthPage / 2)) && (y >= (heightPage / 2))) {
        // Apago...
        div1.style.backgroundColor = "";
        div2.style.backgroundColor = "";
        div4.style.backgroundColor = "";
    }
    // Div inferior - derecho: verde
    else if ((x > (widthPage / 2)) && (y >= (heightPage / 2))) {
        // Apago...
        div1.style.backgroundColor = "";
        div2.style.backgroundColor = "";
        div3.style.backgroundColor = "";
    }
}




