function paso1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Paso 1 completado"), 1000);
    });
}

function paso2() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Paso 2 completado"), 1000);
    });
}

function paso3() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Paso 3 completado"), 1000);
    });
}

document.getElementById("btn").addEventListener("click", () => {
    const salida = document.getElementById("resultado");
    salida.textContent = "Ejecutando pasos...";

    paso1()
        .then(msg => {
            salida.textContent = msg;
            return paso2();
        })
        .then(msg => {
            salida.textContent += "\n" + msg;
            return paso3();
        })
        .then(msg => {
            salida.textContent += "\n" + msg + "\nTodos los pasos completados";
        });
});
