//Nodos globales
let cliente = document.getElementsByClassName("radios")[0];
let chef = document.getElementsByClassName("radios")[1];
let error = document.getElementById("error");

let form = document.getElementsByTagName("form")[0];
console.log(form);

// No se porque pero no funciona el seleccionar
cliente.defaultChecked = true;
// chef.defaultChecked = true;
console.log(cliente.checked);
console.log(chef.checked);

let boton = createNode("input");
boton.type = "submit";

datosRegistro();
clienteOChef();

function datosRegistro() {
    //Nodos necesarios para la validación
    let lLogin = createNode("label", "Login: ");
    let login = createNode("input");
    login.required = true;
    login.id = "login";

    let lPass = createNode("label", "Password: ");
    let pass = createNode("input");
    pass.required = true;
    pass.type = "password"
    pass.id = "pass";


    //Controlar que aparezca o desaparezca la contraseña
    pass.addEventListener("mouseover", show);
    pass.addEventListener("mouseout", noshow);

    function show(event) {
        let pass = document.getElementById("pass");

        pass.type = "text";
    }

    function noshow(event) {
        let pass = document.getElementById("pass");

        pass.type = "password";
    }


    let lEmail = createNode("label", "Email: ");
    let email = createNode("input");
    email.required = true;
    email.type = "email";
    email.id = "email";


    let lCuenta = createNode("label", "Cuenta Bancaria: ");
    let cuenta = createNode("input");
    cuenta.required = true;
    // cuenta.style = ".moreWidth";
    cuenta.id = "cuenta";


    form.appendChild(lLogin);
    form.appendChild(login);
    form.appendChild(createNode("br"));

    form.appendChild(lPass);
    form.appendChild(pass);
    form.appendChild(createNode("br"));

    form.appendChild(lEmail);
    form.appendChild(email);
    form.appendChild(createNode("br"));

    form.appendChild(lCuenta);
    form.appendChild(cuenta);
    form.appendChild(createNode("br"));
}

function clienteOChef() {
    if (cliente.checked) {

        console.log("Foco en Cliente");

        form.appendChild(createNode("br"));
        form.appendChild(createNode("hr"));
        form.appendChild(createNode("br"));

        let lDir = createNode("label", "Dirección: ");
        let dir = createNode("input");
        dir.required = true;

        let lFecha = createNode("label", "Fecha de nacimiento: ");
        let fecha = createNode("input");
        fecha.type = "date";
        fecha.required = true;

        let lTlf = createNode("label", "Teléfono: ");
        let tlf = createNode("input");
        tlf.required = true;

        form.appendChild(lDir);
        form.appendChild(dir);
        form.appendChild(createNode("br"));

        form.appendChild(lFecha);
        form.appendChild(fecha);
        form.appendChild(createNode("br"));

        form.appendChild(lTlf);
        form.appendChild(tlf);
        form.appendChild(createNode("br"));

        form.appendChild(boton);


    } else if (chef.checked) {
        console.log("Foco en Chef");

        form.appendChild(createNode("br"));
        form.appendChild(createNode("hr"));
        form.appendChild(createNode("br"));

        let lNombre = createNode("label", "Nombre del establecimiento: ");
        let nombre = createNode("input");
        nombre.required = true;

        let lTipo = createNode("label", "Señes los tipos de comidas que puede servir: ");

        let op1 = createNode("input");
        op1.type = "checkbox";
        let lOp1 = createNode("label", "Casera");

        let op2 = createNode("input");
        op2.type = "checkbox";
        let lOp2 = createNode("label", "Carnes");

        let op3 = createNode("input");
        op3.type = "checkbox";
        let lOp3 = createNode("label", "Pescados");

        let op4 = createNode("input");
        op4.type = "checkbox";
        let lOp4 = createNode("label", "Pastas");

        let op5 = createNode("input");
        op5.type = "checkbox";
        let lOp5 = createNode("label", "Arroces");

        let op6 = createNode("input");
        op6.type = "checkbox";
        let lOp6 = createNode("label", "Internacional");

        let op7 = createNode("input");
        op7.type = "checkbox";
        let lOp7 = createNode("label", "Otras");

        form.appendChild(lNombre);
        form.appendChild(nombre);
        form.appendChild(createNode("br"));
        form.appendChild(createNode("br"));

        form.appendChild(lTipo);
        form.appendChild(createNode("br"));


        form.appendChild(createNode("br"));
        form.appendChild(op1);
        form.appendChild(lOp1);
        form.appendChild(op2);
        form.appendChild(lOp2);
        form.appendChild(op3);
        form.appendChild(lOp3);
        form.appendChild(op4);
        form.appendChild(lOp4);
        form.appendChild(op5);
        form.appendChild(lOp5);
        form.appendChild(op6);
        form.appendChild(lOp6);
        form.appendChild(op7);
        form.appendChild(lOp7);
        form.appendChild(createNode("br"));
        form.appendChild(createNode("br"));

        form.appendChild(boton);

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
}

function validarCampos() {

    //Campos
    let fecha = document.getElementById("fecha");


    // Confirmación
    if (!validarCuenta) {
        mostrarError("La cuenta no cumple los requisitos");
        return false;
    }

    if (!validarPass()) {
        mostrarError("La contraseña no cumple los requisitos");
        return false;
    } else {
        mostrarError("");
    }

    return true;
}

function validarPass() {
    let pass = document.getElementById("pass").value;

    let tieneMayus = /[A-Z]{2,}/.test(pass);
    let tieneNum = /[0-9]/.test(pass);
    let tieneLen = pass.length >= 8;

    return tieneMayus && tieneNum && tieneLen;
}

function validarCuenta() {

    let cuenta = document.getElementById("cuenta").value;

    const letras = /^[a-zA-Z]{2}/.test(cuenta);
    const numeros = /[0-9]{22}/.test(cuenta);

    return letras && numeros;

}


function mostrarError(mensaje) {
    error.innerText = mensaje;

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
