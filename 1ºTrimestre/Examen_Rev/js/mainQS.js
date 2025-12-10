
// cuando cargue la pagina se abre la ventana emergente
// meter la ventana en una variable para luego poder comprobar mejor
let ventana = null;
let usuarioRegistrado = null;
// desactivar el boton enviar hasta que esten todos los 
document.getElementsByTagName("input")[0].disabled = true;

let fallos1 = false;
let fallos2 = false;
let fallos3 = false;

document.body.onload = function () {
    muestraLista();
    validaCampos();
    ventana = window.open(
        "./registro.html",
        "Registro",
        "width=600,height=400,left=0,top=0"
    );

    // cuando carque la ventana, y le de al boton aceptar hara algo   
    ventana.onload = function () {
        // creo el p de error y lo añado a ventana
        let pError = createNode("p", "Usuario y contraseña deben estar rellenos");
        pError.id = "error";
        pError.style.display = "none";
        pError.style.color = "red";
        ventana.document.body.appendChild(pError);

        let pErrorUsuario = createNode("p");
        pErrorUsuario.id = "errorUsuario";
        pErrorUsuario.style.display = "none";
        pErrorUsuario.style.color = "red";
        ventana.document.body.appendChild(pErrorUsuario);

        ventana.document.getElementsByName("aceptar")[0].onclick = function () {
            // valores de usuario y contraseña
            let usuario = ventana.document.querySelectorAll("input[type='text']")[0];
            let contraseña = ventana.document.querySelectorAll("input[type='password']")[0];

            // controlo usuario
            if (usuario.value == "") {
                usuario.style.border = "3px solid red";
                ventana.document.getElementById("error").style.display = "inherit";
            }
            else usuario.style.border = "1px solid black";

            // controlo contraseña
            if (contraseña.value == "") {
                contraseña.style.border = "3px solid red";
                ventana.document.getElementById("error").style.display = "inherit";
            }
            else {
                contraseña.style.border = "1px solid black";

                // si esta relleno se quita el error
                if (contraseña.value != "" && usuario.value != "") ventana.document.getElementById("error").style.display = "none";

                if (usuario.value == "empleado" || usuario.value == "encargado") {
                    usuarioRegistrado = usuario.value;
                    rellenaLabel();
                    ventana.close();
                }
                else {
                    ventana.document.getElementById("errorUsuario").innerText = usuario.value + " no está registrado";
                    ventana.document.getElementById("errorUsuario").style.display = "inherit";
                }
            }
        }
    }
};

// funcion para poner en el primer label el usuario con el que se ha iniciado sesion
function rellenaLabel() {
    document.getElementsByTagName("label")[0].innerText = "Usuario registrado: " + usuarioRegistrado;
}

// cuando cambia la lista controla si tiene que tener unos elementos o otros en la tabla
document.getElementsByTagName("select")[0].onchange = function () {
    muestraLista();
}

// funcion que controla que elemento hay en la lista para tener unos elementos o otros creados
function muestraLista() {
    let lista = document.getElementsByTagName("select")[0];
    // sacar el tr donde se le van a añadir los td
    let tr = document.getElementsByTagName("tr");
    let table = tr[tr.length - 1];
    
    // campos de empleado
    let numIncidenciaLabel = createNode("label", "Nº de incidencia");
    let numIncidencia = createNode("input");
    numIncidencia.id = "incidencia";

    let incidenciaLabel = createNode("label", "Introduce tu incidencia");
    let incidencia = createNode("textarea");

    // campos encargado
    let departamentoLabel = createNode("label", "Departamento: ")
    let departamento = createNode("select");
    let cont = createNode("option", "Contabilidad");
    let dir = createNode("option", "Dirección");

    departamento.appendChild(cont);
    departamento.appendChild(dir);

    let asuntoLabel = createNode("label", "Asunto:");
    let asunto = createNode("textarea");
    if (lista.value == "empleado") {
        // borrar todos los elementos por si tiene alguno
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        // meter todos los elementos en un td y añadirlos
        let td1 = createNode("td");
        td1.appendChild(numIncidenciaLabel);
        table.appendChild(td1);

        let td2 = createNode("td");
        td2.appendChild(numIncidencia);
        table.appendChild(td2);

        let td3 = createNode("td");
        td3.appendChild(incidenciaLabel);
        table.appendChild(td3);

        let td4 = createNode("td");
        td4.appendChild(incidencia);
        table.appendChild(td4);
    }
    else {
        // borrar todos los elementos por si tiene alguno
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        // meto todo en un td y luego añado el td
        let td5 = createNode("td");
        td5.appendChild(departamentoLabel);

        let td6 = createNode("td");
        td6.appendChild(departamento);

        let td7 = createNode("td");
        td7.appendChild(asuntoLabel);

        let td8 = createNode("td");
        td8.appendChild(asunto);

        table.appendChild(td5);
        table.appendChild(td6);
        table.appendChild(td7);
        table.appendChild(td8);

    }
    // se llama tambien a valida campos aqui para que se cree incidencia y no de error
    validaCampos();
}

function validaCampos() {
    // patrones para validar los datos
    let patronNif = /^[0-9]{8}[A-Z]$/;
    let patronMail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{1,5}$/;
    let patronInc = /^[0-9]+$/;

    // creo los errores y los añado, si hay fallo le cambio el display
    let errorDni = createNode("p", "Fallo en el DNI");
    errorDni.style.color = "red";
    errorDni.style.display = "none";
    document.body.appendChild(errorDni);

    let errorMail = createNode("p", "Fallo en el Mail");
    errorMail.style.color = "red";
    errorMail.style.display = "none";
    document.body.appendChild(errorMail);

    let errorInc = createNode("p", "Fallo en la incidencia");
    errorInc.style.color = "red";
    errorInc.style.display = "none";
    document.body.appendChild(errorInc);

    document.getElementById("dni").onblur = function () {
        let dni = document.querySelectorAll("input[type='text']")[2].value;
        errorDni.style.display = patronNif.test(dni) ? "none" : "inherit";
        fallos1 = patronNif.test(dni);
        validaEnviar();
    }

    document.getElementById("mail").onblur = function () {
        let mail = document.querySelectorAll("input[type='text']")[3].value;
        errorMail.style.display = patronMail.test(mail) ? "none" : "inherit";
        fallos2 = patronMail.test(mail);
        validaEnviar();
    }

    document.getElementById("incidencia").onblur = function () {
        let inc = document.getElementById("incidencia").value;
        errorInc.style.display = patronInc.test(inc) ? "none" : "inherit";
        fallos3 = patronInc.test(inc);
        validaEnviar();
    }
}

// si no hay fallos el boton enviar se activa, sino se queda desactivado
function validaEnviar() {
    if(usuarioRegistrado=="empleado"){
        if (fallos1 && fallos2 && fallos3 && usuarioRegistrado != "")
            document.getElementsByTagName("input")[0].disabled = false;
        else document.getElementsByTagName("input")[0].disabled = true;
    }
    else {
        if (fallos1 && fallos2 && usuarioRegistrado != "")
            document.getElementsByTagName("input")[0].disabled = false;
        else document.getElementsByTagName("input")[0].disabled = true;
    }
}

// el parrafo de error se crea antes de la funcion para que no se cree cada vez que se de al boton
let error = createNode("p", "Para enviar debes aceptar las condiciones");
error.style.color = "red";
error.style.display = "none";
document.body.appendChild(error);

// creo el h1 y lo añado sin visibilidad
let correcto = createNode("h1","Enviando formulario...");
correcto.style.display="none";
document.body.appendChild(correcto);

document.getElementsByTagName("form")[0].onsubmit = function (e) {
    // esto hace que el formulario se envíe de verdad y se recargue la página
    e.preventDefault();

    let arrayCond = document.getElementsByName("condiciones");
    let cond = null;

    // hay que hacer array.from porque es un array de nodos y no un array normal
    Array.from(arrayCond).forEach(element => {
        if (element.checked) cond = element.value;
    });

    if (cond == "no") {
        error.style.display = "inherit";
    }
    else {
        error.style.display = "none";
        correcto.style.display="inherit";
    }
}

function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesita al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
            nodo.id = "nuevoNodo";
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}