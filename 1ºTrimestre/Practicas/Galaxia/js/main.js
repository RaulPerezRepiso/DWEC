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

// Onclick para crear el planeta
bIns.onclick = () => {
  empezarGalaxia();
};

let div2 = document.getElementById("div2");
div2.style.position = "relative";

// Array para guardar planetas y satelites
let arrayPlanetas = [];

// Creamos la lista para mostrarlo en el div de la izquierda
let lista = createNode("ul");
document.getElementById("div1").appendChild(lista);

//Funcion que recoge los datos para crear el planeta/satélite
function empezarGalaxia() {
  let planeta = createNode("div", nombre.value);
  planeta.style.textAlign = "center";
  planeta.style.lineHeight = diametro.value + "px";
  planeta.style.color = "white";
  planeta.style.width = diametro.value + "px";
  planeta.style.height = diametro.value + "px";
  planeta.style.position = "absolute";

  // Comprueba si el boton esta selecionado para añadirle un borde al satelite
  if (satel.checked) {
    planeta.style.border = "5px solid white";
  }

  let valorX = parseInt(eX.value) || 0;
  let posX = valorX;

  // Asignamos las coordedas que hemos recogido
  planeta.style.top = eY.value + "px";
  planeta.style.left = posX + "px";

  // Asignamos color y lo hacemos redondo
  planeta.style.backgroundColor = color.value;
  planeta.style.borderRadius = "50%";

  // Genera un numero aleatorio entroe 0 y 100
  let profundidad = Math.floor(Math.random() * 101);

  // Conviertimos la variable de la profundidad en un factor de escala entre 0.1 y 1.0
  let escala = 0.1 + (profundidad / 100) * 0.9;

  // Aplica la escala al tamaño visual del planeta con CSS transform
  planeta.style.transform = "scale(" + escala + ")";

  // Guardamos el planeta/satelite creado en el Array
  arrayPlanetas.push(planeta);

  // Si pulsamos en el planeta y no esta el primero en la lista cambiamos los valores con el primero
  planeta.onclick = () => cambiarValores(planeta);

  //Añadimos el planeta al div
  div2.appendChild(planeta);

  //Acualizamos la lista de nodos con los nombres
  actualizarLista();
}

// Reconstruir la lista cuando se intercambien valores
function actualizarLista() {
  lista.innerHTML = "";
  //Recorre el array planteas y crea li con cada uno y con el nombre
  arrayPlanetas.forEach((p) => {
    let li = createNode("li", p.textContent);

    // Asiganación de evento al li para que se cambien los valores
    li.onclick = () => cambiarValores(p);

    //Añadimos los li creados a la de ul creada anteriormente
    lista.appendChild(li);
  });
}

// Intercambio de coordenadas y profundidad
function cambiarValores(div) {
  // Siempre que el Array tenga más de una valor dejara hacerlo
  if (arrayPlanetas.length > 0) {
    let primero = arrayPlanetas[0];

    // Guardar valores del primero
    let x1 = primero.style.left;
    let y1 = primero.style.top;
    let s1 = primero.style.transform;
    let prof1 = primero.profundidad;

    // Guardar valores del clicado
    let x2 = div.style.left;
    let y2 = div.style.top;
    let s2 = div.style.transform;
    let prof2 = div.profundidad;

    // Intercambiar coordenadas y profundidad en pantalla
    primero.style.left = x2;
    primero.style.top = y2;
    primero.style.transform = s2;
    primero.profundidad = prof2;

    div.style.left = x1;
    div.style.top = y1;
    div.style.transform = s1;
    div.profundidad = prof1;

    // Intercambiar posiciones en el Array entre valores clicados | Busca la poscíon del planeta clicado
    let idx = arrayPlanetas.indexOf(div);
    //Comprueba que este
    if (idx > -1) {
      //Cambia los valores *(destructuring assigment)*
      [arrayPlanetas[0], arrayPlanetas[idx]] = [
        arrayPlanetas[idx],
        arrayPlanetas[0],
      ];
    }

    // Reconstruir lista con el nuevo orden
    actualizarLista();
  }
}
