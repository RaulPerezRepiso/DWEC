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
let indice0 = document.getElementById("indice0");
let indice1 = document.getElementById("indice1");
let indice2 = document.getElementById("indice2");
let indice3 = document.getElementById("indice3");

document.getElementById("bDatosusuarios").onclick = () => {
    introducirIndice();
    introducirNombre();
    introducirEmail();
    introducirEdad();
}

class Persona {
    constructor(indice, nombre, email, edad, valido) {
        this.indnice = indice;
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
        this.valido = valido;
    }
}

function introducirIndice() {
    for (let i = 0; i <= datosUsuarios.length; i++) {
        let indice;
        indice += [i];
        indice = i;
    }
}

function introducirNombre() {

}


function introducirEmail() {

}


function introducirEdad() {

}


function introducirValido() {
    if (!introducirEmail)
        return false
    return true
}