let color;
let x;
let y;
let diametro;
let nombre;
let tipo = "";
let profundidad;
let escala;
let widthScreen=window.innerWidth;
let heightScreen=window.innerHeight;
// el 17% de la pantalla que es lo que ocupa el menu
let ancho = widthScreen*0.17;
let arrayPlanetas = [];

console.log(heightScreen);

document.getElementById("insertar").onclick = function() { 
    if(guardarValores()){ 
        crearPlaneta();
        rellenaNombres();        
    }
}   

// funcion que rellena los nombres del array
function rellenaNombres() {
    // borro todos los nombres que ya haya
    document.getElementById("nombres").innerHTML = "";
    // recorro el array con los planetas y vuelvo a introducir todos los nombres
    arrayPlanetas.forEach(element => {
        let nuevoNombre = createNode("button", element.textContent);
        nuevoNombre.style.display = "block";
        nuevoNombre.style.marginTop="2%";
        nuevoNombre.id=element.textContent;

        nuevoNombre.onclick = function() {
            cambiarValores(element);
        };

        document.getElementById("nombres").appendChild(nuevoNombre);
    });
}

// funcion que pone el div pulsado el primero en la tabla y cambia sus valores
function cambiarValores(div) {
    // guardo las variables en un array para luego asignarselas al div introducido
    // valores del 1
    let divUno = arrayPlanetas[0];
    let xNuevo = parseInt(divUno.style.left);
    let yNuevo = parseInt(divUno.style.top);
    let escalaNuevo = divUno.style.transform;

    // valores del elemento clicado
    let xClic = parseInt(div.style.left);
    let yClic = parseInt(div.style.top);
    let escalaClic = div.style.transform;

    // cambiar los valores del clicado por los del 1
    div.style.left = xNuevo + "px";
    div.style.top = yNuevo + "px";
    div.style.transform=escalaNuevo;

    // cambiar los valores del 1 por los del clicado
    divUno.style.left = xClic + "px";
    divUno.style.top = yClic + "px";
    divUno.style.transform= escalaClic;

    // para meter el div dado de su posicion y meterlo en la 0
    let index = arrayPlanetas.indexOf(div);
    if(index>-1){
        arrayPlanetas.splice(index, 1);
        arrayPlanetas.unshift(div);
        rellenaNombres();
    }
}

// funcion que crea el div con los atributos introducidos
function crearPlaneta() {
    let nuevoDiv = createNode("div",nombre);
    // ajustar el color y hacerlo redondo
    nuevoDiv.style.backgroundColor = color;
    nuevoDiv.style.borderRadius = "50%";
    tipo == "satelite" ? nuevoDiv.style.border = "5px solid white" : "";

    // el valor introducido de string lo convierte en int
    x=parseInt(x);
    // para ponerla en la posicion introducida
    nuevoDiv.style.position="absolute";
    nuevoDiv.style.left=(ancho+x)+"px";
    nuevoDiv.style.top=y+"px";

    // para ajustar el diametro introducido
    nuevoDiv.style.width = diametro + "px";
    nuevoDiv.style.height = diametro + "px";

    // estilos del texto del nombre
    nuevoDiv.style.color = "white";
    nuevoDiv.style.textAlign = "center";
    nuevoDiv.style.fontSize= "3em";
    
    // profundidad aleatoria
    nuevoDiv.style.transform = "scale("+escala+")";

    arrayPlanetas.push(nuevoDiv);
    document.body.appendChild(nuevoDiv);
}

// valida y guarda en las variables los valores introducidos
function guardarValores() {

    color = document.getElementById("eligeColor").value;
    x = document.getElementById("x").value;
    y = document.getElementById("y").value;
    diametro = document.getElementById("diametro").value;
    nombre = document.getElementById("nombre").value;
    profundidad = Math.floor(Math.random()*101);
    escala = 0.1 + (profundidad / 100) * 0.9

    let error = document.getElementById("error");
    error.innerText=""
    error.style.display = "none";
    // si es distinto a numeros devuelve false
    let regExp = /^[0-9]+$/;
    if(!regExp.test(x)) {
        error.style.display = "inherit";
        error.innerText="Valor X mal introducido";
        return false;
    }
    else if(!regExp.test(y)) {
        error.style.display = "inherit";
        error.innerText="Valor Y mal introducido";
        return false;
    }
    else if(!regExp.test(diametro)){ 
        error.style.display = "inherit";
        error.innerText="Valor diámetro mal introducido";
        return false;
    }
    else if(x>widthScreen||y>heightScreen){ 
        error.style.display = "inherit";
        error.innerText="El valor x o y son mayores de lo permitido (" + widthScreen + "x" + heightScreen +")";
        return false;
    }
    else if(nombre=="") {
        error.style.display = "inherit";
        error.innerText="Nombre no puede estar vacío";
        return false;
    }

    // sacar el radio seleccionado
    radioArray = document.getElementsByName("plan");
    radioArray.forEach(element => {
        if(element.checked) tipo=element.value;
    });

    if(tipo=="") {
        error.style.display = "inherit";
        error.innerText="Debes seleccionar que tipo de planeta quieres";
        return false;
    }

    // si todo esta bien los valores se ponen por defecto
    reestablecerValores();
    // si guarda todo correctamente devuelve true
    return true;
}

// poner por defecto los valores introducidos despues de guardarlos
function reestablecerValores() {
    document.getElementById("eligeColor").value="#000000";
    document.getElementById("x").value="";
    document.getElementById("y").value="";
    document.getElementById("diametro").value="";
    document.getElementById("nombre").value="";
}

// crear elementos html
function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesita al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
            nodo.id = "nuevoNodo";
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}