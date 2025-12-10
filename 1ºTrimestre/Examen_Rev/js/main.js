let ventana = null;

//Abrimos la ventana -> Tambien podemos hacer si da muchos errores window.onload
// No me funciona el document.body.onload (REVISAR EN CASA)
window.onload = function () {
  crearNodos();
  // Ruta, Nombre, Tamaño|Posición
  ventana = window.open(
    "registro.html",
    "Registro",
    "width=500,height=400,top=100,left=100"
  );

  //Validamos los campos de la ventana como nos pide en el enunciado
  ventana.onload = () => {
    let ePass = createNode("p", "Campo Password esta vacío");
    ePass.style.color = "red";
    ventana.document.body.appendChild(ePass);
    ePass.style.display = "none";

    let eUsu = createNode("p", "Campo Usuario esta vacío");
    eUsu.style.color = "red";
    ventana.document.body.appendChild(eUsu);
    eUsu.style.display = "none";

    let eCarg = createNode("p", "Usuario no valido");
    eCarg.style.color = "red";
    ventana.document.body.appendChild(eCarg);
    eCarg.style.display = "none";

    ventana.document.getElementsByTagName("input")[2].onclick = () => {
      let valido = true;

      let pass = ventana.document.getElementsByTagName("input")[1];
      let usu = ventana.document.getElementsByTagName("input")[0];

      //Si los campos no son validos mostraremos el input con un borde de color rojo
      if (usu.value === "") {
        usu.style.border = "3px solid red";
        valido = false;
        eUsu.style.display = "inherit";
      } else {
        usu.style.border = "1px solid black";
        eUsu.innerText = "";
      }

      if (pass.value === "") {
        pass.style.border = "3px solid red";
        valido = false;
        ePass.style.display = "inherit";
      } else {
        pass.style.border = "1px solid black";
        ePass.innerText = "";
      }

      if (!valido) return;

      //Cogemos el nombre de los usuarios validos en un variable
      let usuValido = usu.value === "encargado" || usu.value === "empleado";

      if (!usuValido) {
        eCarg.style.display = "inherit";
        return;
      }

      // Actualizar label del documento principal
      let label = window.document.getElementsByTagName("label")[0];
      label.innerText = "Usuario registrado: " + usu.value;

      ventana.close();
    };
  };
};

// Dependiendo del select seleccionado haremos una cosas u otra
document.getElementsByTagName("select")[0].onclick = () => {
  crearNodos();
};

function crearNodos() {
  let tipoUsuario = document.getElementsByTagName("select")[0];
  let tr = document.getElementsByTagName("tr");
  let ultimoTr = tr[tr.length - 1];

  while (ultimoTr.firstChild) {
    ultimoTr.removeChild(ultimoTr.firstChild);
  }

  if (tipoUsuario.value === "empleado") {
    // crear Nº de incidencia (input)
    let td1 = createNode("td", "Nº de Incidencias");
    let tdNI = createNode("td");
    let nInc = createNode("input");
    nInc.type = "text";
    tdNI.appendChild(nInc);

    // crear Incidencia (textarea)
    let td2 = createNode("td", "Incidencia");
    let tdInc = createNode("td");
    let inc = createNode("textArea");
    tdInc.appendChild(inc);

    ultimoTr.appendChild(td1);
    ultimoTr.appendChild(tdNI);

    ultimoTr.appendChild(td2);
    ultimoTr.appendChild(tdInc);

    // CORRECCIÓN: enganchar validación al campo de incidencia creado dinámicamente
    nInc.onblur = validarCampo;
  } else if (tipoUsuario.value === "encargado") {
    //Borrar los elementos
    while (ultimoTr.firstChild) {
      ultimoTr.removeChild(ultimoTr.firstChild);
    }

    // crear Departamento (select con opciones)
    let td3 = createNode("td", "Departamento");
    let tdDep = createNode("td");
    let selectDept = createNode("select");
    let opt1 = createNode("option", "Contabilidad");
    opt1.value = "contabilidad";
    let opt2 = createNode("option", "Dirección");
    opt2.value = "direccion";
    selectDept.appendChild(opt1);
    selectDept.appendChild(opt2);
    tdDep.appendChild(selectDept);

    // crear Asunto (textarea)
    let td4 = createNode("td", "Asunto");
    let tdAs = createNode("td");
    let asun = createNode("textArea");
    tdAs.appendChild(asun);

    ultimoTr.appendChild(td3);
    ultimoTr.appendChild(tdDep);

    ultimoTr.appendChild(td4);
    ultimoTr.appendChild(tdAs);
  }
}

//Validos con el botón en true disabled siempre y cuando no se cumplan los cambpos
let enviar = document.getElementsByTagName("input")[0];
enviar.disabled = true;

// CORRECCIÓN: evitar error por función inexistente
enviar.onclick = () => {
  // dispara el submit para que pase por onsubmit
  if (enviar.disabled) return; // no actúa si está deshabilitado

  // buscar el radio "si"
  let inputs = document.getElementsByTagName("input");
  let condSi = null;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "radio" && inputs[i].value === "si") {
      condSi = inputs[i];
      break;
    }
  }

  if (condSi && condSi.checked) {
    alert("Enviando formulario ...");
  } else {
    alert("Debes marcar 'SI Acepto'");
  }
};

// Crear mensajes de error al cargar
let pErrorDni = createNode("p", "DNI inválido");
pErrorDni.style.color = "red";
pErrorDni.style.display = "none";
document.body.appendChild(pErrorDni);

let pErrorEmail = createNode("p", "Email inválido");
pErrorEmail.style.color = "red";
pErrorEmail.style.display = "none";
document.body.appendChild(pErrorEmail);

let pErrorInc = createNode("p", "Nº de incidencia debe ser numérico");
pErrorInc.style.color = "red";
pErrorInc.style.display = "none";
document.body.appendChild(pErrorInc);

// Validación al perder el foco
function validarCampo(e) {
  let campo = e.target;
  let valor = campo.value;
  let valido = true;

  // Índices reales del HTML (DNI: input[4], email: input[5])
  if (campo === document.getElementsByTagName("input")[4]) {
    // DNI
    let dniV = /^[0-9]{8}[A-Z]$/;
    valido = dniV.test(valor);
    pErrorDni.style.display = valido ? "none" : "inherit";
  }

  if (campo === document.getElementsByTagName("input")[5]) {
    // Email
    let emailV = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    valido = emailV.test(valor);
    pErrorEmail.style.display = valido ? "none" : "inherit";
  }

  // El campo de incidencia es el último input creado dinámicamente
  let inputs = document.getElementsByTagName("input");
  let nIncidencia = inputs[inputs.length - 1];
  if (campo === nIncidencia) {
    let nIncV = /^[0-9]+$/;
    valido = nIncV.test(valor);
    pErrorInc.style.display = valido ? "none" : "inherit";
  }

  campo.style.border = valido ? "1px solid black" : "2px solid red";
  comprobarEnviar();
}

// Activar botón enviar solo si todo está correcto
function comprobarEnviar() {
  // CORRECCIÓN: usar índices de input en vez de tags inexistentes
  let inputs = document.getElementsByTagName("input");
  let dni = inputs[4];
  let email = inputs[5];
  let nIncidencia = inputs[inputs.length - 1];
  let label = document.getElementsByTagName("label")[0];

  let dniV = /^[0-9]{8}[A-Z]$/;
  let emailV = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  let nIncV = /^[0-9]+$/;

  if (
    dni &&
    email &&
    nIncidencia &&
    dniV.test(dni.value) &&
    emailV.test(email.value) &&
    nIncV.test(nIncidencia.value) &&
    label.innerText.includes("Usuario registrado")
  ) {
    enviar.disabled = false;
  } else {
    enviar.disabled = true;
  }
}

// CORRECCIÓN: enganchar validación a los campos fijos con índices correctos
document
  .getElementsByTagName("input")[4]
  .addEventListener("blur", validarCampo); // DNI
document
  .getElementsByTagName("input")[5]
  .addEventListener("blur", validarCampo); // Email
// El campo de incidencia se engancha cuando se crea (nInc.onblur en crearNodos)

// onsubmit del formulario
document.getElementsByTagName("form")[0].onsubmit = function (e) {
  e.preventDefault();
  // CORRECCIÓN: localizar radio "si" por tipo y valor
  let inputs = document.getElementsByTagName("input");
  let condSi = null;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "radio" && inputs[i].value === "si") {
      condSi = inputs[i];
      break;
    }
  }
  if (condSi && condSi.checked) {
    alert("Enviando formulario ...");
  } else {
    alert("Debes marcar 'SI Acepto'");
  }
};

/**
 * Funcion para crear Nodos
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
