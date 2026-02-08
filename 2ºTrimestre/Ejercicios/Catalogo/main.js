
let productos = document.getElementById("tarjetas");

mostrarProductos();

function mostrarProductos() {
    fetch("http://localhost/Catalogo/server/PRODUCTS.json", {
    })
        .then(function (resp) {
            if (resp.ok) {
                console.log(resp);

                resp.json()
                    .then(function (data) {
                        data.products.forEach(element => {
                            crearNodosProducos(element);
                        });
                        contarTodos();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        })
        .catch(function (err) {
            console.log(err);
        });

};

//Crear los nodos necesarios para las tarjetas
function crearNodosProducos(element) {
    let marca = createNode("h3", element.title);
    marca.id = "marca";
    let info = createNode("p", " " + element.description);
    info.id = "info";
    let precio = createNode("h3", "Precio: " + element.price + "€");
    precio.id = "precio";
    let descuento = createNode("h3", "Descuento: " + element.discountPercentage + "%");
    descuento.id = "descuento";
    let unidades = createNode("h3", "Puntuación: " + element.rating);
    unidades.id = "unidades";
    let fabricante = createNode("h3", "Fabricante: " + element.stock);
    fabricante.id = "fabricante";
    let categoria = createNode("h3", "Categoria: " + element.category);
    categoria.id = "categoria";
    let img = createNode("img");
    img.id = "img";
    img.src = element.thumbnail;

    let div = createNode("div");

    div.appendChild(marca);
    div.appendChild(info);
    div.appendChild(precio);
    div.appendChild(descuento);
    div.appendChild(unidades);
    div.appendChild(fabricante);
    div.appendChild(categoria);
    div.appendChild(img);

    document.getElementById("tarjetas").appendChild(div);

}

function contarTodos() {
    let tarjetas = document.getElementById("tarjetas");
    total = tarjetas.children.length;

    document.getElementById("total").innerText += " " + total;
}

function buscarPrecio() {
}

function buscarTitulo() {
}

const cat = document.getElementById("cat");
const menu = document.getElementById("menu-categorias");

cat.addEventListener("click", function (e) {
    e.preventDefault();

    // Si ya está visible → ocultar 
    if (!menu.classList.contains("oculto")) {
        menu.classList.add("oculto");
        return;
    }

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }

    // Limpiar contenido previo 
    menu.innerHTML = "";
    const categorias =
        [
            "SmartPhones",
            "Laptop",
            "Fragancia",
            "SkinCare",
            "Comestibles",
            "Decoración de Hogar"
        ];


    categorias.forEach(element => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = element;
        menu.appendChild(a);
    });

    // Mostrar menú 
    menu.classList.remove("oculto");

    // Posicionar debajo del enlace const 
    rect = cat.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + "px";
    menu.style.width = rect.width + "px";
    menu.classList.remove("oculto");

});

function mostrarCat() {
}

function añadirProd() {
}

function borrarProd() {
}

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