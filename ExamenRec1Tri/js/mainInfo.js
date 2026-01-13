function cargarInforme(datos) {
  // Total empleados
  document.getElementById("total").textContent = datos.length;

  // Fecha actual
  document.getElementById("fecha").textContent =
    "Fecha informe: " + new Date().toLocaleString();

  // Tabla
  let tbody = document.getElementById("empleados");
  tbody.innerHTML = ""; // limpiar por si acaso

  datos.forEach((emp) => {
    let tr = document.createElement("tr");

    let tdNombre = document.createElement("td");
    tdNombre.textContent = emp.nombre;

    let tdEficiencia = document.createElement("td");
    tdEficiencia.textContent = emp.eficiencia + "%";

    tr.appendChild(tdNombre);
    tr.appendChild(tdEficiencia);

    tbody.appendChild(tr);
  });
}
