// declaramos constantes de elementos que necesitaremos
const inputsTema = document.getElementsByName("tema");
const rangeFuente = document.getElementById("tamañoFuente");
const globalError = document.getElementById("er");
const submitButton = document.getElementById("submitButton");
const inputPassword = document.getElementById("password");

// declaramos variables
let temaActual = "claro";
let currentTimeout = null;
let passwordList = null;
let passwordHasErrors = false;
let empleados = [];
let ids = 0;

// control de los inputs radio del tema
inputsTema.forEach((input) => {
    input.addEventListener("click", () => {
        const value = input.value;

        // hacemos un try catch para controlar
        // la excepcion de si un tema es igual al actual
        try {
            if (value === temaActual) {
                // lanzamos excepcion si son iguales
                throw new Error("Tema ya seleccionado");
            }

            // reseteamos los valores a por defecto
            temaActual = value;
            document.body.style.backgroundColor = null;
            document.body.style.color = null;
            document.body.classList.remove("dark-mode");

            switch (value) {
                case "oscuro":
                    document.body.classList.add("dark-mode");
                    break;
                case "contraste":
                    document.body.style.backgroundColor = "black";
                    document.body.style.color = "yellow";
                    break;
            }
        } catch (error) {
            // en caso de error mostramos un mensaje
            mostrarError(error.message);
        }
    });
});

// funcion para mostrar un error por 3 segundos en pantalla
function mostrarError(message) {
    globalError.textContent = message;
    if (currentTimeout) clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
        globalError.textContent = "";
        currentTimeout = null;
    }, 3000);
}

// funcion para limpiar el error
function limpiarError() {
    globalError.textContent = "";
    currentTimeout = null;
}

// control del input range del tamaño de fuente
rangeFuente.addEventListener("input", (e) => {
    const tamaño = e.target.value;
    document.body.style.fontSize = tamaño + "px";
});

// controlar el reseteo del formulario
form.addEventListener("reset", () => {
    document.body.style = null;
    document.body.classList.remove("dark-mode");
    temaActual = "claro";
    limpiarError();
});

if (submitButton) {
    // damos estilo al boton de submit
    submitButton.style = `
        margin-top: 15px;
        width: 100%;
        background: #007bff;
        color: white;
        padding: 10px;
        border: none;
        cursor:pointer;
    `;
}

inputPassword.addEventListener("input", (e) => {
    const value = e.target.value;

    if (!value && passwordList) {
        passwordList.remove();
        passwordList = null;
        return;
    }

    // regex de cada una de las validaciones
    const uppercases = /[A-Z]/;
    const lowercases = /[a-z]/;
    const numbers = /[0-9]/;
    const simbols = /[$%&_-]/;

    // creamos la lista si no existe
    if (!passwordList) {
        passwordList = createNode("ul");
        inputPassword.parentNode.insertBefore(passwordList, inputPassword);
    } else {
        // si existe la vaciamos
        passwordList.innerHTML = "";
    }

    // creamos un array para añadir las validaciones
    const nodes = [];

    nodes.push({
        label: "Debe tener mayúsculas",
        checked: uppercases.test(value),
    });

    nodes.push({
        label: "Debe tener minúsculas",
        checked: lowercases.test(value),
    });

    nodes.push({
        label: "Debe tener números",
        checked: numbers.test(value),
    });

    nodes.push({
        label: "Debe tener símbolos",
        checked: simbols.test(value),
    });

    nodes.push({
        label: "Debe tener una longitud mínima de 8 caracteres",
        checked: value.length >= 8,
    });

    // creamos el li de cada validacion
    nodes.forEach((node) => {
        const li = createNode("li", node.label, passwordList);
        li.style.color = node.checked ? "green" : "red";
        li.style.textDecoration = node.checked ? "line-through" : "none";
    });

    // seteamos el valor a passwordHasErrors a true cuando haya algun
    // error en la validacion a la contraseña
    passwordHasErrors = !nodes.every((node) => node.checked == true);
});

// validacion de formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get("nombre");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const fecha = data.get("fecha");
    const linkedin = data.get("linkedin");
    const skillList = document.querySelector("#skills");
    const skills = Object.values(skillList.selectedOptions).map(
        (option) => option.value
    );

    // validamos que haya mas de una skill
    if (skills.length == 0) {
        mostrarError("Debes seleccionar al menos una habilidad");
        return;
    }

    const now = new Date();
    const date = new Date(fecha);
    const antiguedad = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    // regexs para la validacion de la url a linkedin
    const linkedinRegex = /^https:\/\/linkedin.com\/\S+$/;
    const linkedinRegex2 = /^https:\/\/www.linkedin.com\/\S+$/;
    if (!linkedinRegex.test(linkedin) && !linkedinRegex2.test(linkedin)) {
        mostrarError("URL de linkedin inválida");
        return;
    }

    // comprobamos que no haya errores en la validacion de la contraseña
    if (passwordHasErrors) {
        mostrarError("Contraseña inválida");
        return;
    }

    // comprobamos que la contraseña y la confirmacion de contraseña sean iguales
    if (password !== confirmPassword) {
        mostrarError("Las contraseñas no coinciden");
        return;
    }

    // hacemos push a empleados añadiendole un ID
    // autonumerico para controlar mejor las despedidas de empleados
    empleados.push({
        id: ids++,
        nombre,
        email,
        password,
        fecha,
        linkedin,
        antiguedad,
        skills,
        eficiencia: Math.random() * 100, // generamos la eficiencia del empleado de manera random
    });

    // recargamos las tarjetas
    recargarTarjetas();
});

// function para crear la tarjeta de un empleado
function crearTarjetaEmpleado(empleado) {
    const a = createNode("article", "", document.body);
    a.classList.add("card");
    if (empleado.clonado) {
        a.style.opacity = 0.7;
    }
    const title = createNode("div", "", a);
    createNode("h3", empleado.nombre, title);
    createNode("br", "", title);
    createNode(
        "small",
        `${empleado.email} | Antiguedad: ${empleado.antiguedad} días`,
        title
    );
    createNode("br", "", a);
    createNode("hr", "", a);
    createNode("br", "", a);
    const rendimiento = createNode("div", "Rendimiento anual:", a);
    createNode("progress", "", rendimiento, {
        value: empleado.eficiencia / 100,
    });
    createNode("br", "", a);
    createNode("h4", "Habilidades:", a);
    const list = createNode("ul", "", a);
    empleado.skills.forEach((skill) => {
        createNode("li", SKILLS[skill], list);
    });
    createNode("br", "", a);
    if (!empleado.clonado) {
        createNode("button", "Clonar", a, {
            id: "clonar",
        }).addEventListener("click", () => {
            empleados.push({
                ...empleado,
                id: ids++,
                clonado: true,
            });
            recargarTarjetas();
        });
        createNode("button", "Despedir", a, {
            id: "despedir",
        }).addEventListener("click", () => {
            empleados = empleados.filter((e) => e.id !== empleado.id);
            recargarTarjetas();
        });
    }
}

// funcion para vaciar y crear las tarjetas.
function recargarTarjetas() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.remove());
    empleados.forEach((empleado) => {
        crearTarjetaEmpleado(empleado);
    });
}

// creamos el boton para generar informes
const generateButton = createNode("button", "Generar Informe", document.body);
generateButton.style = `
    padding: 10px;
    width: fit-content;
    margin-left: auto;
    background-color: lightblue;
    border: none;
    cursor: pointer;
`;

generateButton.addEventListener("click", () => {
    // abrimos nueva ventana
    const informe = window.open(
        "/src/informe.html",
        "_blank",
        "width=500,height=400"
    );

    // esperamos a que la ventana cargue
    informe.addEventListener("DOMContentLoaded", () => {
        // enviamos evento a la ventana informes con los empleados no clonados
        informe.dispatchEvent(
            new CustomEvent("enviarEmpleados", {
                detail: empleados.filter((e) => !e.clonado),
            })
        );
    });
});
