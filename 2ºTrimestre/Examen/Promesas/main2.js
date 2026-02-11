function comprobarNombre(nombre) {
    return new Promise((resolve, reject) => {
        if (!nombre) {
            reject("Error: el nombre está vacío");
            return;
        }

        setTimeout(() => {
            resolve("Nombre válido: " + nombre);
        }, 1500);
    });
}

document.getElementById("btn").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const salida = document.getElementById("resultado");

    salida.textContent = "Comprobando...";

    comprobarNombre(nombre)
        .then(msg => salida.textContent = msg)
        .catch(err => salida.textContent = err);
});
