// CREAMOS EL FORM PARA CONTROLAR EL RESET EN AMBOS ASIDE
const form = document.createElement("form");

//Tamaño incial de la página
document.body.style.fontSize = "16px";

// FUNCIONES

primerAside(form);
segundoAside(form);

//Añadimos el form al body
document.body.appendChild(form);

validarCampos();

//Lo creamos despues de añadir el form para que se cree fuera
abrirVentana();

//Llamamos a la funcion del tema interfaz una vez estan creados los nodos
temaInterfaz();

/**FUNCIONES NECESARIOS **/

//Nodos necesarios para el primer Aside
function primerAside(form) {
  //Creamos el aside principal donde va a ir lo demás
  let aside = createNode("aside");

  //Creamos el fieldset con el texto y lo añadimos al aside
  let fieldset = createNode("fieldset");
  aside.appendChild(fieldset);

  //Creamos el campo legend que va dentro del fieldset
  let legend = createNode("legend", "Configuración Visual");
  fieldset.appendChild(legend);

  //Creamos el h4 en negrita
  let h4 = createNode("h4", "Tema de Interfaz");
  //Añadimos el h4 al fieldset
  fieldset.appendChild(h4);

  //Creamos los 3 inputs de radio
  let lClaro = createNode("label", "Claro");
  let claro = createNode("input");
  claro.setAttribute("name", "opcion");
  claro.setAttribute("type", "radio");
  claro.value = "claro";
  //Esto hace que cada vez que resetemos volvamos a tener el valor por defecto que asignamo al principio
  claro.defaultChecked = true;

  let lOscuro = createNode("label", "Oscuro");
  let oscuro = createNode("input");
  oscuro.setAttribute("name", "opcion");
  oscuro.setAttribute("type", "radio");
  oscuro.value = "oscuro";

  let lAlto = createNode("label", "Alto Contraste");
  let alto = createNode("input");
  alto.setAttribute("name", "opcion");
  alto.setAttribute("type", "radio");
  alto.value = "alto";

  //Implementamos el onclick para que funcionen estos eventos al llamar al método
  claro.onclick = temaInterfaz;
  oscuro.onclick = temaInterfaz;
  alto.onclick = temaInterfaz;

  //Añadimos todos los inputs al form para poder resetear
  fieldset.appendChild(claro);
  fieldset.appendChild(lClaro);
  fieldset.appendChild(createNode("br"));

  fieldset.appendChild(oscuro);
  fieldset.appendChild(lOscuro);
  fieldset.appendChild(createNode("br"));

  fieldset.appendChild(alto);
  fieldset.appendChild(lAlto);
  fieldset.appendChild(createNode("br"));

  //Creamos la barra de tamaño con su label correspondiente
  let lTamaño = createNode("label", "Tamaño de Fuente Global");
  let barra = createNode("input");
  barra.type = "range";
  barra.id = "range";

  //Valores de la barra y el por defecto
  barra.min = 0;
  barra.max = 100;
  barra.value = 50; // valor inicial

  barra.oninput = rangeBarra;

  //Añadimos todo el fieldset
  fieldset.appendChild(createNode("br"));
  fieldset.appendChild(lTamaño);
  fieldset.appendChild(createNode("br"));
  fieldset.appendChild(barra);
  fieldset.appendChild(createNode("br"));

  //Creamos el botón para el reset
  let reset = createNode("input");
  //Asignamos el valor al input para cambiar el nombre del mismo
  reset.setAttribute("value", "Restablecer la configuración");
  reset.type = "reset";

  //Añadimos el boton al form para que funcione y este mismo al fieldset
  fieldset.appendChild(reset);

  //Añadimos el aside al from para que se muestre en la vista y controlar el reset
  form.appendChild(aside);
}

//Nodos necesarios para el segundo Aside
function segundoAside(form) {
  //Creamos el segund aside
  let aside2 = createNode("aside");

  //Creamos otro campo fieldset con su legend correspondiente
  let fieldset2 = createNode("fieldset");
  let legend2 = createNode("legend", "Alta de Empleado");

  //Añadimos el legend a fieldset y a su vez este al aside
  fieldset2.appendChild(legend2);
  aside2.appendChild(fieldset2);

  let lNombre = createNode("label", "Nombre Completo:");
  let nombre = createNode("input");
  lNombre.style.fontWeight = "bold";
  nombre.id = "nombre";

  let lEmail = createNode("label", "Email Corporativo:");
  let email = createNode("input");
  lEmail.style.fontWeight = "bold";
  email.type = "email";
  email.id = "email";

  let lPass = createNode("label", "Contraseña:");
  let pass = createNode("input");
  lPass.style.fontWeight = "bold";
  pass.type = "password";
  pass.id = "pass";

  let lCPass = createNode("label", "Confirmar Contraseña:");
  let cpass = createNode("input");
  lCPass.style.fontWeight = "bold";
  cpass.type = "password";
  pass.id = "cpass";

  //Añadimos todos los input y los label al fieldset
  fieldset2.appendChild(lNombre);
  fieldset2.appendChild(nombre);
  fieldset2.appendChild(createNode("br"));

  fieldset2.appendChild(lEmail);
  fieldset2.appendChild(email);
  fieldset2.appendChild(createNode("br"));

  fieldset2.appendChild(lPass);
  fieldset2.appendChild(pass);
  fieldset2.appendChild(createNode("br"));

  fieldset2.appendChild(lCPass);
  fieldset2.appendChild(cpass);
  fieldset2.appendChild(createNode("br"));

  //Creamos el campo para introducir la fecha
  let lFecha = createNode("label", "Fecha de Contratación:");
  let fecha = createNode("input");
  lFecha.style.fontWeight = "bold";
  fecha.type = "date";
  fecha.id = "fecha";

  //Lo añadimos al fieldset
  fieldset2.appendChild(lFecha);
  fieldset2.appendChild(fecha);

  //Creamos el campo del input para el link
  let Llink = createNode("label", "Perfil de Linkedin:");
  let link = createNode("input");
  Llink.style.fontWeight = "bold";
  link.placeholder = "https://linkedin.com";
  link.id = "link";

  //Añadimos al fieldset
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(Llink);
  fieldset2.appendChild(link);

  //Creamos el checkbox
  let lCheck = createNode("label", "Acepto los términos");
  let check = createNode("input");
  lCheck.style.fontWeight = "bold";
  check.type = "checkbox";
  check.id = "check";

  //Lo añadimos todo al fieldset
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(lCheck);
  fieldset2.appendChild(check);

  //Creamos los nodos para las habilidades
  let lHab = createNode("label", "Habilidades Técnicas");

  // Para ello tendremos que crear un select y dentro añadir todas las opciones
  let select = createNode("select");
  // Damós el valor para que sea true y pueda ser una selección múltiple
  select.multiple = true;
  select.id = "select";
  lHab.style.fontWeight = "bold";

  let js = createNode("option", "JS");
  let css = createNode("option", "CSS");
  let html = createNode("option", "HTML");
  let py = createNode("option", "Python");
  let sql = createNode("option", "SQL");

  //Añadimos todas las opciones al select
  select.appendChild(js);
  select.appendChild(css);
  select.appendChild(html);
  select.appendChild(py);
  select.appendChild(sql);

  //Añadimos estos campos al fieldset
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(lHab);
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(select);

  //Creamos el botón con los estilos requeridos
  let boton = createNode("button", "Registrar Empleado");
  boton.style.marginTop = "15px";
  boton.style.width = "100%";
  boton.style.background = "#007bff";
  boton.style.color = "white";
  boton.style.padding = "10px";
  boton.style.border = "none";
  boton.style.cursor = "pointer";
  boton.id="boton";

  //Añadimos el botón al fieldset
  fieldset2.appendChild(createNode("br"));
  fieldset2.appendChild(boton);

  //Añadimos el segundo aside con todo lo demás al form para que se vea en el body
  form.appendChild(aside2);
}

// Función que controla el rango y el tema de pantalla
function temaInterfaz() {
  if (document.getElementsByName("opcion")[0].checked) {
    document.body.style.background = "white";
    document.body.style.color = "black";
  } else if (document.getElementsByName("opcion")[1].checked) {
    document.body.style.background = "black";
    document.body.style.color = "white";
  } else {
    document.body.style.background = "black";
    document.body.style.color = "yellow";
  }
}

function rangeBarra() {
  let range = document.getElementById("range");

  //Podemos ver con esto el range para ver si funciona la barra
  console.log("valor range:", range.value);

  if (range.value <= 12.5) {
    document.body.style.fontSize = "10px";
  } else if (range.value <= 25) {
    document.body.style.fontSize = "12px";
  } else if (range.value <= 37.5) {
    document.body.style.fontSize = "14px";
  } else if (range.value <= 50) {
    document.body.style.fontSize = "16px";
  } else if (range.value <= 62.5) {
    document.body.style.fontSize = "18px";
  } else if (range.value <= 75) {
    document.body.style.fontSize = "20px";
  } else if (range.value <= 87.5) {
    document.body.style.fontSize = "22px";
  } else {
    document.body.style.fontSize = "24px";
  }
}

let boton = document.getElementById("boton").onclick = () =>{
  
}

function validarCampos() {
  let nombre = document.getElementById("nombre");

  if (nombre.value.trim() === "") {
    mostrarError("Nombre no puede estar vacío");
    return false;
  }

  // Aquí luego añadiremos las demás validaciones

  return true;
}

function mostrarError(mensaje) {
  let error = document.getElementById("er"); 
  error.innerText = mensaje;

  setTimeout(() => {
    error.innerText = "";
  }, 3000);
}

function abrirVentana() {
  //Creamos el botón y le damos los estilos necesarios
  let botonInforme = createNode("button");
  botonInforme.textContent = "Generar Informe";
  botonInforme.style.width = "150px";
  botonInforme.style.height = "40px";
  botonInforme.style.background = "blue";
  botonInforme.style.color = "white";

  //Añadimos el botón al body
  document.body.appendChild(botonInforme);

  //Aplicamos el evento para que se abra la ventana de informes al darle click
  botonInforme.onclick = () => {
    let ventana = window.open(
      "src/informe.html",
      "Informe",
      "width=500,height=400,top=0,left=0"
    );
  };
}

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
