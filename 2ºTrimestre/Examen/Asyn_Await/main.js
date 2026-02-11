//Crea una función para devolver una promesa manualmente
function resolverDespuesDe2Segundos() {
  //Devolvemos una promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      //Simulamos una operación que tarda 2 segundos
      resolve("resuelta!");
    }, 2000);
  });
}

//Convierte la funcion en asincrona para poder usar el await
async function asyncCall() {
  console.log("Llamando…");

  // Pausa esta funcion 2 segundos hasta que se resuelva
  var result = await resolverDespuesDe2Segundos();

  console.log(result);
}

//Llamamos a la función
asyncCall();

//Vemo como el código se sigue ejecutando mientras carga la promesa
console.log("El código sigue ejecutándose...");

//-------------
// Más EJEMPLOS
//-------------
function getRandomNumber() {
  return new Promise((resolve, reject) => {
    const n = Math.random() * 10;
    if (n > 5) {
      resolve("Número OK");
    } else {
      reject("Error: número demasiado bajo");
    }
  });
}

async function probarNumero() {
  try {
    const resultado = await getRandomNumber();
    console.log("Éxito:", resultado);
  } catch (error) {
    console.log("Fallo:", error);
  }
}
probarNumero();

//--------------------------------
// Otra función para usar el async
//--------------------------------

// Simula una operación que tarda 2 segundos
function esperar2Segundos(nombre) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //Devuelve el nombre que le llega del input
      resolve("Hola " + nombre + ", tu petición ha sido procesada.");
    }, 2000);
  });
}

// Función asíncrona que usará await
async function procesarNombre() {
  // Sacamos el nombre por el id
  const input = document.getElementById("nombre");
  // Sacamos el valor del nombre
  const nombre = input.value;

  // Esperamos la promesa
  const mensaje = await esperar2Segundos(nombre);

  //Mandamos un log para ver que se ejecuta antes eso quela promesa
  console.log("Procesando... espera 2 segundos");

  // Mostramos el resultado
  console.log(mensaje);
}

// Evento del botónw
document.getElementById("btn").addEventListener("click", procesarNombre);

//-------------------------------------------------
// Simula una API que tarda 2 segundos en responder
//-------------------------------------------------
function consultarAPI(nombre) {
  return new Promise((resolve, reject) => {
    // Validación básica
    if (!nombre) {
      reject("Error: Debes escribir un nombre");
      return;
    }

    // Simulamos una llamada lenta
    setTimeout(() => {
      const datos = {
        nombre: nombre,
        edad: Math.floor(Math.random() * 10) + 18,
        ciudad: "Madrid",
      };

      resolve(datos);
    }, 2000);
  });
}

// Función asíncrona que usa await
async function procesar() {
  const nombre = document.getElementById("nombre").value;
  const salida = document.getElementById("resultado");

  // Mensaje de carga
  salida.innerText = "Consultando datos... espera 2 segundos";

  try {
    // Esperamos la "API"
    const datos = await consultarAPI(nombre);

    // Mostramos el resultado en pantalla
    salida.innerText = "Nombre: " + datos.nombre + " Edad: " +datos.edad+ " Ciudad: " +datos.ciudad;
  } catch (error) {
    // Mostramos el error en pantalla
    salida.innerText = error;
  }
}

// Evento del botón
document.getElementById("btn").addEventListener("click", procesar);
