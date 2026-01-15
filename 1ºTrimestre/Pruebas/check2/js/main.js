const datosUsuarios = [
    "Nombre:  Ana García, Email: ana.garcia@example.com, FechaNac: 1995-10-25",
    "Nombre: luis pérez, Email: luisperez@dominio.net, FechaNac: 2005-01-05",
    "Nombre:  MARTA FERNÁNDEZ, Email: marta.fdez-INVALID, FechaNac: 1980-03-15", // Inválido
    "Nombre: pepe lopez, Email: pepe.lopez@example.es, FechaNac: 1978/11/02" // Formato de fecha diferente
];

const regexEmail = /^\S+@\S+\.\S+$/; // \S --> todo lo que no sea un espacio, una @ algo sin espacios, un punto y algo sin espacios

/********************************************************************************* */
//Abrir la página web
document.getElementById("bDoc").onclick = () => {
    window.open(
        "https://developer.org/es/docs/Web/JavaScript"
    );
}

//Bóton que introduce todo en la tabla
const tabla = document.getElementById("tablaDatos");
  document.getElementById("indice0").innerHTML = "hola";


document.getElementById("bDatosusuarios").onclick = () => {
    for (let usuario = 0; usuario < datosUsuarios.length; usuario++) {

        // Mostrar Índice:
        let datosUsuario = datosUsuarios[usuario].split(",");
        document.getElementById("indice" + usuario).innerHTML = usuario+1;

        // Obtenemos el nombre
        let nombre = datosUsuario[0].split(":")[1].trim().toUpperCase();
        document.getElementById("nombre" + usuario).innerHTML = nombre;

        // Obtenemos el correo
        let correo = datosUsuario[1].split(":")[1].trim();
        document.getElementById("email" + usuario).innerHTML = correo;

        // Para hacerlo con test hacemos. - regexEmail.test(correo)
        if (correo.match(regexEmail)) {
            document.getElementById("valido" + usuario).innerHTML = "Válido";
        } else {
            document.getElementById("valido" + usuario).innerHTML = "NO Válido";
        }

        // Obtenemos la edad
        let fechaNac = new Date(datosUsuario[2].split(":")[1].trim());
        let anoNow = new Date().getFullYear();

        if (fechaNac)
            document.getElementById("edad" + usuario).innerHTML = anoNow - fechaNac.getFullYear();
        else
            document.getElementById("edad" + usuario).innerHTML = "<b>Fecha no admitida</b>";

    }
}

/* document.getElementById("bDatosusuarios").onclick = () => {
    indice();
    nombre();
    email();
    edad();
}

function indice() {
    for (let usuario = 0; usuario < datosUsuarios.length; usuario++) {

        // Mostrar Índice:
        document.getElementById("indice" + usuario).innerHTML = usuario;
    }
}

function nombre() {

    for (let usuario = 0; usuario < datosUsuarios.length; usuario++) {

        let datosUsuario = datosUsuarios[usuario].split(",");

        // Obtenemos el nombre
        let nombre = datosUsuario[0].split(":")[1].trim().toUpperCase();
        document.getElementById("nombre" + usuario).innerHTML = nombre;
    }
}

function email() {

    for (let usuario = 0; usuario < datosUsuarios.length; usuario++) {

        let datosUsuario = datosUsuarios[usuario].split(",");

        // Obtenemos el correo
        let correo = datosUsuario[1].split(":")[1].trim();
        document.getElementById("email" + usuario).innerHTML = correo;

        if (correo.match(regexEmail)) {
            document.getElementById("valido" + usuario).innerHTML = "Válido";
        } else {
            document.getElementById("valido" + usuario).innerHTML = "NO Válido";
        }
    }
}

function edad() {

    for (let usuario = 0; usuario < datosUsuarios.length; usuario++) {

        let datosUsuario = datosUsuarios[usuario].split(",");

        // Obtenemos la edad
        let fechaNac = new Date(datosUsuario[2].split(":")[1].trim());
        let anoNow = new Date().getFullYear();

        if (fechaNac)
            document.getElementById("edad" + usuario).innerHTML = anoNow - fechaNac.getFullYear();
        else
            document.getElementById("edad" + usuario).innerHTML = "<b>Fecha no admitida</b>";
    }
}  */
