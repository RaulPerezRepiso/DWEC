/**
 * @file stats.worker.js
 * @description Web Worker para cálculo de estadísticas del equipo sin bloquear la UI
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

self.onmessage = function (evento) {
  const { tipo, datos } = evento.data;
  try {
    let resultado;
    switch (tipo) {
      case 'estadisticas_equipo':
        resultado = calcularEstadisticasEquipo(datos.empleados);
        break;
      case 'tendencia_habitos':
        resultado = calcularTendencia(datos.historial);
        break;
      default:
        throw new Error(`Tipo de cálculo desconocido: ${tipo}`);
    }
    self.postMessage({ ok: true, tipo, resultado });
  } catch (error) {
    self.postMessage({ ok: false, tipo, error: error.message });
  }
};

/**
 * Calcula estadísticas completas del equipo.
 * @param {Array} empleados - Equipo del manager.
 * @returns {Object} Estadísticas agregadas.
 */
function calcularEstadisticasEquipo(empleados) {
  if (!empleados || empleados.length === 0) return { media: 0, total: 0, top: null, distribucion: {} };
  const total = empleados.reduce((acc, empleado) => acc + (empleado.puntos ?? 0), 0);
  const media = Math.round(total / empleados.length);
  const top = empleados.reduce((a, b) => ((a.puntos ?? 0) > (b.puntos ?? 0) ? a : b));
  const distribucion = empleados.reduce((acc, empleado) => {
    const nivel = obtenerNombre(empleado.puntos ?? 0);
    acc[nivel] = (acc[nivel] ?? 0) + 1;
    return acc;
  }, {});
  const mediaHabitos = Math.round(
    empleados.reduce((acc, empleado) => acc + (empleado.habitosCompletados?.length ?? 0), 0) / empleados.length
  );
  return { total, media, top, distribucion, mediaHabitos };
}

/**
 * Calcula la tendencia de hábitos completados por semana.
 * @param {Array} historial - Fechas ISO.
 * @returns {Array<{semana: number, cantidad: number}>} Tendencia semanal.
 */
function calcularTendencia(historial) {
  const porSemana = {};
  historial.forEach((fechaISO) => {
    const fecha = new Date(fechaISO);
    const semana = obtenerNumeroSemana(fecha);
    porSemana[semana] = (porSemana[semana] ?? 0) + 1;
  });
  return Object.entries(porSemana)
    .map(([semana, cantidad]) => ({ semana: Number(semana), cantidad }))
    .sort((a, b) => a.semana - b.semana);
}

/**
 * Calcula el número de semana.
 * @param {Date} fecha - Fecha de referencia.
 * @returns {number} Número de semana.
 */
function obtenerNumeroSemana(fecha) {
  const inicio = new Date(fecha.getFullYear(), 0, 1);
  return Math.ceil(((fecha - inicio) / 86400000 + inicio.getDay() + 1) / 7);
}

/**
 * Obtiene el nombre del nivel según los puntos.
 * @param {number} puntos - Puntos acumulados.
 * @returns {string} Nombre del nivel.
 */
function obtenerNombre(puntos) {
  if (puntos >= 10000) return 'Maestro';
  if (puntos >= 6000) return 'Experto';
  if (puntos >= 3000) return 'Avanzado';
  if (puntos >= 1500) return 'Competente';
  if (puntos >= 500) return 'Aprendiz';
  return 'Principiante';
}
