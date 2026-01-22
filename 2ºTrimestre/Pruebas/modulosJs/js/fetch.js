let info = document.getElementById("info");

var alumno = new Object();

alumno.name = "Pepe";
alumno.age = 19;
alumno.course = 2;
alumno.fp = "DAW";

document.getElementById("leeTxt").addEventListener("click", () => {

    // const resp = fetch("http://www.pruebasjs.es/server/hello.text");

    // Hacemos un fetch con 2 promesas para cargar la información del archivo de texto plano
    // fetch("http://www.pruebasjs.es/server/hello.txt", {
    // fetch("http://www.pruebasjs.es/server/hello.php", {
    fetch("http://www.pruebasjs.es/server/animales.json", {
        // Si usamos el GET nos podemos ahorra el method porque lo usa por defecto 
        // al igual que el body no haria falta porque no le llegan datos al fetch
        method: "POST",
        // headers: { "Content-Type": "applicaion/x-www-form-unrelcoded" },
        headers: { "Content-Type": "application/json" },
        // body: "usuario=Pepe&pass=1234"
        body: JSON.stringify(alumno)
    })
        .then(function (resp) {
            if (resp.ok) {
                info.innerHTML = "Respuesta: " + resp;
                console.log(resp);

                //Imagenes pdfs, sonido, word, imagenes...
                // resp.blob()
                // resp.text()

                resp.json()
                    .then(function (data) {
                        // info.innerHTML = "Recibido: " + data.name + "con edad: " + data.age;
                        info.innerHTML = "Animal: " + data.animales[0].nombre;
                    })
                    .catch(function (err) {
                        info.innerHTML = "ERROR: " + err;
                    });

                console.log("Resp2: " + resp2.json());
            }
        })
        .catch(function (err) {
            info.innerHTML = "Error " + err;
        });

});