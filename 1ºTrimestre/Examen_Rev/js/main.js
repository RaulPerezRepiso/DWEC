let ventana = null;

//Abrimos la ventana -> Tambien podemos hacer si da muchos errores window.onload
// No me funciona el document.body.onload (REVISAR EN CASA)
window.onload = function () {
  // Ruta, Nombre, Tamaño|Posición
  ventana = window.open(
    "registro.html",
    "Registro",
    "width=500,height=400,top=100,left=100"
  );
};
let boton = document.getElementsByTagName("input")[2];
let pass = document.getElementsByTagName("input")[1];
let usu = document.getElementsByTagName("input")[0];

boton.onclick = () => {
  let valido = true;

  if (pass.value === "") {
    alert("El campo Contraseña está vacío");
    pass.style.border = "2px solid red";
    valido = false;
  }

  if (usu.value === "") {
    alert("El campo Usuario está vacío");
    usu.style.border = "2px solid red";
    valido = false;
  }

  let usuValido = usu.valu === "encargado" || usu.value ==="empleado";

  if (!usuValido) {
    alert("Usuario " +usu.value +" no válido");
    return;
  }

  window.close();
};
