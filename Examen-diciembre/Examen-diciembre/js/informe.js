const totalEmpleados = document.querySelector("#total");
const fechaInforme = document.querySelector("#fecha");
const empleadosTBody = document.querySelector("#empleados");

window.addEventListener("enviarEmpleados", (data) => {
    const empleados = data.detail;
    if (!empleados) return;

    totalEmpleados.textContent = empleados.length;
    fechaInforme.textContent += ` ${new Date().toLocaleDateString()}`;

    empleados.forEach((empleado) => {
        const tr = createNode("tr", "", empleadosTBody);
        createNode("td", empleado.nombre, tr);
        createNode("td", Math.round(empleado.eficiencia), tr);
    });
});

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
