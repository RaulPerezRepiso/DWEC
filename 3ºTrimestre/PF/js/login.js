
let email = document.getElementById("email");
let pass = document.getElementById("password");

if(email==""){
    alert("No puede estar vacío");
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    window.location.href = "index.html";
});
