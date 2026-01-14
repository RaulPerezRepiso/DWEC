let info = document.getElementById("info");

//Al enlace le damos evento para que al clickarlo acceda el txt
document.getElementById("leeTxt").addEventListener("click", () => {
    // Nombre de variable de XML HTTP REQUEST
    let xhr = new XMLHttpRequest();

    xhr.responseType = "blob";
    // Preparamos la función lista para la respuesta
    xhr.onreadystatechange = function () {

        console.log("Estado: " + xhr.readyState + ". Nivel: " + xhr.status);

        if ((xhr.readyState == 4) && (xhr.status == 200)) {

            document.getElementById("audio1").src = URL.createObjectURL(xhr.response);
            document.getElementById("audio1").play();

            console.log(this.getAllResponseHeaders());

        }

    }

    // Método  que establece al conexión mediante una petición HTTP (En este caso direccion vhost)
    xhr.open("GET", "http://www.pruebasjs.es/sounds/music.wav");
    xhr.send();

});