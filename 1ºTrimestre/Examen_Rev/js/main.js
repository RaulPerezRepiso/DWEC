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

  ventana.onload = () => {
    let ePass = createNode("p", "Campo Password esta vacío");
    ePass.style.color = "red";
    ventana.document.body.appendChild(ePass);
    ePass.style.display = "none";

    let eUsu = createNode("p", "Campo Usuario esta vacío")
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

      let usuValido = usu.value === "encargado" || usu.value === "empleado";

      if (!usuValido) {
        eCarg.style.display = "inherit";
        return;
      }

      let label = this.document.getElementsByTagName("label")[0];
      label.innerText = "Usuario registrado: " + usu.value;

      ventana.close();
    }
  };
};

document.getElementsByTagName("select")[0].onclick = () => {
  crearNodos();
}

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

let enviar = document.getElementsByTagName[0];


enviar.onclick = () => {
  enviarValido();
}

function enviarValido() {
  let dniV = /^[0-9]{8}[A-Z]$/;
  let emailV = /^/;
  let nIncV = /[0-9]/ig;

  let dni = document.getElementsByName[4];
  let email = document.getElementsByName[5];
  let nIncidencia = document.getElementsByName[6];

  if(dni.value != dniV){
    
  }

  if(email.value != emailV){
    
  }

  if(nIncidencia.value != nIncV){
    
  }

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