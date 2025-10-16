// Varirables
let tipoCafe = document.getElementById("tipoCafe");
let cantidad = document.getElementById("cantidad");
let paraLlevar = document.getElementById("paraLlevar");
let procesarPedido = document.getElementById("procesarPedido");
let resultado = document.getElementById("resultado");

procesarPedido.onclick = () => {

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


    if (cantidad.value >= 5) {
        let valor = total
        total = total - (valor * 0.1);
    }

    if (paraLlevar.checked) {
        total = total + (cantidad.value * 0.2);
        resultado.innerText = "Han pedido " + cantidad.value + " café(s) " + tipoCafe.value + ". (para llevar)" +
            "\nTotal a pagar: " + total;
    } else {
        total = total + (cantidad.value * 0.2);
        resultado.innerText = "Han pedido " + cantidad.value + " café(s) " + tipoCafe.value +
            "\nTotal a pagar: " + total;
    }

}