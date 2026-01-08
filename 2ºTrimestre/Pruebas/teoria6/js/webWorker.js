const cantidad = 100;

console.log("WebWorker ON");

// Para llamar a la funcion y que se ejecute cuando se llame al WebWorker
sqrtCantidad();

function sqrtCantidad() {
    let myArray = new Array();
    for (let i = 0; i < cantidad; i++)
        myArray.push(i * i);
    postMessage(myArray);
}