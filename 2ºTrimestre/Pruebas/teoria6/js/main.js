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

// console.log("Iniciando...")

// //TERCERA FORMA DE DECLARAR PROMISE
// let myPromise = new Promise(function (resolve, reject) {
//     // Ejecuto código asíncrono...
//     setTimeout(function () {
//         console.log("Ejecutando promesa...");

//         // Solo permite que se le pase un dato
//         reject(5);
//     }, 2000)
// })
//     .then(function () {
//         // Se ejecuta cuando la promesa ha acabado sin errores...
//         console.log("Promesa ha acabado bien!");
//     })
//     .catch(function (err) {
//         // Se va a ejecutar cuando la promesa ha acabdo con errores...
//         console.log("Promesa ha acabado mal con valor: "+ err);
//     });

// console.log("Sigo ejecutando el código fuera de la promesa...");


/**EJEMPLO DOS */

//Si el dato metido es mayor de 100--> fallo // si el dato es menor 100--> devolver bien 
//Podria haber metido el onclick dentro como tenia hecho, porque el onclick es Asíncrono 
// let input = document.getElementById("num");
// let boton = document.getElementById("boton");

// boton.onclick=function(){
// let myPromise3 = new Promise(function(resolve,reject) {

//         if(input.value>100){
//             throw Error("Cantidad mayor de 100");
//         }else{
//         resolve(input.value)
//         }


// }).then(function(resultado){

//         info.innerText="Cantidad"+resultado;

// }).catch(function (error) {

//     info.innerHTML="<span style='color:red;'>"+error+"</span>";

// });

// }


/**VAMOS A PROBAR VARIOS TIPOS DE PROMESAS  */
// let myPromise4 = new Array();

// myPromise4.push(Promise.resolve(true));
// myPromise4.push(Promise.resolve(5));
// myPromise4.push(Promise.resolve("pepe"));
// myPromise4.push(Promise.resolve(45));
// myPromise4.push(Promise.reject(-1));
// myPromise4.push(Promise.reject(false));

// //podemos ponerle a Promise.all(myPromise4) el .then y conectarlo directamente

// //el punto all funciona si todas las promesas del array son correctas
// let resultados = Promise.all(myPromise4);  

// resultados.then(function(okvalue){
//     info.innerHTML=okvalue;

// }).catch(function(err){
//         info.innerHTML=err;
// })


//ANY-->la primera promesa que se resuelva correctamente.
// let myPromise5 = new Array();

// myPromise5.push(Promise.reject(true));
// myPromise5.push(Promise.reject(5));
// myPromise5.push(Promise.reject("pepe"));
// myPromise5.push(Promise.reject(45));
// myPromise5.push(Promise.reject(-1));
// myPromise5.push(Promise.reject(false));


// let resultados2 = Promise.any(myPromise5);  

// resultados2.then(function(okvalue){
//     info.innerHTML=okvalue;

// }).catch(function(err){
//         info.innerHTML=err;
// })

//RACE -->devolver el resultado de la primera promesa que termine, sea éxito o error.
// let myPromise5 = new Array();

// myPromise5.push(Promise.reject(true));
// myPromise5.push(Promise.resolve(5));
// myPromise5.push(Promise.reject("pepe"));
// myPromise5.push(Promise.resolve(45));
// myPromise5.push(Promise.reject(-1));
// myPromise5.push(Promise.resolve(false));


// let resultados2 = Promise.race(myPromise5);  

// resultados2.then(function(okvalue){
//     info.innerHTML=okvalue;

// }).catch(function(err){
//         info.innerHTML=err;
// })

//ALLSETTLED -->esperar a que todas las promesas terminen, sin importar si se cumplen o fallan.
// let myPromise5 = new Array();

// myPromise5.push(Promise.reject(true));
// myPromise5.push(Promise.resolve(5));
// myPromise5.push(Promise.reject("pepe"));
// myPromise5.push(Promise.resolve(45));
// myPromise5.push(Promise.reject(-1));
// myPromise5.push(Promise.resolve(false));


// let resultados2 = Promise.allSettled(myPromise5);  

// resultados2.then(function(okvalue){
//     info.innerHTML=okvalue;

// }).catch(function(err){
//         info.innerHTML=err;
// })

// let result = helloWorld();
// console.log(result);

// result.then(function (val) {
//     info.innerText = "Valor obtenido de la promesa: " + val;
// }).catch(function (err) {
//     info.innerTextm = "Error: " + err;
// })


// /*************************************************/
// // Declaración de funcion asincrona por nomenclatura
// async function helloWorld() {
//     return "Hello!!";
// }

// // Función que llamamos en el await
// function resolverDespuesDe2Segundos() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve("resuelta!");
//         }, 2000);
//     });
// }

// El Await lo que hace es esperar a que le llegue e dato aunque ya se este ejecuntando la función
// Sino le ponemos el await y estemos esperando un valor no se resolvera porque se queda pendiente el valor de esa variable
// async function asyncCall() {
//     console.log("Llamando…");
//     var result = await resolverDespuesDe2Segundos();
//     console.log(result); // Salida esperada: “resuelta!”
// }
// asyncCall();
// console.log("El código sigue ejecutándose...");

// //Otro ejemplo:
// const count = 100;
// function promiseSqrt(value) {
//     return new Promise(function (resolve, reject) {
//         console.log('START execution with value = ' + value);
//         setTimeout(function () {
//             resolve({ value: value, result: value * value });
//         }, 1500);
//     });
// }

// async function run() {
//     for (let n = 0; n <= 9; n++) {
//         // Al quitarle el await se ejecutara antes que la promise por lo que no tendra valores validos
//         var obj = await promiseSqrt(n);
//         console.log('END execution with value = ' + obj.value + ' and result = ' +
//             obj.result);
//     }
// }

// //Promesa que espera ejecutarse por el await
// let myPromise = run();
// console.log(myPromise);

// // Probamos que el código sigue ejecutándose mientras la promesa está pendiente:
// for (let i = 0; i < count; i++) {
//     console.log("Value of i = " + i);
// }


//Ejemplo práctico con promesa para que busque un string en un texto que demos y hasta que no lo encuentre no salta la promise
// let textToFind = "daw";

// document.getElementById("send").addEventListener("click", function () {
//     info.innerHTML = "";
//     info.innerHTML += "Empezando la búsqueda...<br>";
//     let result = findText();

//     result.then(function (val) {
//         info.innerHTML += "Encontrado " + val + " en el texto";
//     }).catch(function (err) {
//         info.innerHTML += "Error en la búsqueda!!";
//     })
// })

// async function findText() {
//     // Puede funcionar sin el await por la llamada
//     let found = await findInText();
//     info.innerHTML += "La búsqueda ha terminado ...<br>";
//     return found;
// }

// function findInText() {
//     info.innerHTML += "Buscando " + textToFind + " en el texto....<br>";
//     let texto = document.getElementById("texto").value;

//     if (texto === "") return false;

//     return texto.match(textToFind);
// }

// Simplemente comprueba si el navegador es apto para su uso o no
if (typeof (Worker) !== "undefined") {
    // Yes! Web worker support!
    // Some code.....
    console.log("Soporta el funcionamiento de Web Worker")
    let myWorker = new Worker("js/webWorker.js");

    myWorker.addEventListener("message", function (event) {
        info.innerHTML = event.data;
        myWorker.terminate();
        myWorker = undefined;
    })
} else {
    // Sorry! No Web Worker support..
    console.log("No soporta el web worker")
}

console.log("Código sigue ejecutándose...");
