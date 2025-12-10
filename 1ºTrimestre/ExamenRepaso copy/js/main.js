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
}
let boton = document.getElementsByTagName("input")[0];
let pass = document.getElementsByTagName("input")[1];
let usu = document.getElementsByTagName("input")[2];

boton.onclick = () => {

  if (pass.value === "") {
    alert("El campo usuario está vacío");
    pass.style.border = "2px solid red";
  }

  if (usu.value === "") {
    alert("El campo usuario está vacío");
    usu.style.border = "2px solid red";
  }


}





