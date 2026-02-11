// Variables principales
let productos = document.getElementById("tarjetas");
let total = document.getElementById("total");
let menu = document.getElementById("menu-categorias");

// Copia del JSON para poder añadir/borrar productos
let datosJSON = [];

// Controlar los eventos de cada enalce
document.getElementById("mostrar").onclick = mostrarProductos;
document.getElementById("buscarPrecio").onclick = buscarPrecio;
document.getElementById("buscarTitulo").onclick = buscarTitulo;
document.getElementById("cat").onclick = mostrarCat;
document.getElementById("add").onclick = mostrarFormularioAdd;
document.getElementById("del").onclick = activarModoBorrado;

// Mostrar Productos usando el FETCH tambien se peude hacer con la llamada XMLHTTPRequest
function mostrarProductos() {
  fetch("server/PRODUCTS.json")
    .then(function (resp) {
      //Si la respuesta de la llamada no es correctar, mostramos cúal es el Error
      if (!resp.ok) {
        throw new Error("Error HTTP:" + resp.status);
      }
      // Si todo va bien convertimos la respuesta a JSON
      return resp.json();
    })
    .then((data) => {
      // Guardamos copia para borrar y añadir productos luego
      datosJSON = data.products;

      // Cargamos los productos en la vista
      cargarProductos(datosJSON);
    })

    //Mostramos si la petición o el JSON ha tenido algún error
    .catch(function (err) {
      console.log("Error en la petición: " + err);
    });
}

//Función para cargar los productos en la vista
function cargarProductos(datos) {
  productos.innerHTML = "";
  //Creamos tantos nodos como datos haya en el JSON
  for (let i = 0; i < datos.length; i++) {
    crearNodosProductos(datos[i]);
  }

  //Númeroto total de productos sacados de la petición
  total.innerText = "Número de productos totales: " + datos.length;
}

// CREAR TARJETA
function crearNodosProductos(element) {
  //Creamos los nodos para los datos que va a contener una tarjeta
  let marca = createNode("h3", element.title);
  marca.id = "marca";

  let info = createNode("p", element.description);
  info.id = "info";

  let precio = createNode("h3", "Precio: " + element.price + "€");
  precio.id = "precio";

  let descuento = createNode(
    "h3",
    "Descuento: " + element.discountPercentage + "%",
  );
  descuento.id = "descuento";

  let unidades = createNode("h3", "Puntuación: " + element.rating);
  unidades.id = "unidades";

  let fabricante = createNode("h3", "Fabricante: " + element.brand);
  fabricante.id = "fabricante";

  let categoria = createNode("h3", "Categoría: " + element.category);
  categoria.id = "categoria";

  let img = createNode("img");
  img.id = "img";
  img.src = element.thumbnail;

  //Lo añadimos a un div que va a ser vada tarjeta
  let div = createNode("div");

  div.appendChild(marca);
  div.appendChild(info);
  div.appendChild(precio);
  div.appendChild(descuento);
  div.appendChild(unidades);
  div.appendChild(fabricante);
  div.appendChild(categoria);
  div.appendChild(img);

  // Tambien añadimos el botón borrar que solo se mostrara con el css cuando clickemos en borrar productos
  let bBorrar = createNode("button", "Borrar");
  bBorrar.className = "bBorrar oculto";
  bBorrar.dataset.id = element.id;
  div.appendChild(bBorrar);

  //Lo añadimos todo al div de productos principal
  productos.appendChild(div);
}

//Método para buscar productos por precio máximo
function buscarPrecio() {
  // Si ya estaba abierto el botón, lo cerramos y salimos
  let controlarBoton = document.getElementById("fPrecio");
  if (controlarBoton) {
    controlarBoton.remove();
    return;
  }

  // Creamos el contenedor del formulario
  let div = document.createElement("div");
  div.id = "fPrecio";

  // Input del precio
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Introduce precio máximo";
  input.id = "iPrecio";

  // Botón buscar
  let btn = document.createElement("button");
  btn.textContent = "Buscar";

  // Evento del botón
  btn.onclick = function () {
    let max = Number(input.value);

    if (isNaN(max) || max <= 0) {
      alert("Introduce un número válido.");
      return;
    }

    // Si no tenemos productos cargados, hacemos fetch
    if (datosJSON.length === 0) {
      fetch("server/PRODUCTS.json")
        .then(function (resp) {
          if (!resp.ok) {
            throw new Error("Error HTTP: " + resp.status);
          }
          return resp.json();
        })
        .then(function (data) {
          datosJSON = data.products;
          filtrarPorPrecio(max);
        })
        .catch(function (err) {
          console.log("Error en la petición: " + err);
        });
    } else {
      filtrarPorPrecio(max);
    }

    // Eliminamos el formulario tras buscar
    div.remove();
  };

  // Añadimos input y botón al formulario
  div.appendChild(input);
  div.appendChild(btn);

  // Insertamos el formulario justo antes de las tarjetas
  let tarjetas = document.getElementById("tarjetas");
  tarjetas.parentNode.insertBefore(div, tarjetas);
}

//Función para filtrar por el precio Máximo
function filtrarPorPrecio(max) {
  //Guardar los productos válidos
  let filtrados = [];

  for (let i = 0; i < datosJSON.length; i++) {
    let producto = datosJSON[i];

    //Si el producto es mejor o igual que el máximo lo añadimos al array
    if (producto.price <= max) {
      filtrados.push(producto);
    }
  }

  //Los cargamos para que se vean en la vista solo esos
  cargarProductos(filtrados);
}

// BUSCAR POR TÍTULO (FETCH)
function buscarTitulo() {
  let controlarBoton = document.getElementById("fTitulo");
  if (controlarBoton) {
    controlarBoton.remove();
    return; // si ya estaba abierto, lo cerramos y salimos
  }

  // Contenedor del formulario
  let div = document.createElement("div");
  div.id = "fTitulo";

  // Input del texto
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Introduce parte del título";
  input.id = "iTitulo";

  // Botón buscar
  let btn = document.createElement("button");
  btn.textContent = "Buscar";

  // Evento del botón
  btn.onclick = function () {
    let texto = input.value.trim().toLowerCase();

    if (texto === "") {
      alert("Introduce un texto válido.");
      return;
    }

    // Si no tenemos productos cargados, hacemos fetch
    if (datosJSON.length === 0) {
      fetch("server/PRODUCTS.json")
        .then(function (resp) {
          if (!resp.ok) {
            throw new Error("Error HTTP: " + resp.status);
          }
          return resp.json();
        })
        .then(function (data) {
          datosJSON = data.products;
          filtrarPorTitulo(texto);
        })
        .catch(function (err) {
          console.log("Error en la petición: " + err);
        });
    } else {
      filtrarPorTitulo(texto);
    }

    // Eliminamos el formulario tras buscar
    div.remove();
  };

  // Añadimos input y botón al formulario
  div.appendChild(input);
  div.appendChild(btn);

  // Insertamos el formulario justo antes de las tarjetas
  let tarjetas = document.getElementById("tarjetas");
  tarjetas.parentNode.insertBefore(div, tarjetas);
}

function filtrarPorTitulo(texto) {
  let filtrados = [];

  // Bucle para recorrer el JSON
  for (let i = 0; i < datosJSON.length; i++) {
    let p = datosJSON[i];

    // Convertimos a minúsculas para comparar
    let titulo = p.title.toLowerCase();

    if (titulo.includes(texto)) {
      filtrados.push(p);
    }
  }

  if (filtrados.length === 0) {
    alert("No hay productos que coincidan con ese título.");
  }

  cargarProductos(filtrados);
}

// MOSTRAR CATEGORÍAS con (XMLHttpRequest)
function mostrarCat(e) {
  e.preventDefault();

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    // Cuando la petición esté completa y correcta
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      // Sacamos todas las categorías sin repetir
      let categorias = [];

      for (let i = 0; i < data.products.length; i++) {
        let cat = data.products[i].category;

        // Comprobamos si ya está en el array
        let existe = false;

        for (let j = 0; j < categorias.length; j++) {
          if (categorias[j] === cat) {
            existe = true;
            break;
          }
        }

        // Si no existe, la añadimos
        if (!existe) {
          categorias.push(cat);
        }
      }

      // Limpiamos el menú
      menu.innerHTML = "";

      // Creamos los enlaces con un bucle
      for (let i = 0; i < categorias.length; i++) {
        let a = document.createElement("a");
        a.href = "#";
        a.textContent = categorias[i];

        // Evento para filtrar por categoría
        a.onclick = function () {
          filtrarCategoria(categorias[i]);
        };

        menu.appendChild(a);
      }

      // Mostrar / ocultar el menú
      menu.classList.toggle("oculto");

      // Para posicionar debajo del botón
      let enlace = document.getElementById("cat");
      let rect = enlace.getBoundingClientRect();

      menu.style.left = rect.left + "px";
      menu.style.top = rect.bottom + window.scrollY + "px";
    }
  };

  xhr.open("GET", "server/PRODUCTS.json?nocache=" + Math.random(), true);
  xhr.send();
  
}

// FILTRAR POR CATEGORÍA
function filtrarCategoria(cat) {
  let filtrados = [];

  // Recorremos todos los productos
  for (let i = 0; i < datosJSON.length; i++) {
    let producto = datosJSON[i];

    if (producto.category === cat) {
      filtrados.push(producto);
    }
  }

  cargarProductos(filtrados);
}

// MOSTRAR FORMULARIO AÑADIR
function mostrarFormularioAdd() {
  // Limpiamos las tarjetas
  productos.innerHTML = "";

  // Contenedor Principal
  let form = createNode("div");
  form.id = "fAdd";
  form.className = "formulario";

  // Título
  let titulo = createNode("h2", "Añadir Producto");
  form.appendChild(titulo);

  // Campo: Título
  let inputTitle = createNode("input");
  inputTitle.id = "iTitle";
  inputTitle.placeholder = "Título";
  form.appendChild(inputTitle);

  // Campo: Descripción
  let inputDesc = createNode("input");
  inputDesc.id = "iDesc";
  inputDesc.placeholder = "Descripción";
  form.appendChild(inputDesc);

  // Campo: precio
  let inputPrice = createNode("input");
  inputPrice.id = "iPrice";
  inputPrice.type = "number";
  inputPrice.placeholder = "Precio";
  form.appendChild(inputPrice);

  // Campo: descuento
  let inputDiscount = createNode("input");
  inputDiscount.id = "iDisc";
  inputDiscount.type = "number";
  inputDiscount.placeholder = "Descuento %";
  form.appendChild(inputDiscount);

  // Campo: puntuación
  let inputRating = createNode("input");
  inputRating.id = "iRat";
  inputRating.type = "number";
  inputRating.placeholder = "Puntuación";
  form.appendChild(inputRating);

  // Campo: marca
  let inputBrand = createNode("input");
  inputBrand.id = "iBran";
  inputBrand.placeholder = "Marca";
  form.appendChild(inputBrand);

  // Campo: Categorías con Select
  let selectCat = createNode("select");
  selectCat.id = "sCat";
  form.appendChild(selectCat);

  // Sacar categorías sin repetir
  let categorias = [];

  for (let i = 0; i < datosJSON.length; i++) {
    let cat = datosJSON[i].category;

    let existe = false;
    for (let j = 0; j < categorias.length; j++) {
      if (categorias[j] === cat) {
        existe = true;
        break;
      }
    }

    if (!existe) {
      categorias.push(cat);
    }
  }

  // Crear opciones del select
  for (let i = 0; i < categorias.length; i++) {
    let op = createNode("option", categorias[i]);
    op.value = categorias[i];
    selectCat.appendChild(op);
  }

  // Campo: Imagen principal
  let inputThumb = createNode("input");
  inputThumb.id = "iThumb";
  inputThumb.placeholder = "URL imagen principal";
  form.appendChild(inputThumb);

  // Botón guardar
  let btn = createNode("button", "Guardar");
  btn.id = "btnGuardar";
  form.appendChild(btn);

  // Añadimos el formulario al contenedor principal
  productos.appendChild(form);

  // Evento del botón
  btn.onclick = guardarNuevoProducto;
}

function guardarNuevoProducto() {
  // Leemos los valores del formulario
  let titulo = document.getElementById("iTitle").value;
  let desc = document.getElementById("iDesc").value;
  let precio = Number(document.getElementById("iPrice").value);
  let descuento = Number(document.getElementById("iDisc").value);
  let rating = Number(document.getElementById("iRat").value);
  let marca = document.getElementById("iBran").value;
  let categoria = document.getElementById("sCat").value;
  let thumb = document.getElementById("iThumb").value;

  // Creamos el objeto del nuevo producto
  let nuevo = {
    id: Date.now(),
    title: titulo,
    description: desc,
    price: precio,
    discountPercentage: descuento,
    rating: rating,
    brand: marca,
    category: categoria,
    thumbnail: thumb,
  };

  // Simulación POST
  fetch("server/PRODUCTS.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  }).then(function () {
    datosJSON.push(nuevo);
    cargarProductos(datosJSON);
    let form = document.getElementById("fAdd");
    if (form) form.remove();
  });
}

// Borrar los productos
function activarModoBorrado() {
  let botones = document.querySelectorAll(".bBorrar");

  for (let i = 0; i < botones.length; i++) {
    let btn = botones[i];

    btn.classList.toggle("oculto");

    btn.onclick = function () {
      borrarProd(btn.dataset.id);
    };
  }
}

// Borrar el producto al que se le clicke en borrar
function borrarProd(id) {
  fetch("server/PRODUCTS.json?id=" + id, {
    method: "DELETE",
  }).then(function () {
    let nuevos = [];

    for (let i = 0; i < datosJSON.length; i++) {
      if (datosJSON[i].id != id) {
        nuevos.push(datosJSON[i]);
      }
    }

    datosJSON = nuevos;

    cargarProductos(datosJSON);
  });
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
