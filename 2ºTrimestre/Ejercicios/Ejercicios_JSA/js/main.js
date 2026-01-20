let label = createNode("label", "Introduce un número entero: ");
let input = createNode("input");
let boton = createNode("button", "Generar");
input.type = "number";
let resultado = createNode("h3", "");
resultado.style.color = "purple"

document.body.appendChild(label);
document.body.appendChild(input);
document.body.appendChild(boton);
document.body.appendChild(resultado);

boton.onclick = function () {
    
    let valor = input.value;
    console.log(input.value);
    
    input.value = "";
    resultado.innerText = valor;
};


let myPromise = new Promise(function (resolve, reject) {
  // Ejecuto código asíncrono...
  setTimeout(function () {
    console.log("Ejecutando promesa...");

    // Solo permite que se le pase un dato
    reject(5);
  }, 2000);
})
  .then(function () {
    // Se ejecuta cuando la promesa ha acabado sin errores...
    console.log("Promesa ha acabado bien!");
  })
  .catch(function (err) {
    // Se va a ejecutar cuando la promesa ha acabdo con errores...
    console.log("Promesa ha acabado mal con valor: " + err);
  });

console.log("Sigo ejecutando el código fuera de la promesa...");

/**
 * Función para crear Nodos
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
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
  }

  return nodo;
}
