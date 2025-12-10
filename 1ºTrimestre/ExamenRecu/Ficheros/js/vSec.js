//Se que algunas no las necesito, pero no me da tiempo ya de de eliminarlas y hacerlas locales en metodos. 
var boton = document.getElementById("btLogin");
var pass = document.getElementsByTagName("input")[1];
var login = document.getElementsByTagName("input")[0];
var select = null;
var error = document.getElementById("error");
var inputCaptcha;
var labelCaptcha;
var radiosDev;
var divDev;
var divAdmin;
var divPm;

//Crear el select y deshabilitarlo
crearSelectGeneral();
select.setAttribute("disabled", "disabled");

var bucle = 0;
bucle = setInterval(() => {
  if (pass.value != "") {
    select.removeAttribute("disabled");
    console.log();
    clearInterval(bucle);
  }
}, 2000);

//Evento para crear secciones dependiendo del select 
select.onchange = function () {
  var opcion = select.options[select.selectedIndex].text;

  if (opcion == "Developer") {
    borrarCampos();
    crearDev();
  }
  if (opcion == "Admin") {
    borrarCampos();
    crearAdmin();

    //comprobarPass(pass.value, 2);
  }
  if (opcion == "Proyect Manager") {
    borrarCampos();
    crearPm();
    // comprobarPass(pass.value, 2);
  }
};


//Evento para enviar el formulario
boton.onclick = function (event) {
  event.preventDefault();
  let errores = 0;
  var opcion = select.options[select.selectedIndex].text;
  if (login.value == "") {
    error.innerHTML += "<br>" + "El login es obligatorio";
    errores++;
  }
  if (pass.value == "") {
    error.innerHTML += "<br>" + "La contraseña es obligatoria";
    errores++;
  }
  console.log(opcion.text);
  if (opcion.text == "") {
    error.innerHTML +=
      "<br>" +
      "Cuando haya introducido el login y la contraseña, seleccione una opción del menú desplegable";
    errores++;
  }
  if (opcion == "Admin") {
    if (!comprobarPass(pass.value, 1)) errores++;
    if (!comprobarCaptcha()) errores++;
  }
  if (opcion == "Proyect Manager") {
    if (!comprobarPass(pass.value, 2)) errores++;
  }
  if (opcion == "Developer") {
    if (!comprobarDev()) {
      error.innerHTML += "<br>" + "Seleccione una opción";
      errores++;
    }
  }
  if (opcion == "") {
    if (!comprobarPass(pass.value, 0)) errores++;
  }

  if (errores == 0) {
    if (window.opener) {
      window.opener.document.getElementsByClassName(
        "btn btn-danger"
      )[0].innerHTML =
        "Cerrar sesión para " +
        login.value +
        " con rol " +
        select.options[select.selectedIndex].innerHTML;
        window.opener.document.getElementsByTagName("main")[0].style.visibility = "visible";
        window.opener.document.getElementsByTagName("aside")[0].style.opacity = "100%";
      window.close();
    } else alert("No tiene padre");
    // error.innerHTML += "todo correcto";
  }
};

//Funciones de comprobación
function comprobarDev() {
  radiosDev = document.getElementsByName("leng");
  console.log(radiosDev);
  let bien = false;
  radiosDev.forEach((element) => {
    console.log(element.checked);
    if (element.checked) bien = true;
  });
  if (bien) return true;
  return false;
}
function comprobarCaptcha() {
  labelCaptcha = document.getElementById("lbCaptcha");
  inputCaptcha = document.getElementById("icaptcha");
  if (isNaN(parseInt(inputCaptcha.value))) {
    error.innerHTML += "Introduzca el número";
    return false;
  } else if (parseInt(labelCaptcha.innerHTML) != parseInt(inputCaptcha.value)) {
    error.innerHTML += "Los números no coinciden";
    return false;
  }
  return true;
}
function comprobarPass(pass, tipo) {
  var regAdmin = /^A(?=.*\d{2})[A-Za-z\d!@#$%^&*]{8,}$/;
  var reg = /(?=.*[PM]).*$/;
  switch (tipo) {
    case 1:
      if (!regAdmin.test(pass)) {
        error.innerHTML += "Contraseña errónea";
        return false;
      }
      return true;

    case 2:
      if (!reg.test(pass)) {
        error.innerHTML += "Contraseña errónea";
        return false;
      }
      return true;

    case 0:
      {
        error.innerHTML = "Por favor, seleccione una opción";
        return false;
      }
      return true;
  }
}


//Funciones para crear nodos especificos
function crearSelectGeneral() {
  select = document.createElement("select");
  select.appendChild(crearOption(""));
  select.appendChild(crearOption("Developer"));
  select.appendChild(crearOption("Admin"));
  select.appendChild(crearOption("Proyect Manager"));
  document.body.insertBefore(select, boton);
  console.log(select);
}

function crearAdmin() {
  let divAdmin = crearNodo("div");
  divAdmin.setAttribute("id", "dAdmin");
  divAdmin.setAttribute("class", "div");
  labelCaptcha = crearLabel(numeroAleatorio(0, 1000));
  labelCaptcha.style.color = "white";
  labelCaptcha.style.backgroundColor = "black";
  labelCaptcha.style.borderRadius = "5px";
  labelCaptcha.setAttribute("id", "lbCaptcha");
  divAdmin.appendChild(labelCaptcha);
  divAdmin.appendChild(crearNodo("br"));
  divAdmin.appendChild(crearNodo("br"));
  inputCaptcha = crearInput("number");
  inputCaptcha.setAttribute("placeholder", "Introduce el código");
  inputCaptcha.setAttribute("id", "icaptcha");
  divAdmin.appendChild(crearLabel("Introduce el código de Admin:"));
  divAdmin.appendChild(crearNodo("br"));
  divAdmin.appendChild(crearNodo("br"));
  divAdmin.appendChild(inputCaptcha);
  divAdmin.appendChild(crearNodo("br"));
  divAdmin.appendChild(crearNodo("br"));
  document.body.insertBefore(divAdmin, boton);
}

function crearDev() {
  let divDev = crearNodo("div");
  divDev.setAttribute("id", "dDev");
  divDev.setAttribute("class", "div");
  divDev.appendChild(crearLabel("Selecciona el lenguaje del proyecto"));
  divDev.appendChild(crearNodo("br"));

  divDev.appendChild(crearLabel("C#"));
  let radio = crearInput("radio");
  radio.setAttribute("name", "leng");
  radio.setAttribute("value", "c");
  divDev.appendChild(radio);

  divDev.appendChild(crearNodo("br"));
  divDev.appendChild(crearLabel("Java"));
  radio = crearInput("radio");
  radio.setAttribute("name", "leng");
  radio.setAttribute("value", "java");
  divDev.appendChild(radio);

  divDev.appendChild(crearNodo("br"));
  divDev.appendChild(crearLabel("JavaScript"));
  radio = crearInput("radio");
  radio.setAttribute("name", "leng");
  radio.setAttribute("value", "js");
  divDev.appendChild(radio);

  divDev.appendChild(crearNodo("br"));
  divDev.appendChild(crearLabel("Python"));
  radio = crearInput("radio");
  radio.setAttribute("name", "leng");
  radio.setAttribute("value", "python");
  divDev.appendChild(radio);

  divDev.appendChild(crearNodo("br"));
  divDev.appendChild(crearLabel("Otros"));
  radio = crearInput("radio");
  radio.setAttribute("name", "leng");
  radio.setAttribute("value", "otros");
  divDev.appendChild(radio);
  document.body.insertBefore(divDev, boton);
}

function crearPm() {
  let divpm = crearNodo("div");
  divpm.setAttribute("id", "dPm");
  divpm.setAttribute("class", "div");
  let select = document.createElement("select");
  select.appendChild(crearOption("PlayOnWeb"));
  select.appendChild(crearOption("ContaWeb"));
  select.appendChild(crearOption("InstantTalk"));
  divpm.appendChild(select);
  document.body.insertBefore(divpm, boton);
}



//Borrar los campos especificos por si se cambia de seleccion
function borrarCampos() {
  // Selecciona la sección sCliente
  var seccion = document.querySelectorAll(".div");
  console.log(seccion);
  // Elimina cada sección con la clase sCliente
  seccion.forEach(function (sc) {
    sc.remove();
  });
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

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
