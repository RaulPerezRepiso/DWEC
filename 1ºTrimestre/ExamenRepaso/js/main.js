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
    let selectCargo = document.querySelector("select");

    // Seleccionamos el <tr> vacío donde meteremos los campos
    let filaExtra = document.getElementById("camposNuevos");

    // Cuando cambie el select...
    selectCargo.onchange = function () {
      // Limpiar lo que hubiera antes
      filaExtra.innerHTML = "";

      if (selectCargo.value === "empleado") {
        // Nº de incidencia
        let td1 = createNode("td", "Nº de Incidencia:");
        let td2 = createNode("td");
        let input1 = createNode("input");
        input1.type = "text";
        td2.appendChild(input1);

        // Incidencia
        let td3 = createNode("td", "Incidencia:");
        let td4 = createNode("td");
        let textarea1 = createNode("textarea");
        td4.appendChild(textarea1);

        filaExtra.appendChild(td1);
        filaExtra.appendChild(td2);
        filaExtra.appendChild(td3);
        filaExtra.appendChild(td4);
      }

      if (selectCargo.value === "encargado") {
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


/*// Detectar página actual
const pagina = window.location.pathname.toLowerCase();

// Utilidad: creación de nodos
function createNode(tipoNodo, texto) {
  if (!tipoNodo) throw new Error("Se necesita el tipo de nodo a crear.");
  const nodo = document.createElement(tipoNodo);
  if (typeof texto === "string") nodo.appendChild(document.createTextNode(texto));
  return nodo;
}

// ---------- Lógica de index-DWEC.html ----------
if (pagina.includes("index-dwec.html")) {
  window.addEventListener("load", () => {
    // Intentar abrir popup
    const popup = window.open(
      "registro.html",
      "Registro",
      "popup=yes,width=500,height=400,top=100,left=100,resizable=no,scrollbars=no"
    );

    // Si el navegador bloquea el popup, avisar y no bloquear la página
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      alert("El navegador ha bloqueado la ventana de registro. Activa los popups para continuar.");
    } else {
      // Bloquear interacciones en index hasta que llegue el usuario
      document.body.style.pointerEvents = "none";
    }

    // Referencias
    const labelUsuario = document.getElementById("nombreUsu");
    const selectCargo = document.getElementById("cargo"); // usa id, no querySelector sin contexto
    const filaExtra = document.getElementById("camposNuevos");

    // Limpia campos dinámicos
    function limpiarCamposExtra() {
      filaExtra.innerHTML = "";
    }

    // Crea campos para "empleado"
    function crearCamposEmpleado() {
      // Nº de Incidencia
      const td1 = createNode("td", "Nº de Incidencia:");
      const td2 = createNode("td");
      const inputInc = createNode("input");
      inputInc.type = "text";
      inputInc.id = "numIncidencia";
      td2.appendChild(inputInc);

      // Incidencia
      const td3 = createNode("td", "Incidencia:");
      const td4 = createNode("td");
      const textareaInc = createNode("textarea");
      textareaInc.id = "incidencia";
      td4.appendChild(textareaInc);

      filaExtra.appendChild(td1);
      filaExtra.appendChild(td2);
      filaExtra.appendChild(td3);
      filaExtra.appendChild(td4);
    }

    // Crea campos para "encargado"
    function crearCamposEncargado() {
      // Departamento (select)
      const td1 = createNode("td", "Departamento:");
      const td2 = createNode("td");
      const selectDept = createNode("select");
      selectDept.id = "departamento";

      const opt1 = createNode("option", "Contabilidad");
      opt1.value = "Contabilidad"; // texto visible coincidente
      const opt2 = createNode("option", "Dirección");
      opt2.value = "Dirección";

      selectDept.appendChild(opt1);
      selectDept.appendChild(opt2);
      td2.appendChild(selectDept);

      // Asunto
      const td3 = createNode("td", "Asunto:");
      const td4 = createNode("td");
      const textareaAsunto = createNode("textarea");
      textareaAsunto.id = "asunto";
      td4.appendChild(textareaAsunto);

      filaExtra.appendChild(td1);
      filaExtra.appendChild(td2);
      filaExtra.appendChild(td3);
      filaExtra.appendChild(td4);
    }

    // Cambio dinámico según usuario seleccionado
    selectCargo.addEventListener("change", () => {
      limpiarCamposExtra();
      if (selectCargo.value === "empleado") crearCamposEmpleado();
      if (selectCargo.value === "encargado") crearCamposEncargado();
    });

    // Inicializar según valor por defecto del select
    selectCargo.dispatchEvent(new Event("change"));

    // Exponer una función para que el popup nos envíe el usuario y desbloquee
    window.setUsuarioRegistrado = function (nombreUsuario) {
      labelUsuario.textContent = "Usuario registrado: " + nombreUsuario;
      document.body.style.pointerEvents = "auto";
    };
  });
}

// ---------- Lógica de registro.html ----------
if (pagina.includes("registro.html")) {
  window.addEventListener("load", () => {
    const usu = document.getElementById("usu");
    const pass = document.getElementById("pass");
    const bAceptar = document.getElementById("bAceptar");

    function marcarError(campo, mensaje) {
      alert(mensaje);
      campo.style.border = "2px solid red";
      campo.focus();
    }

    bAceptar.addEventListener("click", () => {
      // Reset estilo
      usu.style.border = "";
      pass.style.border = "";

      let valido = true;

      if (usu.value.trim() === "") {
        marcarError(usu, "El campo usuario está vacío");
        valido = false;
      }
      if (pass.value.trim() === "") {
        marcarError(pass, "El campo password está vacío");
        valido = false;
      }
      if (!valido) return;

      const nombre = usu.value.trim();
      const esValido = nombre === "empleado" || nombre === "encargado";

      if (!esValido) {
        alert("Usuario " + nombre + " no está registrado");
        return;
      }

      // Enviar el usuario a la ventana principal
      if (window.opener && typeof window.opener.setUsuarioRegistrado === "function") {
        window.opener.setUsuarioRegistrado(nombre);
      } else if (window.opener && window.opener.document) {
        // Fallback si no existe la función expuesta
        const etiqueta = window.opener.document.getElementById("nombreUsu");
        if (etiqueta) etiqueta.textContent = "Usuario registrado: " + nombre;
        window.opener.document.body.style.pointerEvents = "auto";
      } else {
        alert("No se pudo comunicar con la ventana principal. Revisa el bloqueo de popups.");
        return;
      }

      // Cerrar popup
      window.close();
    });
  });
}*/