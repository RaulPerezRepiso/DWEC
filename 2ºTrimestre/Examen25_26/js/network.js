let vNor = document.getElementById("load-terms").addEventListener("click", () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if ((xhr.readyState === 4) && (xhr.status === 200)) {

            document.getElementById("info-display").textContent = xhr.response;
        }
    };
    xhr.open("GET", "server/data/normativa.txt", true);
    xhr.send();

});

window.onload = function cargarXML() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Aquí procesamos el XML
                let xml = xhr.responseXML;

                let L01 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[0].textContent;
                let L02 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[1].textContent;
                let L20 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[2].textContent;
                let L21 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[3].textContent;
                let S30 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[4].textContent;
                let S31 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[5].textContent;
                let V40 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[6].textContent;
                let V41 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[7].textContent;
                let M50 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[8].textContent;
                let M51 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[9].textContent;
                let A60 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")[10].textContent;

                let categorias = document.getElementById("category-select");
                let option1 = createNode("option", L01);
                let option2 = createNode("option", L02);
                let option3 = createNode("option", L20);
                let option4 = createNode("option", L21);
                let option5 = createNode("option", S30);
                let option6 = createNode("option", S31);
                let option7 = createNode("option", V40);
                let option8 = createNode("option", V41);
                let option9 = createNode("option", M50);
                let option10 = createNode("option", M51);
                let option11 = createNode("option", A60);

                let xml1 = xml.getElementsByTagName("servicios_municipales")[0].getElementsByTagName("categoria")
                console.log(xml1.length);
                console.log(xml1[0].getAttribute("urgencia"));
                console.log(xml1[0].id);
                console.log(xml1[0]);
                console.log(xml1[0].getAttribute("urgencia") === "media")

                // NO HE CONSEGUIDO QUE FUNCIONAR ASÍ
                // for (let i = 0; i <= xml1.length; i++) {
                //     let opcion = "option" +i;
                //     if (xml1[i].getAttribute("urgencia") === "alta") {
                //         opcion.style.backgroundColor = "#e74c3c";
                //     } else if (xml1[i].getAttribute("urgencia") === "media") {
                //         opcion.style.backgroundColor = "#f7e925";
                //     } else {
                //         opcion.style.backgroundColor = "#27ae60";
                //     }
                // }

                option1.style.backgroundColor = "#e74c3c";
                option2.style.backgroundColor = "#f7e925";
                option3.style.backgroundColor = "#e74c3c";
                option4.style.backgroundColor = "#27ae60";
                option5.style.backgroundColor = "#e74c3c";
                option6.style.backgroundColor = "#27ae60";
                option7.style.backgroundColor = "#f7e925";
                option8.style.backgroundColor = "#f7e925";
                option9.style.backgroundColor = "#27ae60";
                option10.style.backgroundColor = "#27ae60";
                option11.style.backgroundColor = "#e74c3c";

                categorias.appendChild(option1);
                categorias.appendChild(option2);
                categorias.appendChild(option3);
                categorias.appendChild(option4);
                categorias.appendChild(option5);
                categorias.appendChild(option6);
                categorias.appendChild(option7);
                categorias.appendChild(option8);
                categorias.appendChild(option9);
                categorias.appendChild(option10);
                categorias.appendChild(option11);

            }
        }
    };

    xhr.open("GET", "server/data/categorias.xml", true);
    xhr.send();
};

let aCli = document.getElementById("load-weather").addEventListener("click", () => {
    fetch("server/data/clima.json")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("info-display").textContent =
                "Estación Meterológica: " + data.estacion_meteorologica +
                "\nCiudad: " + data.ubicacion.ciudad +
                "\nProvincia: " + data.ubicacion.provincia +
                "\nPaís: " + data.ubicacion.pais +
                "\nCoordenadas: Latitud:" + data.ubicacion.coordenadas.latitud + " Longitud: " + data.ubicacion.coordenadas.longitud +
                "\nFecha Actualización: " + data.fecha_actualizacion

            let div1 = createNode("div");
            div1.style.backgroundColor = "blue";
            let div2 = createNode("div");
            div2.style.backgroundColor = "gray";
            let div3 = createNode("div");
            div3.style.backgroundColor = "red";

            let p = createNode("p", "Temp: " + data.climatologia_actual.temperatura_c +
                "\nSensación Térmica: " + data.climatologia_actual.sensacion_termica_c +
                "\nHumedad: " + data.climatologia_actual.humedad_relativa +
                "\nPresión Atmosférica: " + data.climatologia_actual.presion_atmosferica_hpa +
                "\nVelocidad: " + data.climatologia_actual.viento.velocidad_kmh +
                "\nDirecciónn: " + data.climatologia_actual.viento.direccion +
                "\nDescripción: " + data.climatologia_actual.viento.descripcion +
                "\nPunto del Rocio: " + data.climatologia_actual.punto_rocio_c +
                "\nVisibilidad: " + data.climatologia_actual.visibilidad_m);
            p.style.color = "white";
            let p1 = createNode("p", "Amanecer: " + data.astronomia.amanecer +
                "\nAtardecer: " + data.astronomia.atardecer +
                "\nFase Lunar: " + data.astronomia.fase_lunar);
            p1.style.color = "white";

            div1.appendChild(p); +
                document.getElementById("info-display").appendChild(div1);
            div2.appendChild(p1); +
                document.getElementById("info-display").appendChild(div2);

            for (let i = 0; i < data.alertas.length; i++) {
                let p2 = createNode("p", "Nivel: " + data.alertas[i].nivel +
                    "\nTipo: " + data.alertas[i].tipo +
                    "\nDescripción: " + data.alertas[i].descripcion +
                    "\nInicio: " + data.alertas[i].inicio +
                    "\nFin: " + data.alertas[i].fin)
                p2.style.color = "white";
                div3.appendChild(p2); +
                    document.getElementById("info-display").appendChild(div3);

            }

        })
        .catch((err) => console.error(err));
});

window.onload = () => {
    fetch("server/usuarios.php/datos.php")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("server-log").textContent = data.status;
        })
        .catch((err) => console.error(err));
};



// FUNCIÓN PARA CREAR NODOS
function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesitas al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
    }

    return nodo;
}
