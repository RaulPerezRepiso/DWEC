confVisual();
confRegistro();
confPlantilla();


let error = document.getElementById("er");

let falloLink = false;
let falloPass = false;

function confVisual() {
    //Creamos un aside que contenga los datos del formulario
    let aside = createNode("aside");

    let fieldset = createNode("fieldset");
    let legend = createNode("legend", "Configuración Visual");
    fieldset.appendChild(legend);
    aside.appendChild(fieldset);

    let h4 = createNode("h4", "Tema de Interfaz");

    let claro = createNode("input");
    let l1 = createNode("label", "Claro");
    claro.setAttribute("type", "radio");
    claro.setAttribute("name", "opcion");
    claro.setAttribute("value", "claro");

    claro.onfocus = () => {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }

    let oscuro = createNode("input");
    let l2 = createNode("label", "Oscuro");
    oscuro.setAttribute("type", "radio");
    oscuro.setAttribute("name", "opcion");
    oscuro.setAttribute("value", "oscuro");

    oscuro.onfocus = () => {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }

    let altoCons = createNode("input");
    let l3 = createNode("label", "Alto Contraste");
    altoCons.setAttribute("type", "radio");
    altoCons.setAttribute("name", "opcion");
    altoCons.setAttribute("value", "altoCons");

    altoCons.onfocus = () => {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "yellow";
    }

    let p = createNode("p", "Tamaño de Fuente Global");
    let range = createNode("input");
    range.type = "range";

    range.onclick = () => {
        if (range.value <= 20) {
            document.body.style.fontSize = "10px";
        } else if (range.value <= 40) {
            document.body.style.fontSize = "12px";
        } else if (range.value <= 60) {
            document.body.style.fontSize = "14px";
        } else if (range.value <= 80) {
            document.body.style.fontSize = "16px";
        } else {
            document.body.style.fontSize = "18px";
        }
    }

    let reset = createNode("input", "Resetar Configuración");
    let form = createNode("form")

    form.appendChild(reset);
    reset.type = "reset";

    reset.onclick = () => {
        claro.checked = false;
        oscuro.checked = false;
        altoCons.checked = false;
        range.value = 50;
        document.body.style.fontSize = "1em";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }

    fieldset.appendChild(h4);

    fieldset.appendChild(claro);
    fieldset.appendChild(l1);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(oscuro);
    fieldset.appendChild(l2);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(altoCons);
    fieldset.appendChild(l3);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(createNode("br"));
    fieldset.appendChild(p);
    fieldset.appendChild(range);

    fieldset.appendChild(reset);

    document.body.appendChild(aside);

}

function confRegistro() {
    //Creamos un aside que contenga los datos del formulario
    let aside = createNode("aside");
    aside.style.marginTop = "210px";

    let fieldset = createNode("fieldset");
    let legend = createNode("legend", "Alta de Empleado");
    fieldset.appendChild(legend);
    aside.appendChild(fieldset);


    let l1 = createNode("label", "Nombre Completo");
    let iNombre = createNode("input");
    l1.style.fontWeight = "bold";

    iNombre.onblur = () => {
        if (iNombre.value == "") {
            alert("El nombre no puede estar vacío");
        }
    }

    let l2 = createNode("label", "Email Corporativo");
    let iEmail = createNode("input");
    l2.style.fontWeight = "bold";

    iEmail.onblur = () => {
        if (iEmail.value == "") {
            alert("El Email no puede estar vacío");
        }
    }

    let l3 = createNode("label", "Contraseña");
    let iPass = createNode("input");
    iPass.type = "password";
    l3.style.fontWeight = "bold";

    let numeros = /[0-9]/;
    let letras = /[a-zA-Z]/;
    let raros = /[$·%.,-~€¬@"&%Ç*+!¿?¡']/;

    iPass.onblur = () => {
        if (iPass.value == "") {
            alert("La contraseña no puede estar vacío");
        }
        if (iPass.value.length < 8) {
            alert("Debe tener al menos 8 caractere");
        }
        if (letras.test(iPass.value) == false) {
            alert("Debe tener mayúsulas y minñusculas");
        }
        if (numeros.test(iPass.value) == false) {
            alert("Debe contener números");
        }
        if (raros.test(iPass.value) == false) {
            alert("Debe contener simbolos raros");
        }


    }


    let l4 = createNode("label", "Confirmar Contraseña");
    let iCPass = createNode("input");
    iCPass.type = "password";
    l4.style.fontWeight = "bold";
    iCPass.onblur = () => {
        if (iCPass.value != iPass.value) {
            alert("La contraseña debera ser la misma que arriba");
        }
    }

    let l5 = createNode("label", "Fecha Contratación");
    let iFecha = createNode("input");
    iFecha.type = "date";
    l5.style.fontWeight = "bold";
    iFecha.onblur = () => {
        if (iFecha.value == "") {
            alert("Debes de seleccionar una fecha");
        }
    }

    let l6 = createNode("label", "Perfil Linkedin");
    let iLink = createNode("input");
    iLink.placeholder = "http://www.linkedin.com/...";
    iLink.id = "linkedin";
    l6.style.fontWeight = "bold";


    let link = /^https:linkedin.com\/+[a-zA-Z]/;
    let linkW = /^https:www.linkedin.com\/+[a-zA-Z]/;

    iLink.onblur = () => {
        if (iLink.value == "") {
            alert("El enlace a Linkedin no puede estar vacío");
        } else
            falloLink = link.test(iLink);
        if (falloLink == false) {
            error.innerText = "Linkedin no válido";
        } else {
            error.innerText = "BIEN";
        }
    }

    let l7 = createNode("label", "Acepto los términos");
    let iTerm = createNode("input");
    iTerm.type = "checkbox";
    l7.style.fontWeight = "bold";

    if (iTerm.checked == false) {
        alert("El checked tiene que estar seleccionado");
    }

    let l8 = createNode("label", "Habilidades Técnicas: ");
    let iHab = createNode("select");
    iHab.type = "multiple";
    l8.style.fontWeight = "bold";

    let registrar = createNode("button", "Registrar Empleado");
    registrar.style.marginTop = "15px";
    registrar.style.width = "100%";
    registrar.style.backgroundColor = "#007bff";
    registrar.style.color = "white";
    registrar.style.padding = "10px";
    registrar.style.border = "none";
    registrar.style.borderRadius = "5px";
    registrar.style.cursor = "pointer";

    //Añadir los campos
    fieldset.appendChild(l1);
    fieldset.appendChild(iNombre);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l2);
    fieldset.appendChild(iEmail);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l3);
    fieldset.appendChild(iPass);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l4);
    fieldset.appendChild(iCPass);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l5);
    fieldset.appendChild(iFecha);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l6);
    fieldset.appendChild(iLink);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l7);
    fieldset.appendChild(iTerm);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(l8);
    fieldset.appendChild(iHab);
    fieldset.appendChild(createNode("br"));

    fieldset.appendChild(registrar);

    document.body.appendChild(aside);

}

function confPlantilla() {

    //Creamos el h1
    let h1 = createNode("h2", "Plantilla Actual")

    //Creamos el botón para acceder a generar informe
    let bInfor = createNode("button", "Generar Informe");
    bInfor.style.width = "100px";
    bInfor.style.backgroundColor = "blue";
    bInfor.style.color = "white";

    document.body.appendChild(h1);
    document.body.appendChild(bInfor);


    bInfor.onclick = () => {
        let ventana = window.open(
            "src/informe.html",
            "Informe",
            "width=500,height=400,top=0,left=0"
        )
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
