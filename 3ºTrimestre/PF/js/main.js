document.addEventListener("DOMContentLoaded", () => {

    console.log("JS cargado correctamente");

    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => {
            console.log("Estado de la respuesta:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);

            const random = Math.floor(Math.random() * data.length);
            const habito = data[random].title;

            document.getElementById("habito-dia").textContent = habito;
        })
        .catch(err => {
            console.error("ERROR FETCH:", err);
            document.getElementById("habito-dia").textContent = "Error cargando hábito";
        });

});
