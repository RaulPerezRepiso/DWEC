/**
 * @file gamificacion.js
 * @description Cálculos de niveles, progreso y estadísticas de Efficium Peak
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

/**
 * Calcula el nivel del empleado según sus puntos.
 * @param {number} puntos - Puntos acumulados.
 * @returns {{nivel: number, nombre: string, porcentaje: number, puntosParaSiguiente: number}} Nivel calculado.
 */
export function calcularNivel(puntos) {
  const niveles = [
    { min: 0, nombre: 'Principiante' },
    { min: 500, nombre: 'Aprendiz' },
    { min: 1500, nombre: 'Competente' },
    { min: 3000, nombre: 'Avanzado' },
    { min: 6000, nombre: 'Experto' },
    { min: 10000, nombre: 'Maestro' }
  ];
  const nivelActual = niveles.reduce((acc, nivel, i) => (puntos >= nivel.min ? i : acc), 0);
  const siguiente = niveles[nivelActual + 1]?.min ?? puntos;
  const rango = siguiente - niveles[nivelActual].min || 1;
  const puntosParaSiguiente = nivelActual < niveles.length - 1 ? siguiente - puntos : 0;

  return {
    nivel: nivelActual + 1,
    nombre: niveles[nivelActual].nombre,
    porcentaje: parseFloat((((puntos - niveles[nivelActual].min) / rango) * 100).toFixed(1)),
    puntosParaSiguiente: Number.isInteger(puntosParaSiguiente) ? puntosParaSiguiente : Math.ceil(puntosParaSiguiente)
  };
}

/**
 * Lanza el Web Worker para calcular estadísticas del equipo.
 * @param {Array<Object>} empleados - Equipo del manager.
 * @returns {Promise<Object>} Estadísticas calculadas.
 */
export function calcularEstadisticasAsync(empleados) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./js/workers/stats.worker.js');
    worker.postMessage({ tipo: 'estadisticas_equipo', datos: { empleados } });
    worker.onmessage = (evento) => {
      worker.terminate();
      if (evento.data.ok) resolve(evento.data.resultado);
      else reject(new Error(evento.data.error));
    };
    worker.onerror = (evento) => {
      worker.terminate();
      reject(new Error(evento.message));
    };
  });
}
