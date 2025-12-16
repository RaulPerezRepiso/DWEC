let info = document.getElementById("info");

// Declaración de Promise (Se encarga de aceptar una función anónima). 
// Resolve -> Manda si encuentra la ruta independientemente de que el dato sea erroneo
// Reject -> Error al no encontrar o mandar la ruta.

//PRIMERA FORMA DE DECLARAR PROMISE
/* let myPromise = new Promise(function (resolve, reject) {

    // Ejecuto código asíncrono...


}); */


// Declarado con arrow
/* let myPromise3 = new Promise((resolve, reject) => {}); */

//SEGUNDA FORMA DE DECLARAR PROMISE
/* let myPromise2;
myPromise2.then(function () {
    // Se ejecuta cuando la promesa ha acabado sin errores...

}, function () {
    // Se va a ejecutar cuando la promesa ha acabdo con errores...

}) */

console.log("Iniciando...")

//TERCERA FORMA DE DECLARAR PROMISE
let myPromise = new Promise(function (resolve, reject) {
    // Ejecuto código asíncrono...
    setTimeout(function () {
        console.log("Ejecutando promesa...");

        // Solo permite que se le pase un dato
        reject(5);
    }, 2000)
})
    .then(function () {
        // Se ejecuta cuando la promesa ha acabado sin errores...
        console.log("Promesa ha acabado bien!");
    })
    .catch(function (err) {
        // Se va a ejecutar cuando la promesa ha acabdo con errores...
        console.log("Promesa ha acabado mal con valor: "+ err);
    });

console.log("Sigo ejecutando el código fuera de la promesa...");



