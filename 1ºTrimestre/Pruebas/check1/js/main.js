// Varirables
let tipoCafe = document.getElementById("tipoCafe");
let cantidad = document.getElementById("cantidad");
let paraLlevar = document.getElementById("paraLlevar");
let procesarPedido = document.getElementById("procesarPedido");
let resultado = document.getElementById("resultado");

procesarPedido.onclick = () => {

    let precio = 0;
    let total = 0;

    if (tipoCafe.value == "solo") {
        precio = 1.5;
        total = 1.5 * cantidad.value
    } else if (tipoCafe.value == "leche") {
        precio = 2;
        total = 2 * cantidad.value
    } else {
        precio = 2.5;
        total = 2.5 * cantidad.value
    }

    if (paraLlevar.checked) { total += cantidad.value * 0.2; }
    if (cantidad.value >= 5) { total -= total * 0.1; }

    let variable = paraLlevar.checked ? ". (para llevar)" : "";
    resultado.innerText = "Has pedido " + cantidad.value + " café(s) " + tipoCafe.value + variable +
        "\nTotal a pagar: " + total;
}