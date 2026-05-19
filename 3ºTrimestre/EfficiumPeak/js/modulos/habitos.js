import { Habito } from '../clases/Habito.js';
import { cargarHabitos as cargarHabitosApi } from './api.js';
import { renderizarListaHabitos } from './dom.js';
import { guardarHabitosUsuario, obtenerHabitosUsuario } from './storage.js';

let habitosActuales = [];

/**
 * Obtiene el id del usuario autenticado para guardar su progreso por separado.
 * @returns {string} Id del usuario actual o demo.
 */
function obtenerUsuarioActivoId() {
  const raw = sessionStorage.getItem('sesion_usuario');
  return raw ? JSON.parse(raw).id ?? 'u001' : 'u001';
}

/**
 * Busca un hábito por id.
 * @param {Array<Habito|Object>} habitos - Lista de hábitos.
 * @param {string} id - Identificador del hábito.
 * @returns {Habito|Object|undefined} Hábito encontrado.
 */
export function buscarHabitoPorId(habitos, id) {
  return habitos.find((habito) => habito.id === id);
}

/**
 * Carga hábitos desde datos locales y los convierte en instancias.
 * @returns {Promise<Array<Habito>>} Hábitos cargados.
 */
export async function cargarHabitos() {
  const datos = await cargarHabitosApi();
  const usuarioActivoId = obtenerUsuarioActivoId();

  // Aquí se recupera el estado guardado para que los hábitos sigan marcados al recargar.
  const estadoPersistido = obtenerHabitosUsuario(usuarioActivoId);
  const estadoPorId = new Map(estadoPersistido.map((habito) => [habito.id, habito]));
  habitosActuales = datos.map((habito) => new Habito(
    habito.id,
    habito.titulo,
    habito.descripcion,
    habito.tipo,
    habito.puntos,
    habito.icono
  ));
  habitosActuales.forEach((habito) => {
    const estado = estadoPorId.get(habito.id);
    if (estado) habito.aplicarEstado(estado);
  });
  guardarHabitosUsuario(
    usuarioActivoId,
    habitosActuales.map((item) => item.toJSON())
  );
  renderizarListaHabitos(habitosActuales);
  return habitosActuales;
}

/**
 * Renderiza los hábitos actuales con un filtro opcional.
 * @param {string} filtro - Filtro seleccionado.
 * @returns {void}
 */
export function renderizarHabitos(filtro = 'todos') {
  renderizarListaHabitos(habitosActuales, filtro);
}

/**
 * Completa un hábito por id y actualiza su tarjeta.
 * @param {string} id - Identificador del hábito.
 * @returns {Habito|null} Hábito completado o null.
 */
export function completarHabito(id) {
  const habito = buscarHabitoPorId(habitosActuales, id);
  if (!habito) return null;
  const estabaCompletado = habito.completado;

  try {
    // La tarjeta funciona como un toggle, así que deja marcar y también volver a pendiente.
    if (estabaCompletado) {
      habito.reiniciar();
    } else {
      habito.completar();
    }

    // Después de cada cambio se guarda todo para que historial y persistencia vayan a la vez.
    guardarHabitosUsuario(
      obtenerUsuarioActivoId(),
      habitosActuales.map((item) => item.toJSON())
    );

    // Luego se vuelve a pintar la lista para que en pantalla se vea el cambio al momento.
    const filtroActual = document.getElementById('filtro-habitos')?.value ?? 'todos';
    renderizarListaHabitos(habitosActuales, filtroActual);

    return habito;
  } catch (error) {
    console.warn(error.message);
    return null;
  }
}
