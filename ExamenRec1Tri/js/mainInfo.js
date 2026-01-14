//Controlamos que el mainInfo se este cargando correctamente
console.log("mainInfo.js cargado");

//Cogemos los datos de la ventana padre
window.cargarInforme = function (datos) {

  //Cargamos el número de datos del array con length para el número total de empleados
  document.getElementById("total").innerText = datos.length;

  //Sacamos la Fecha y Hora actual a la que se ha generado el informe
  document.getElementById("fecha").textContent =
    "Fecha informe: " + new Date().toLocaleString();

  let tbody = document.getElementById("empleados");

  //Creamos la tabla en funcione de numero de empleados que haya
  datos.forEach((emp) => {
    let tr = document.createElement("tr");

    let tdNombre = document.createElement("td");
    tdNombre.textContent = emp.nombre;

    let tdEficiencia = document.createElement("td");
    tdEficiencia.textContent = emp.eficiencia + "%";

    //Y los añadimos a la tabla 
    tr.appendChild(tdNombre);
    tr.appendChild(tdEficiencia);

    //Y luego al body
    tbody.appendChild(tr);
  });
};
