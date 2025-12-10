import { Tarea } from "./Tarea.js";

var ventanaAux = null;
var main = document.getElementsByTagName("main")[0];
var aside = document.getElementsByTagName("aside")[0];

var botonNueva = document.getElementById("creaTarea");
var tabla = document.getElementsByTagName("table")[0];
var bModificar = document.getElementsByClassName("btn btn-secondary");
var bElminar = document.getElementsByClassName("btn btn-danger");
var tbody = document.getElementsByTagName("tbody")[0];

var task = document.getElementById("tasks-section");
let arrayEliminar = Array.from(bElminar);
let arrayEditar = Array.from(bModificar);

//No he encontrado manera mejor de que se me actualice el array de botones para que cuando añada una tarea nueva tambien me lo coja el evento onclick
actualizarEvento();



window.onload = function () {
  // Obtener las dimensiones de la ventana actual
  let anchoActual = window.innerWidth;
  let altoActual = window.innerHeight;

  // Calcular la posición de la nueva ventana
  let posicionX = anchoActual - 200;
  let posicionY = altoActual - 200;

  // Abrir una nueva ventana posicionada
  const windowFeatures = `width=400,height=600,menubar=yes,left=${posicionX},top=${posicionY}`;
  ventanaAux = window.open("src/vSec.html", "blanck", windowFeatures);

  if (ventanaAux != null) {
    main.style.visibility = "hidden";
    aside.style.opacity = "50%";
  }
};

//Evento para crear nueva tarea
botonNueva.onclick = function () {
  borrarCampos();
  insertarFormulario();
  let validar = document.getElementById("validar");
  validar.onclick = function (event) {
    let errores = 0;
    let nombre = document.getElementById("nombre");
    let descripcion = document.getElementById("descripcion");
    let prioridad = document.getElementById("prioridad");
    let responsable = document.getElementById("responsable");
    let fecha = document.getElementById("fecha");
    let estado = document.getElementById("estado");
    event.preventDefault();

    if (
      nombre.value == "" ||
      prioridad.value == "" ||
      fecha.value == "" ||
      descripcion.value == ""
    ) {
      alert("No puede haber ningún campo vacio");
      errores++;
    }
    if (parseInt(prioridad.value) < 0 || parseInt(prioridad.value) > 10) {
      errores++;
      alert("La prioridad debe estar entre 1 y 10");
    }
    if (errores == 0) {
      let tarea = new Tarea(
        nombre.value,
        descripcion.value,
        prioridad.value,
        responsable.options[responsable.selectedIndex].text,
        fecha.value,
        estado.options[responsable.selectedIndex].text
      );
      crearFilaTarea(
        tarea.nombre,
        tarea.descripcion,
        tarea.prioridad,
        tarea.responsable,
        tarea.fecha,
        tarea.estado
      );
      borrarCampos();
      //Actualizo el array de los botones con las tareas nuevas
      bModificar = document.getElementsByClassName("btn btn-secondary");
      bElminar = document.getElementsByClassName("btn btn-danger");
      arrayEditar = bModificar;
      arrayEliminar = bElminar;
      actualizarEvento();
    }
  };
};

//eventos de modificar y eleminar
function actualizarEvento() {
  document.querySelectorAll(".btn.btn-danger").forEach((boton) => {
    boton.onclick = function (event) {
      this.parentNode.parentElement.remove();
    };
  });
  document.querySelectorAll(".btn.btn-secondary").forEach((boton) => {
    boton.onclick = function (event) {
      borrarCampos();
      event.preventDefault();
      let fila = this.parentNode.parentElement;
      console.log(fila);
      insertarFormulario();
      validar.onclick = function (event) {
        let errores = 0;
        let nombre = document.getElementById("nombre");
        let descripcion = document.getElementById("descripcion");
        let prioridad = document.getElementById("prioridad");
        let responsable = document.getElementById("responsable");
        let fecha = document.getElementById("fecha");
        let estado = document.getElementById("estado");
        event.preventDefault();

        if (
          nombre.value == "" ||
          prioridad.value == "" ||
          fecha.value == "" ||
          descripcion.value == ""
        ) {
          alert("No puede haber ningún campo vacio");
          errores++;
        }
        if (parseInt(prioridad.value) < 0 || parseInt(prioridad.value) > 10) {
          errores++;
          alert("La prioridad debe estar entre 1 y 10");
        }
        if (errores == 0) {
          let tarea = new Tarea(
            nombre.value,
            descripcion.value,
            prioridad.value,
            responsable.options[responsable.selectedIndex].text,
            fecha.value,
            estado.options[responsable.selectedIndex].text
          );

          fila.children[0].innerHTML = tarea.nombre;
          fila.children[1].innerHTML = tarea.descripcion;
          fila.children[2].innerHTML = tarea.prioridad;
          fila.children[3].innerHTML = tarea.responsable;
          fila.children[4].innerHTML = tarea.fecha;
          fila.children[5].innerHTML = tarea.estado;
          borrarCampos();
        }
      };
    };
  });
}


//Función para insertar el formulari
function insertarFormulario() {
  let form = crearNodo("form");
  let inputNombre = crearInput("text");
  inputNombre.setAttribute("id", "nombre");
  inputNombre.setAttribute("placeholder", "Nombre de la tarea");
  form.appendChild(inputNombre);
  form.appendChild(crearNodo("br"));
  let ta = crearNodo("textarea");
  ta.setAttribute("rows", 10);
  ta.setAttribute("cols", 40);
  ta.setAttribute("id", "descripcion");
  form.appendChild(ta);
  form.appendChild(crearNodo("br"));
  let inputPrioridad = crearInput("number");
  inputPrioridad.setAttribute("placeholder", "Prioridad de la tarea");
  inputPrioridad.setAttribute("step", 1);
  inputPrioridad.setAttribute("min", 1);
  inputPrioridad.setAttribute("max", 10);
  inputPrioridad.setAttribute("id", "prioridad");
  inputPrioridad.style.width = "200px";
  form.appendChild(inputPrioridad);
  form.appendChild(crearNodo("br"));
  let select = document.createElement("select");
  select.setAttribute("id", "responsable");
  select.appendChild(crearOption("Proyect Manager 1"));
  select.appendChild(crearOption("Proyect manager 2"));
  select.appendChild(crearOption("Proyect manager 3"));
  form.appendChild(select);
  form.appendChild(crearNodo("br"));
  let fecha = crearInput("date");
  fecha.setAttribute("id", "fecha");
  form.appendChild(fecha);
  form.appendChild(crearNodo("br"));
  let estado = document.createElement("select");
  estado.setAttribute("id", "estado");
  estado.appendChild(crearOption("No iniciada"));
  estado.appendChild(crearOption("En progreso"));
  estado.appendChild(crearOption("Finalizada"));
  form.appendChild(estado);
  form.appendChild(crearNodo("br"));
  let boton = crearNodo("button", "validar");
  boton.setAttribute("id", "validar");
  form.appendChild(boton);
  task.insertBefore(form, tabla);
}


//Funcion para borrar el formulario
function borrarCampos() {
  // Selecciona la sección sCliente
  var seccion = document.querySelectorAll("form");
  console.log(seccion);
  // Elimina cada sección con la clase sCliente
  seccion.forEach(function (sc) {
    sc.remove();
  });
}

//Funcion para crear una fila nueva con la tarea
function crearFilaTarea(
  nombre,
  descripcion,
  prioridad,
  responsable,
  fecha,
  estado,
  acciones
) {
  let fila = crearNodo("tr");
  let columna = crearNodo("td", nombre);
  fila.appendChild(columna);
  columna = crearNodo("td", descripcion);
  fila.appendChild(columna);
  columna = crearNodo("td", prioridad);
  fila.appendChild(columna);
  columna = crearNodo("td", responsable);
  fila.appendChild(columna);
  columna = crearNodo("td", fecha);
  fila.appendChild(columna);
  columna = crearNodo("td", estado);
  fila.appendChild(columna);
  columna = crearNodo("td");
  columna.appendChild(crearBotonEditar());
  columna.appendChild(crearBotonEliminar());
  fila.appendChild(columna);
  tbody.appendChild(fila);
}


//Funciones para crear botones
function crearBotonEditar() {
  let b1 = crearNodo("button", "Editar");
  b1.setAttribute("class", "btn btn-secondary");
  return b1;
}
function crearBotonEliminar() {
  let b2 = crearNodo("button", "Eliminar");
  b2.setAttribute("class", "btn btn-danger");
  return b2;
}

/**
 *
 * @description Crea un nodo con su nodo hijo incluido
 * @param {*} n
 * @param {*} h
 * @returns
 */
function crearNodo(n, h) {
  let nodo = document.createElement(n);

  if (h) {
    let hijo = document.createTextNode(h);
    nodo.appendChild(hijo);
    return nodo;
  }
  return nodo;
}

//---------- Funcion para crear un input de un tipo determinado
function crearInput(tipo) {
  let input = document.createElement("input");

  input.setAttribute("type", tipo);

  return input;
}

//----------Función para crear una opción en un select
function crearOption(texto, value) {
  let option = document.createElement("option");

  option.appendChild(document.createTextNode(texto));

  option.setAttribute("value", value);
  return option;
}

//---------- Funcion para crear un label
function crearLabel(texto) {
  let label = document.createElement("label");

  label.appendChild(document.createTextNode(texto));

  return label;
}
