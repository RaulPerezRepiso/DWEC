// Array con las comidas del menú principal:
var comidas = new Array();
var entrantes = [
    "Turrón salada de queso y frutos secos",
    "Piruletas crujientes de parmesano",
    "Hummus con remolacha",
    "Mejillones a la cerveza con bacon",
    "Croquetas de atún",
    "Quesadilla de chorizo criollo con aguacate",
    "Ensalada de endivias, surimi y salsa roquefort",
    "Guacamole",
    "Pan casero con aceite de oliva y sal negra en escamas",
    "Verduras rellenas de arroz"
];

comidas.push(entrantes);

var comidaCasera = [
    "Sopa de pollo",
    "Sopa de verdura",
    "Crema de calabaza",
    "Arroz con pollo",
    "Paella de mariscos",
    "Arroz caldoso de pescado",
    "Pollo al horno",
    "Conejo al ajillo",
    "Potaje de lentejas o abichuelas",
    "Pescado al horno"
];

comidas.push(comidaCasera);

var comidaOriental = [
    "Ramen",
    "Rollitos de primavera vegetales",
    "Atún con arroz",
    "Wok de verduras y fideos chinos",
    "Arroz al estilo oriental",
    "Nishime de verduras",
    "Solomillo de cerdo agridulce",
    "Noodles de arroz con gambas",
    "Rollitos de alga nori con con verduras en tempura"
];

comidas.push(comidaOriental);

var mediterranea = [
    "Judías verdes estofadas",
    "Gazpacho",
    "Magro de cerdo con champiñón",
    "Salteado de garbanzos con cebolla, guisantes y tomate",
    "Lasaña de espinacas",
    "Berenjena al horno",
    "Dorada a la plancha",
    "Pizza mediterránea",
    "Tortilla de pimiento y cebolla"
];
// var entrantes = [

//     { entrante: "Turrón salada de queso y frutos secos" },
//     { entrante: "Piruletas crujientes de parmesano" },
//     { entrante: "Hummus con remolacha" },
//     { entrante: "Mejillones a la cerveza con bacon" },
//     { entrante: "Croquetas de atún" },
//     { entrante: "Quesadilla de chorizo criollo con aguacate" },
//     { entrante: "Ensalada de endivias, surimi y salsa roquefort" },
//     { entrante: "Guacamole" },
//     { entrante: "Pan casero con aceite de oliva y sal negra en escamas" },
//     { entrante: "Verduras rellenas de arroz" }
// ];

// comidas.push(entrantes);

// var comidaCasera = [
//     { casera: "Sopa de pollo" },
//     { casera: "Sopa de verdura" },
//     { casera: "Crema de calabaza" },
//     { casera: "Arroz con pollo" },
//     { casera: "Paella de mariscos" },
//     { casera: "Arroz caldoso de pescado" },
//     { casera: "Pollo al horno" },
//     { casera: "Conejo al ajillo" },
//     { casera: "Potaje de lentejas o abichuelas" },
//     { casera: "Pescado al horno" }
// ];

// comidas.push(comidaCasera);

// var comidaOriental = [
//     { oriental: "Ramen" },
//     { oriental: "Rollitos de primavera vegetales" },
//     { oriental: "Atún con arroz" },
//     { oriental: "Wok de verduras y fideos chinos" },
//     { oriental: "Arroz al estilo oriental" },
//     { oriental: "Nishime de verduras" },
//     { oriental: "Solomillo de cerdo agridulce" },
//     { oriental: "Noodles de arroz con gambas" },
//     { oriental: "Rollitos de alga nori con con verduras en tempura" }
// ];

// comidas.push(comidaOriental);

// var mediterranea = [
//     { medi: "Judías verdes estofadas" },
//     { medi: "Gazpacho" },
//     { medi: "Magro de cerdo con champiñón" },
//     { medi: "Salteado de garbanzos con cebolla, guisantes y tomate" },
//     { medi: "Lasaña de espinacas" },
//     { medi: "Berenjena al horno" },
//     { medi: "Dorada a la plancha" },
//     { medi: "Pizza mediterránea" },
//     { medi: "Tortilla de pimiento y cebolla" }
// ];

comidas.push(mediterranea);

//Variables de uso globol
var ventana = null;
let h4 = document.getElementById("tipoComida");
let h3 = document.getElementById("comidaSeleccionada");
var enlaces = document.getElementsByTagName("a");

let img = document.getElementsByTagName("div")[0];


console.log(enlaces);
console.log(enlaces[2]);


//Control del botón registro
let registro = document.getElementById("registro");
registro.onclick = () => {

    // Obtener las dimensiones de la ventana actual
    let anchoActual = window.innerWidth;

    // Calcular la posición de la nueva ventana a partir de la mitad de ancho y 100 desde arriba
    let posicionX = anchoActual / 2;
    let posicionY = 100;

    // Abrir una nueva ventana posicionada
    const constantes = `width=400,height=400,left=${posicionX},top=${posicionY}`;
    ventana = window.open("registro.html", "Registro", constantes);

}

comidaEnlaces();

function comidaEnlaces() {
    enlaces[0].onclick = () => {
        h3.style.display = "block";

        h4.innerText = "Entrantes";
        for (let index = 0; index < entrantes.length; index++) {
            h3.innerText = entrantes;
        }

        console.log("1");
    }

    enlaces[1].onclick = () => {
        h3.style.display = "block";

        h4.innerText = "Comida Casera";
        for (let index = 0; index < comidaCasera.length; index++) {
            h3.innerText = comidaCasera;
        }

        console.log("1");
    }

    enlaces[2].onclick = () => {
        h3.style.display = "block";

        h4.innerText = "Comida Oriental";
        for (let index = 0; index < comidaOriental.length; index++) {
            h3.innerText = comidaOriental;
        }

        console.log("1");
    }

    enlaces[3].onclick = () => {
        h3.style.display = "block";

        h4.innerText = "Comida Mediterranea";
        for (let index = 0; index < mediterranea.length; index++) {
            h3.innerText = mediterranea;
        }

        console.log("1");
    }
}

let formulario = document.getElementById("cuestionario");
let aside = document.getElementsByTagName("aside")[0];

// nodosCliente();
nodosChef();
function nodosCliente() {
    //Mostramos el formulario
    aside.style.display = "block";

    let lCom = createNode("label", "Elige tú comida preferida de la siguiente lista: ");

    let select = createNode("select");
    select.id = "select";

    let op1 = createNode("option", "Ensalda");
    let op2 = createNode("option", "Hamburguesa");
    let op3 = createNode("option", "Pasta");
    let op4 = createNode("option", "Pescado");
    let op5 = createNode("option", "Sopa");
    let op6 = createNode("option", "Crema de Verdeduras");
    let op7 = createNode("option", "Arroz");
    let op8 = createNode("option", "Marisco");
    let op9 = createNode("option", "Guisos");
    let op10 = createNode("option", "Legumbres");

    select.appendChild(op1);
    select.appendChild(op2);
    select.appendChild(op3);
    select.appendChild(op4);
    select.appendChild(op5);
    select.appendChild(op6);
    select.appendChild(op7);
    select.appendChild(op8);
    select.appendChild(op9);
    select.appendChild(op10);

    formulario.appendChild(lCom);
    formulario.appendChild(select);

    mostrarAlert();

}

function nodosChef() {
    //Mostramos el formulario
    aside.style.display = "block";
    let lCom = createNode("label", "¿Como definirías tu establecimiento? ");

    let select = createNode("select");
    select.id = "select";
    let op1 = createNode("option", "Moderno");
    let op2 = createNode("option", "Tradicional");
    let op3 = createNode("option", "Vanguardista");
    let op4 = createNode("option", "Familiar");
    let op5 = createNode("option", "Gourmet");

    select.appendChild(op1);
    select.appendChild(op2);
    select.appendChild(op3);
    select.appendChild(op4);
    select.appendChild(op5);

    formulario.appendChild(lCom);
    formulario.appendChild(select);

    mostrarAlert();

}


function mostrarAlert() {

    let select = document.getElementById("select");

    if (select.selectedIndex) {
        // alert("Enviados datos: " +select.selectedIndex);
    }

}

