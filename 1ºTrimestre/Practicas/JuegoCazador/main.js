let word = document.getElementById("word");
let palabra = document.getElementById("palabra");
let bMos = document.getElementById("bMos");
let bIns = document.getElementById("bIns");

let error;
let letra;
let letras;
let bLetra;
let contador;
let h3

let juego = true;
let intentos = 0;
let adivina = "";
let intervalo;
let arrayLetras = [];

let juegosGanados = [];

/**
 * Funcion para crear Nodos que nos servira para crear nodos al empezar el juego
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

/**
 * Al pulsar el botón se ejecuta la función si queremos mostrar la palabra
 */
bMos.onclick = () => {
  mostrarPalabra();
};

/**
 * Funcion que cambia el tipo del nodo de password a text y viceversa
 */
function mostrarPalabra() {
  if (word.type == "password") {
    word.type = "text";
    bMos.innerText = "Ocultar";
  } else {
    word.type = "password";
    bMos.innerText = "Mostrar";
  }
}

/**
 * Botón que válida que la palabra sea correcta que solo recoga letras nada de caracteres o números
 */
bIns.onclick = () => {
  validarPalabra();
};

function validarPalabra() {
  let valor = word.value;
  let val = /^[A-Za-z]+$/;

  // Incluye tildes y caracteres raros de letras
  // let val = "/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$";
  // Incluye espacios
  // let val = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (val.test(valor) && juego == true) {
    //Si la letra es valida empezamos el jeugo
    empezarJuego();
    juego = false;

    //Desahabilitamos los botones para que no nos den errores ni se puedan mostrar las palabras
    // bMos.disabled = true;
    // bIns.disabled = true;
    // word.disabled = true;
  } else {
    palabra.innerText = "Solo letras mayúsculas o minúsculas.";
  }
}

let tiempoRestante = 0;

/**
 * Función que crea los nodos necesarios para jugar
 * Da el tiempo en función de la longitud de la palabra y lo muestra en cuentra regresiva con un interval
 */
function empezarJuego() {
  // Crear campo de error
  error = createNode("h3");
  error.style.color = "red";
  document.body.appendChild(error);

  // Crear campo de contador
  contador = createNode("h4");
  document.body.appendChild(contador);

  // Crear input para letra
  letra = createNode("input");
  letra.maxLength = 1;
  document.body.appendChild(letra);

  // Crear botón de probar letra
  bLetra = createNode("button", "Probar Letra");
  bLetra.onclick = () => registraIntento();
  document.body.appendChild(bLetra);

  // Crear campo de letras incorrectas
  letras = createNode("h4");
  document.body.appendChild(letras);

  h3 = createNode("h3")
  document.body.appendChild(h3);


  // Preparar palabra
  palabra.innerText = "";
  word.placeholder = "Juego Comenzado";
  adivina = word.value;
  word.value = "";
  word.type = "text";

  // Inicializar array de guiones correctamente
  arrayLetras = Array(adivina.length).fill("-");
  palabra.innerText = arrayLetras.join(" ");

  //El número de intentos longitud palabra entre entre dos más uno 
  intentos = parseInt((adivina.length / 2)) + 1;

  // Tiempo proporcional a la longitud
  let tiempoTotal = (adivina.length * 10) / 3;
  contador.innerText = "Tiempo restante: " + tiempoTotal.toFixed(1) + " segundos";
  contador.style.color = "darkblue";


  // Intervalo regresivo
  intervalo = setInterval(() => {
    tiempoTotal--;
    contador.innerText = "Tiempo restante: " + tiempoTotal.toFixed(1) + " segundos";
    contador.style.color =
      contador.style.color === "blue" ? "darkblue" : "blue";
    tiempoRestante += 1;
    if (tiempoTotal <= 0.00) {
      clearInterval(intervalo);
      contador.style.color = "red";
      contador.innerText = "¡Tiempo agotado! La palabra era: " + adivina;
      palabra.innerText = adivina;
      bIns.disabled = true;
      letra.disabled = true;
      bLetra.disabled = true;
    }
  }, 1000);
}



/**
 * Registra intento y comprueba si la letra esta en la palabra o si es válida
 * @returns
 */
function registraIntento() {
  let intento = letra.value.toLowerCase();
  letra.value = "";

  // Comprueba que la letra sea válida
  if (!/^[a-zA-Z]$/.test(intento)) {
    error.innerText =
      "Introduce una Letra por intento (Solo caracteres válidos)";
    letra.focus();
    return;
  } else {
    error.innerText = "";
  }
  letra.focus();
  let acierto = false;

  // Recorre la palabra y sustituye guiones por la letra acertada
  for (let i = 0; i < adivina.length; i++) {
    if (adivina[i].toLowerCase() === intento && arrayLetras[i] === "-") {
      arrayLetras[i] = adivina[i];
      acierto = true;
    }
  }

  // Actualiza la palabra oculta
  palabra.innerText = arrayLetras.join(" ");

  let intent = 0;

  // Si no acierta, resta intentos y muestra la letra fallida en rojo con el número de intentos que le queda
  if (!acierto) {
    intentos--;
    intent += intentos
    letras.style.color = "red";
    letras.innerText +=
      "Letra incorrecta: " +
      intento +
      " " +
      intentos +
      " intentos restantes " +
      "\n";

  }
  let partidas = "";
  // Condiciones de fin de juego
  if (!arrayLetras.includes("-")) {
    partidas = "¡Has adivinado la palabra! " + "\"" + adivina + "\"" + "\nAcertado en " + tiempoRestante + " segundos.";
    contador.innerText = partidas;
    clearInterval(intervalo);
    letra.disabled = true;
    bLetra.disabled = true;
    juegosGanados.push(partidas);
    juego = true;
  } else if (intentos <= 0) {
    letras.style.color = "red";
    letras.innerText += "Intentos agotados\n";
    contador.style.color = "red";
    contador.innerText = "¡Has perdido! La palabra era: " + "\"" + adivina + "\"" + "\nNo acertado" + ", " + tiempoRestante + " segundos.";
    clearInterval(intervalo);
    palabra.innerText = adivina;
    letra.disabled = true;
    bLetra.disabled = true;
    juego = true;
  }

  for (let i = 1; i <= juegosGanados.length; i++) {
    h3.innerText = "Juego " + i + ": " + partidas;
  }

}





