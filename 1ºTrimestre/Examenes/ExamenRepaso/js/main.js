// Detectar en qué página estoy
// window.location.pathname → Devuelve la ruta del archivo actual.
let pagina = window.location.pathname;

// Si estoy en index.html → Cargo Logeo
if (pagina.includes("index-DWEC.html")) {
  // Al cargar abro la ventana para poner usu y pass
  window.onload = function () {
    // Abrimo la ventana
    // Ruta
    // Nombre
    // Tamaño y Posición
    window.open(
      "registro.html",
      "Registro",
      "width=500,height=400,top=100,left=100"
    );

    // Bloqueo el uso de la otra ventana
    document.body.style.pointerEvents = "none";

    // Seleccionamos el <select> de Cargo
    let cargo = document.querySelector("select");

    // Seleccionamos el <tr> vacío donde meteremos los campos
    let filaExtra = document.getElementById("camposNuevos");

    // Cuando cambie el select...
    cargo.onchange = function () {
      // Limpiar lo que hubiera antes
      filaExtra.innerHTML = "";

      if (cargo.value === "empleado") {
        // Nº de incidencia
        let td1 = createNode("td", "Nº de Incidencia:");
        let td2 = createNode("td");
        let input1 = createNode("input");
        input1.type = "text";
        td2.appendChild(input1);

        // Incidencia
        let td3 = createNode("td", "Incidencia:");
        td3.id = "Ninc";
        let td4 = createNode("td");
        let textarea1 = createNode("textarea");
        td4.appendChild(textarea1);

        filaExtra.appendChild(td1);
        filaExtra.appendChild(td2);
        filaExtra.appendChild(td3);
        filaExtra.appendChild(td4);
      }

      if (cargo.value === "encargado") {
        // Departamento
        let td1 = createNode("td", "Departamento:");
        let td2 = createNode("td");
        let selectDept = createNode("select");

        let opt1 = createNode("option", "Contabilidad");
        opt1.value = "contabilidad";

        let opt2 = createNode("option", "Dirección");
        opt2.value = "direccion";

        selectDept.appendChild(opt1);
        selectDept.appendChild(opt2);
        td2.appendChild(selectDept);

        // Asunto
        let td3 = createNode("td", "Asunto:");
        let td4 = createNode("td");
        let textarea2 = createNode("textarea");
        td4.appendChild(textarea2);

        filaExtra.appendChild(td1);
        filaExtra.appendChild(td2);
        filaExtra.appendChild(td3);
        filaExtra.appendChild(td4);

        let dni = document.getElementById("dni");
        let email = document.getElementById("email");
        let nInc = document.getElementById("nInc");

        let p = createNode("p");
        body.appendChild(p);

        let eDni = /^[0-9]{8}[A-Z]$/;
        let eEmail = /^/;
        let eNInc = /[0-9]/ig;

        if (dni.value != eDni) {
          p.value = "Esta cadena no puede estar vacía";
          p.style.color = "red";
        }

        if (email.value != eEmail) {
          p.value = "Esta cadena no puede estar vacía";
          p.style.color = "red";
        }

        if (nInc.value != nInc) {
          p.value = "Esta cadena no puede estar vacía";
          p.style.color = "red";
        }
      }
    };
  };
}

/**
 * Funcion para crear Nodos
 * @param {*} tipoNodo
 * @param {*} tipoTexto
 * @returns
 */
function createNode(tipoNodo, tipoTexto) {
  let nodo;
  let nodoText;

  switch (arguments.length) {
    case 0:
      throw "Se necesitas al menos el tipo de elemento a crear.";
    case 1:
      nodo = document.createElement(tipoNodo);
      nodo.id = "nuevoNodo";
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
  }

  return nodo;
}

// Si estoy en registro.html → Validar formulario
if (pagina.includes("registro.html")) {
  window.onload = function () {
    let usu = document.getElementById("usu");
    let pass = document.getElementById("pass");
    let bAceptar = document.getElementById("bAceptar");

    bAceptar.onclick = function () {
      let valido = true;

      // Si esta vacía salta y cambia el color del borde
      if (usu.value.trim() === "") {
        alert("El campo usuario está vacío");
        usu.style.border = "2px solid red";
        valido = false;
      }

      // Si esta vacía salta y cambia el color del borde
      if (pass.value.trim() === "") {
        alert("El campo password está vacío");
        pass.style.border = "2px solid red";
        valido = false;
      }

      // Si el valido sigue a false vuelve
      if (!valido) return;

      // Para comprobar usuarios válidos
      let usuarioValido = usu.value === "empleado" || usu.value === "encargado";

      // Si el usuairo no es valido salta
      if (!usuarioValido) {
        alert("Usuario " + usu.value + " no está registrado");
        return;
      }

      // Desbloquear ventana principal
      window.opener.document.body.style.pointerEvents = "auto";

      // Mostrar usuario en index
      window.opener.document.getElementById("nombreUsu").textContent =
        "Usuario registrado: " + usu.value;

      // Cerrar popup
      window.close();
    };
  };
}

