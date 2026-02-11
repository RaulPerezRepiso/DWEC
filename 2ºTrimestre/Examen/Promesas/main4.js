function procesarUsuario(nombre) {
    return new Promise((resolve, reject) => {
        if (!nombre) {
            reject("Error: debes escribir un nombre");
            return;
        }

        setTimeout(() => {
            resolve({
                nombre,
                longitud: nombre.length,
                mensaje: `Hola ${nombre}, tus datos han sido procesados`
            });
        }, 2000);
    });
}

document.getElementById("btn").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const salida = document.getElementById("resultado");

    salida.textContent = "Procesando datos...";

    procesarUsuario(nombre)
        .then(datos => {
            salida.textContent =
                datos.mensaje +
                "\nLongitud del nombre: " + datos.longitud;
        })
        .catch(error => {
            salida.textContent = error;
        });
});
