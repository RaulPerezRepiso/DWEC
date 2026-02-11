// =========================
// COOKIES
// =========================

// Crear cookie
document.getElementById("crearCookie").addEventListener("click", () => {
    const nombre = document.getElementById("cookieNombre").value;
    const valor = document.getElementById("cookieValor").value;

    document.cookie = `${nombre}=${encodeURIComponent(valor)}; max-age=3600`;

    document.getElementById("resultadoCookie").textContent =
        "Cookie creada correctamente.";
});

// Leer cookie
document.getElementById("leerCookie").addEventListener("click", () => {
    const nombre = document.getElementById("cookieNombre").value;
    const valor = obtenerCookie(nombre);

    document.getElementById("resultadoCookie").textContent =
        valor ? `Valor: ${valor}` : "La cookie no existe.";
});

// Borrar cookie
document.getElementById("borrarCookie").addEventListener("click", () => {
    const nombre = document.getElementById("cookieNombre").value;

    document.cookie = `${nombre}=; max-age=0`;

    document.getElementById("resultadoCookie").textContent =
        "Cookie eliminada.";
});

// Función para obtener cookie
function obtenerCookie(clave) {
    const name = clave + "=";
    const partes = document.cookie.split(";");

    for (let c of partes) {
        c = c.trim();
        if (c.indexOf(name) === 0) {
            return decodeURIComponent(c.substring(name.length));
        }
    }
    return "";
}



// =========================
// SESSION STORAGE
// =========================

document.getElementById("guardarSession").addEventListener("click", () => {
    const clave = document.getElementById("sessionClave").value;
    const valor = document.getElementById("sessionValor").value;

    sessionStorage.setItem(clave, valor);

    document.getElementById("resultadoSession").textContent =
        "Guardado en sessionStorage.";
});

document.getElementById("leerSession").addEventListener("click", () => {
    const clave = document.getElementById("sessionClave").value;
    const valor = sessionStorage.getItem(clave);

    document.getElementById("resultadoSession").textContent =
        valor ? `Valor: ${valor}` : "No existe esa clave.";
});

document.getElementById("borrarSession").addEventListener("click", () => {
    const clave = document.getElementById("sessionClave").value;

    sessionStorage.removeItem(clave);

    document.getElementById("resultadoSession").textContent =
        "Elemento eliminado.";
});



// =========================
// LOCAL STORAGE
// =========================

document.getElementById("guardarLocal").addEventListener("click", () => {
    const clave = document.getElementById("localClave").value;
    const valor = document.getElementById("localValor").value;

    localStorage.setItem(clave, valor);

    document.getElementById("resultadoLocal").textContent =
        "Guardado en localStorage.";
});

document.getElementById("leerLocal").addEventListener("click", () => {
    const clave = document.getElementById("localClave").value;
    const valor = localStorage.getItem(clave);

    document.getElementById("resultadoLocal").textContent =
        valor ? `Valor: ${valor}` : "No existe esa clave.";
});

document.getElementById("borrarLocal").addEventListener("click", () => {
    const clave = document.getElementById("localClave").value;

    localStorage.removeItem(clave);

    document.getElementById("resultadoLocal").textContent =
        "Elemento eliminado.";
});
