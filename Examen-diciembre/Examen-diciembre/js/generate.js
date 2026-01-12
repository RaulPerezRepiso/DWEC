// creacion de elementos
const body = document.body;
const aside = createNode("aside", "", body);
const form = createNode("form", "", aside);

// constante para declarar las habilidades que puede tener un empleado
const SKILLS = {
    nodejs: "NodeJS",
    python: "Python",
    java: "Java",
    sql: "SQL",
};

// funcion para generar el primer fieldset
function generateFirstFieldset() {
    const f = createNode("fieldset", "", form);
    createNode("legend", "Confguración visual", f);
    createNode("h4", "Tema de interfaz:", f);
    createNode("br", "", f);
    createNode("input", "", f, {
        type: "radio",
        id: "claro",
        name: "tema",
        value: "claro",
        defaultChecked: true,
    });
    createNode("label", "Claro", f, {
        htmlFor: "claro",
    });
    createNode("br", "", f);
    createNode("input", "", f, {
        type: "radio",
        id: "oscuro",
        value: "oscuro",
        name: "tema",
    });
    createNode("label", "Oscuro", f, {
        htmlFor: "oscuro",
    });
    createNode("br", "", f);
    createNode("input", "", f, {
        type: "radio",
        id: "contraste",
        value: "contraste",
        name: "tema",
    });
    createNode("label", "Alto Contraste", f, {
        htmlFor: "contraste",
    });
    createNode("br", "", f);
    createNode("br", "", f);
    createNode("input", "", f, {
        type: "range",
        id: "tamañoFuente",
        name: "tamañoFuente",
        min: 10,
        max: 24,
        defaultValue: 16,
    });
    createNode("br", "", f);
    createNode("br", "", f);
    createNode("button", "Resetear la configuracion", f, {
        type: "reset",
    });
}
generateFirstFieldset();

// funcion para generar el segundo fieldset
function generateSecondFieldset() {
    const f = createNode("fieldset", "", form);
    createNode("legend", "Alta de Empleado", f);
    createNode("label", "Nombre completo:", f, {
        htmlFor: "nombre",
    });
    createNode("input", "", f, {
        type: "text",
        id: "nombre",
        name: "nombre",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Email Corporativo", f, {
        htmlFor: "email",
    });
    createNode("input", "", f, {
        type: "email",
        id: "email",
        name: "email",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Contraseña", f, {
        htmlFor: "password",
    });
    createNode("input", "", f, {
        type: "password",
        id: "password",
        name: "password",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Confirmar Contraseña", f, {
        htmlFor: "confirmPassword",
    });
    createNode("input", "", f, {
        type: "password",
        id: "confirmPassword",
        name: "confirmPassword",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Fecha Contratación", f, {
        htmlFor: "fecha",
    });
    createNode("input", "", f, {
        type: "date",
        id: "fecha",
        name: "fecha",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Perfil Linkedin", f, {
        htmlFor: "linkedin",
    });
    createNode("input", "", f, {
        type: "text",
        placeholder: "https://linkedin.com/...",
        id: "linkedin",
        name: "linkedin",
        required: true,
    });
    createNode("br", "", f);
    createNode("label", "Acepto los térmninos", f, {
        htmlFor: "terms",
    });
    createNode("input", "", f, {
        type: "checkbox",
        id: "terms",
        name: "terms",
        required: true,
    });
    createNode("br", "", f);
    createNode("br", "", f);
    createNode("label", "Habilidades Técnicas:", f, {
        htmlFor: "skills",
    });
    createNode("br", "", f);
    const select = createNode("select", "", f, {
        name: "skills",
        id: "skills",
        multiple: true,
    });
    // obtenemos las llaves para seguidamente hacerle un forEach e insertarlas en el select
    Object.keys(SKILLS).forEach((skill) => {
        createNode("option", SKILLS[skill], select, {
            value: skill,
        });
    });
    createNode("br", "", f);
    createNode("button", "Registrar empleado", f, {
        type: "submit",
        id: "submitButton",
    });
}
generateSecondFieldset();

function createNode(type, content, padre, attrs) {
    const node = document.createElement(type);
    node.textContent = content;
    if (padre) {
        padre.appendChild(node);
    }

    if (attrs) {
        const keys = Object.keys(attrs);
        keys.forEach((key) => {
            node[key] = attrs[key];
        });
    }

    return node;
}
