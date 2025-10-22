console.log("Ventana padre " + this.parent);

let login = document.getElementById("loginText");
let pass = document.getElementById("passText");

document.getElementById("bEnviar").onclick = () => {
    window.opener.document.getElementById("texto").value = "Login: " +login.value+ ". \nPassword: "+ pass.value;

}