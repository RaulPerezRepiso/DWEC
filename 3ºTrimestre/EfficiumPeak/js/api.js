import { Usuario } from "./authab.js";
import { Habito } from "./habits.js";

export async function cargarUsuarios() {
    const res = await fetch("/data/users.json");
    const data = await res.json();

    return data.map(usu=> new Usuario(usu.id, usu.nombre, usu.email, usu.rol, usu.habitos));
}

export async function cargarHabitos() {
    const res = await fetch("/data/habits.json");
    const data = await res.json();

    return data.map(hab => new Habito(hab.id, hab.titulo, hab.descripcion, hab.frecuencia, hab.completado));
}
