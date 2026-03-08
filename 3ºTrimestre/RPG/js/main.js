// Importamos las clases
import { Personaje } from "./Personaje.js";
import { Guerrero } from "./Guerrero.js";
import { Mago } from "./Mago.js";

// Inpunts dinámicos
const claseSelect = document.getElementById("clase");
const inputMana = document.getElementById("input-mana");
const inputEscudo = document.getElementById("input-escudo");

//Función para actucalizar el valor de las cajas de cada personaje
function actualizarInputs() {
  if (claseSelect.value === "Mago") {
    inputMana.style.display = "block";
    inputEscudo.style.display = "none";
  } else {
    inputMana.style.display = "none";
    inputEscudo.style.display = "block";
  }
}

//Cada vez que cambie algo actualiza
claseSelect.addEventListener("change", actualizarInputs);
actualizarInputs(); // ejecutar al cargar

// Varaibles de uso global
const personajes = [];
let turno = 0;

const form = document.getElementById("form-crear");
const arena = document.getElementById("arena");
const log = document.getElementById("log");

// Crear los personajes con los datos del form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fuerza = parseInt(document.getElementById("fuerza").value);
  const clase = document.getElementById("clase").value;

  const manaInput = document.getElementById("mana").value;
  const escudoInput = document.getElementById("escudo").value;

  let personaje;

  //Dependiendo de la clase selecionada en el select crear un Guerrero o un Mago con sus varibales
  if (clase === "Guerrero") {
    const escudo = escudoInput === "" ? undefined : parseInt(escudoInput);
    personaje = new Guerrero(nombre, fuerza, escudo);
  } else {
    const mana = manaInput === "" ? undefined : parseInt(manaInput);
    personaje = new Mago(nombre, fuerza, mana);
  }

  //Añadir al array de personaje el personaje para cargar en el DOM
  personajes.push(personaje);
  //Creamos la tarjeta
  crearTarjeta(personaje, personajes.length - 1);
  //Actualizamos los botones para controlar el ataque de los personajes
  actualizarBotones();
});

// Crear la tarjeta del personaje en el DOM
function crearTarjeta(personaje, index) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  //Creamos la tarjeta dependiendo de si es un Guerrero o un Mago
  tarjeta.innerHTML =
    "<h3>" +
    personaje.nombre +
    "</h3>" +
    "<p>Clase: " +
    personaje.constructor.name +
    "</p>" +
    "<progress id='vida-" +
    index +
    "' max='100' value='" +
    personaje.vida +
    "'></progress>" +
    "<p><span id='vida-num-" +
    index +
    "'>" +
    personaje.vida +
    "</span> HP</p>" +
    (personaje instanceof Mago
      ? "<p>Maná: <span id='mana-" +
        index +
        "'>" +
        personaje.mana +
        "</span> / 5</p>"
      : "") +
    (personaje instanceof Guerrero
      ? "<p>Escudo: <span id='escudo-" +
        index +
        "'>" +
        personaje.armadura +
        "</span></p>"
      : "") +
    "<button id='atacar-" +
    index +
    "'>Atacar</button>";

  //Añadimos al body la tarjeta del personaje
  arena.appendChild(tarjeta);

  // Cuando el usuario pulse el botón Atacar del personaje X, ejecuta el ataque de ese personaje al siguiente personaje en orden
  document
    .getElementById("atacar-" + index)
    .addEventListener("click", function () {
      atacarTurno(index);
    });
}

// Organizar los ataques por turnos
function atacarTurno(indiceAtacante) {
  if (indiceAtacante !== turno) return;

  const atacante = personajes[indiceAtacante];
  if (!atacante.estaVivo()) return;

  //Busca el siguiente objetivo vivo
  const indiceObjetivo = obtenerSiguienteVivo(indiceAtacante);
  //Sino lo hay salta en el log un mensaje ed que no quedan enemigos a los que atacar
  if (indiceObjetivo === null) {
    log.innerHTML +=
      "No quedan enemigos vivos para " + atacante.nombre + "<br>";
    return;
  }

  const objetivo = personajes[indiceObjetivo];

  const vidaAntes = objetivo.vida;
  atacante.atacar(objetivo);
  const vidaDespues = objetivo.vida;

  //Controlar la vida para que cambie en el DOM
  if (vidaAntes === vidaDespues) {
    log.innerHTML +=
      atacante.nombre + " falla el ataque contra " + objetivo.nombre + "<br>";
  } else {
    const dano = vidaAntes - vidaDespues;
    log.innerHTML +=
      atacante.nombre +
      " ataca a " +
      objetivo.nombre +
      " y le hace " +
      dano +
      " de daño <br>";
  }

  actualizarVida();
  actualizarMana();

  //Mostrar mensaje de que ha muerto si la vida llega a 0
  if (!objetivo.estaVivo()) {
    marcarMuerto(indiceObjetivo);
    log.innerHTML += objetivo.nombre + " ha muerto. <br>";
  }

  avanzarTurno();
}

// Función para controlar qu el muerto no pueda atacar
function avanzarTurno() {
  const total = personajes.length;
  let intentos = 0;

  do {
    turno = (turno + 1) % total;
    intentos++;
  } while (!personajes[turno].estaVivo() && intentos <= total);

  actualizarBotones();
}

// Cambia de objetivo cuando muere al que estaba atacando
function obtenerSiguienteVivo(desdeIndex) {
  const total = personajes.length;
  let i = (desdeIndex + 1) % total;

  while (i !== desdeIndex) {
    if (personajes[i].estaVivo()) return i;
    i = (i + 1) % total;
  }

  return null;
}

// Actualizar al vida en el DOM
function actualizarVida() {
  personajes.forEach((p, i) => {
    const barra = document.getElementById(`vida-${i}`);
    const numero = document.getElementById(`vida-num-${i}`);

    barra.value = p.vida;
    numero.textContent = p.vida;
  });
}

// Desactivar los botones dependiendo del turno
function actualizarBotones() {
  personajes.forEach((p, i) => {
    const btn = document.getElementById(`atacar-${i}`);
    if (!btn) return;

    btn.disabled = !p.estaVivo() || i !== turno;
  });
}

// Editar el estilo de la tarjeta para cuando muere el persoanje y desabilitar botón de ataque
function marcarMuerto(index) {
  const tarjeta = arena.children[index];
  tarjeta.classList.add("muerto");

  const btn = document.getElementById("atacar-" + index);
  if (btn) btn.disabled = true;
}

// Actualiza mana en el DOM cada vez que actua el interval de abajo
function actualizarMana() {
  personajes.forEach((p, i) => {
    if (p instanceof Mago) {
      const manaSpan = document.getElementById("mana-" + i);
      if (manaSpan) manaSpan.textContent = p.mana;
    }
  });
}

//Recargandolo cada 2000 segundos
setInterval(() => {
  personajes.forEach((p) => {
    if (p instanceof Mago) {
      p.recuperarMana();
    }
  });

  actualizarMana();
}, 20000);
