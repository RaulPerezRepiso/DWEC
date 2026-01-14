// CREAMOS EL FORM PARA CONTROLAR EL RESET EN AMBOS ASIDE
const form = document.createElement("form");

//Tamaño incial de la página
document.body.style.fontSize = "16px";

// FUNCIONES

primerAside(form);
segundoAside(form);

//Añadimos el form al body
document.body.appendChild(form);

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
  nombre.required = true;

  let lEmail = createNode("label", "Email Corporativo:");
  let email = createNode("input");
  lEmail.style.fontWeight = "bold";
  email.type = "email";
  email.id = "email";
  email.required = true;

  let lPass = createNode("label", "Contraseña:");
  let pass = createNode("input");
  lPass.style.fontWeight = "bold";
  pass.type = "password";
  pass.id = "pass";
  pass.required = true;

  let lCPass = createNode("label", "Confirmar Contraseña:");
  let cpass = createNode("input");
  lCPass.style.fontWeight = "bold";
  cpass.type = "password";
  cpass.id = "cpass";
  cpass.required = true;

  //Añadimos todos los input y los label al fieldset
  fieldset2.appendChild(lNombre);
  fieldset2.appendChild(nombre);
  fieldset2.appendChild(createNode("br"));

  fieldset2.appendChild(lEmail);
  fieldset2.appendChild(email);
  fieldset2.appendChild(createNode("br"));

  // Creamos el ul para la lista de label que se va actualizando
  let ul = createNode("ul");
  ul.id = "ul"; //Asignamos el id para poder llamarlo y crearlo cuando sea oportuno

  let mayus = createNode("li", "Debe contener una Mayúsculas");
  mayus.style.color = "red";
  mayus.id = "mayus";

  let minus = createNode("li", "Debe contener una Minúsculas");
  minus.style.color = "red";
  minus.id = "minus";

  let nums = createNode("li", "Debe contener una Números");
  nums.style.color = "red";
  nums.id = "nums";

  let simb = createNode("li", "Debe contener una Símbolos");
  simb.style.color = "red";
  simb.id = "simb";

  let long = createNode("li", "Debe tener mínimo 8 caracteres");
  long.style.color = "red";
  long.id = "long";

  //Añadimos tood al ul para que se muestre cuando sea necesario
  ul.appendChild(mayus);
  ul.appendChild(minus);
  ul.appendChild(nums);
  ul.appendChild(simb);
  ul.appendChild(long);

  ul.style.display = "none";

  //Añadirlo al fieldset
  fieldset2.appendChild(ul);

  pass.oninput = passValido;

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
  fecha.required = true;

  //Lo añadimos al fieldset
  fieldset2.appendChild(lFecha);
  fieldset2.appendChild(fecha);

  //Creamos el campo del input para el link
  let Llink = createNode("label", "Perfil de Linkedin:");
  let link = createNode("input");
  Llink.style.fontWeight = "bold";
  link.placeholder = "https://linkedin.com";
  link.id = "link";
  link.required = true;

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
  check.required = true;

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
  select.required = true;
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
  boton.id = "boton";
  // Para que sea un boton de envio y haga los required
  boton.type = "submit";

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

  //Si usamos el switch
  let valor = parseFloat(range.value);

  //Podemos ver con esto el range para ver si funciona la barra
  console.log("valor range:", range.value);

  // if (range.value <= 12.5) {
  //   document.body.style.fontSize = "10px";
  // } else if (range.value <= 25) {
  //   document.body.style.fontSize = "12px";
  // } else if (range.value <= 37.5) {
  //   document.body.style.fontSize = "14px";
  // } else if (range.value <= 50) {
  //   document.body.style.fontSize = "16px";
  // } else if (range.value <= 62.5) {
  //   document.body.style.fontSize = "18px";
  // } else if (range.value <= 75) {
  //   document.body.style.fontSize = "20px";
  // } else if (range.value <= 87.5) {
  //   document.body.style.fontSize = "22px";
  // } else {
  //   document.body.style.fontSize = "24px";
  // }

  //Con switch
  switch (true) {
    case valor <= 12.5:
      document.body.style.fontSize = "10px";
      break;
    case valor <= 25:
      document.body.style.fontSize = "12px";
      break;
    case valor <= 37.5:
      document.body.style.fontSize = "14px";
      break;
    case valor <= 50:
      document.body.style.fontSize = "16px";
      break;
    case valor <= 62.5:
      document.body.style.fontSize = "18px";
      break;
    case valor <= 75:
      document.body.style.fontSize = "20px";
      break;
    case valor <= 87.5:
      document.body.style.fontSize = "22px";
      break;
    default:
      document.body.style.fontSize = "24px";
      break;
  }
}

// Hacemos que sea onsubmit para poder controlar los datos de formulario que queremos subir
form.onsubmit = (e) => {
  //Para que no recargue los valores del formulario
  e.preventDefault();

  let esValido = validarCampos();
  if (!esValido) {
    // hay errores, no hago nada más
    return;
  }

  //Aquí tengo que guardar los datos validos para crear el empleado
  crearTarjeta();
};

//Validamos que los campos sean los que se piden
function validarCampos() {
  //Llamamos primero a los nodos ya creados con su value
  let pass = document.getElementById("pass").value;
  let cpass = document.getElementById("cpass").value;
  let link = document.getElementById("link").value;

  // Validación password
  if (!passValido()) {
    mostrarError("La contraseña no cumple los requisitos");
    return false;
  }

  // Confirmación
  if (pass !== cpass) {
    mostrarError("Las contraseñas no coinciden");
    return false;
  }

  // Validación LinkedIn con regex simple para que tenga o no wwww sea valido
  const regex = /^https:\/\/(www\.)?linkedin\.com\//;
  if (!regex.test(link)) {
    mostrarError("La URL de LinkedIn no es válida");
    return false;
  }

  return true;
}

//Comprobamos que el pass válido
function passValido() {
  //Sacamos el valor del pass
  let pass = document.getElementById("pass").value;

  //Si tiene más de 0 se muestran los errores sino no aparcerá
  if (pass.length > 0) {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }

  // Expresiones regulares con test
  let tieneMayus = /[A-Z]/.test(pass);
  let tieneMinus = /[a-z]/.test(pass);
  let tieneNum = /[0-9]/.test(pass);
  let tieneSym = /[$%&@#?!.,;:_\-]/.test(pass);
  let tieneLen = pass.length >= 8;

  actualizarRegla(document.getElementById("mayus"), tieneMayus);
  actualizarRegla(document.getElementById("minus"), tieneMinus);
  actualizarRegla(document.getElementById("nums"), tieneNum);
  actualizarRegla(document.getElementById("simb"), tieneSym);
  actualizarRegla(document.getElementById("long"), tieneLen);

  return tieneMayus && tieneMinus && tieneNum && tieneSym && tieneLen;
}

//Vamos actualizacon el color del li si es válido y cumple la regla
function actualizarRegla(li, cumple) {
  if (!li) return;
  // Por si acaso
  if (cumple) {
    li.style.color = "green";
    li.style.textDecoration = "line-through";
  } else {
    li.style.color = "red";
    li.style.textDecoration = "none";
  }
}

//Mostramos errores si alguno de los campos no estan correctos
function mostrarError(mensaje) {
  let error = document.getElementById("er");
  error.innerText = mensaje;

  //Desaparece el error a los 3 segundos
  setTimeout(() => {
    error.innerText = "";
  }, 3000);
}

function crearTarjeta() {   
  // 1. Obtener datos del formulario
  let nombreInput = document.getElementById("nombre");
  let emailInput = document.getElementById("email");
  let fechaInput = document.getElementById("fecha");
  let selectHabilidades = document.getElementById("select");

  let nombre = nombreInput.value;
  let email = emailInput.value;
  let fecha = fechaInput.value;

  // Obtener habilidades SIN map
  let habilidades = [];
  for (let i = 0; i < selectHabilidades.selectedOptions.length; i++) {
    let opcion = selectHabilidades.selectedOptions[i];
    habilidades.push(opcion.value);
  }

  // Calcular días en la empresa
  let hoy = new Date();
  let fechaContratacion = new Date(fecha);
  let diffMs = hoy - fechaContratacion;
  let dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 2. Crear el article
  let article = document.createElement("article");
  article.style.border = "1px solid #ccc";
  article.style.padding = "15px";
  article.style.margin = "10px 0";
  article.style.borderRadius = "8px";
  article.style.background = "white";

  // 3. Crear cabecera con un div 
  let cabecera = document.createElement("div");

  let h3 = document.createElement("h3");
  h3.textContent = nombre;

  let small = document.createElement("small");
  small.textContent = email + " — " + dias + " días en la empresa";

  cabecera.appendChild(h3);
  cabecera.appendChild(small);

  // 4. Crear meter de eficiencia
  let meter = document.createElement("meter");
  meter.min = 0;
  meter.max = 100;
  meter.value = Math.floor(Math.random() * 101); // 0–100 aleatorio
  meter.style.width = "100%";
  meter.style.margin = "10px 0";

  // 5. Crear lista de habilidades
  let ul = document.createElement("ul");
  for (let i = 0; i < habilidades.length; i++) {
    let li = document.createElement("li");
    li.textContent = habilidades[i];
    ul.appendChild(li);
  }

  // 6. Botón clonar
  let btnClonar = document.createElement("button");
  btnClonar.textContent = "Clonar Ficha";
  btnClonar.style.marginRight = "10px";

  btnClonar.onclick = function () {
    //Usamos el clone node para clonar todo el contenido del article pero con menos opacidad
    let clon = article.cloneNode(true);
    clon.style.opacity = "0.7"; // 70%
    article.parentNode.appendChild(clon);
  };

  // 7. Botón despedir
  let btnDespedir = document.createElement("button");
  btnDespedir.textContent = "Despedir";
  btnDespedir.style.background = "red";
  btnDespedir.style.color = "white";

  //Simplemente un remove en el botón que hemos creado
  btnDespedir.onclick = function () {
    article.remove();
  };

  // 8. Añadir todo al article
  article.appendChild(cabecera);
  article.appendChild(meter);
  article.appendChild(ul);
  article.appendChild(btnClonar);
  article.appendChild(btnDespedir);

  // 9. Añadir al body o a un contenedor
  document.body.appendChild(article);
}

//Para abrir la ventan tenemos que crear el bóton y le tenemos que dar la dirección a la que apunta
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

    //Le podemos dar un tiempo por si no ha cargado la información nada más abrir la ventana
    let timer = setInterval(() => {
      if (ventana.cargarInforme) {
        clearInterval(timer);
        enviarDatosInforme(ventana);
      }
    }, 100);
  };
}

//Los datos necesarios que vamos a usar en la nueva ventana los mandamo a la página
function enviarDatosInforme(ventana) {
  let empleados = document.querySelectorAll("article");

  // Preparamos los datos en un array limpio
  let datos = [];

  empleados.forEach((emp) => {
    let nombre = emp.querySelector("h3").textContent;
    let eficiencia = emp.querySelector("meter").value;

    datos.push({ nombre, eficiencia });
  });

  // Enviamos los datos a la ventana del informe
  ventana.cargarInforme(datos);
}

/**
 * Función para crear Nodos
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
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
  }

  return nodo;
}
