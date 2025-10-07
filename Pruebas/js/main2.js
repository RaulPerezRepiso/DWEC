let info = document.getElementById("info");
let obj1 = {
    nombre: "Pepe",
    edad: 34,
    email: "pepe@mail.com"
};

// Define propiedades para los objetos Writable hace que se puedan modificar valores, enumerable que salga en la consola y valor el valor que le queremos dar a esa propiedad nueva
Object.defineProperty(obj1, "color", { writable: true, enumerable: true, value: "red" });
obj1.color = "yellow";

let obj2 = new Object({
    nombre: "Ana",
    edad: 25,
    email: "ana@mail.com"
});

// Podemos definir varias propiedas usando Properties
Object.defineProperties(obj2, {
    "color": { writable: true, enumerable: true, value: "blue" },
    "notas": { writable: true, enumerable: true, value: [6, 7, 8] }
});

// Añade una variable con el valor asociado
obj2.tlf = "666777888";

// Object.getPrototypeOf y Object.setPrototypeOf Trae y da valor al objeto

// Object.preventExtensions impide asignar nuevos valores al objeto
Object.preventExtensions(obj2);
obj2.colordefondo = "green";


// Borra el valor de la variable
delete obj2.tlf;

info.innerHTML += "Datos de Pepe: " + obj1.nombre + ", " + obj1.edad + ", " + obj1.email + " " + obj1.color + "<br>";
info.innerHTML += "obj1.nombre es enumerable:  " + obj1.nombre.enumerable + "<br>";

info.innerHTML += "<hr>Datos de Ana: " + obj2.nombre + ", " + obj2.edad + ", " + obj2.email + " Tlf: " + obj2.tlf + " " + obj2.color + "<br>";
info.innerHTML += "obj2.nombre es enumerable:  " + obj2.nombre.enumerable + "<br>";

console.log("Recorriendo obj1: ")
for (prop in obj1)
    console.log(obj1[prop]);

console.log("Recorriendo obj2: ")
for (prop in obj2)
    console.log(obj2[prop]);

info.innerHTML += "<br>Datos de obj1: " +Object.keys(obj1);

info.innerHTML += "<hr>Datos de obj2: " +Object.keys(obj2);


/* for of NO sirve para objetos pero si en la llamda de objetos dentro de keys
for(prop of obj1)
    console.log[prop]; */

// Usamos el for of porque saca el objeto directo por el que estamos haciendo la pregunta
console.log("Recorriendo obj2: ")
for (prop of Object.keys(obj2))
    console.log("Propiedad "+prop +". Value: "+obj2[prop]);

// Propiedad para ver si se puede añadir algo o no al Obj2
if(Object.isExtensible(obj2))
    obj2.colordefondo = "green";
else alert("No es extensible");

// Restrictivo no deja ni borrar ni añadir
Object.seal(obj2);

// Permite preguntar si el objeto es modificable o no
if(!Object.isSealed(obj2))
    delete obj2.nombre;
else alert("No es Modificable");

delete obj2.notas

// Congela el objeto NO deja modificarlo
Object.freeze(obj2);

if(!Object.isFrozen(obj2))
    delete obj2.nombre;
else alert("Esta congelado");

console.log("Recorriendo obj2: ")
for (prop of Object.keys(obj2))
    console.log("Propiedad "+prop +". Value: "+obj2[prop]);

