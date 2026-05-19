/**
 * @file stats.worker.js
 * @description Web Worker para calcular métricas del panel manager sin bloquear la UI
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

self.onmessage = function (evento) {
  const { tipo, datos } = evento.data;

  try {
    // El worker se deja centrado en este cálculo para que sea simple y no mezcle cosas.
    if (tipo !== 'calcular_metricas_manager') {
      throw new Error(`Tipo de mensaje no soportado: ${tipo}`);
    }

    const empleados = Array.isArray(datos?.empleados) ? datos.empleados : [];
    const resultado = calcularMetricasManager(empleados);
    self.postMessage({ ok: true, tipo, resultado });
  } catch (error) {
    self.postMessage({ ok: false, tipo, error: error.message });
  }
};

/**
 * Calcula métricas agregadas para el panel manager.
 * @param {Array<Object>} empleados - Colección de empleados.
 * @returns {Object} Métricas calculadas.
 */
function calcularMetricasManager(empleados) {
  if (empleados.length === 0) {
    return {
      totalEmpleados: 0,
      mediaPuntos: 0,
      topEmpleado: null,
      riesgoAlto: 0,
      riesgoMedio: 0,
      riesgoBajo: 0
    };
  }

  const totalEmpleados = empleados.length;

  // El manager trabaja con métricas agregadas para no mezclar la parte visual con los cálculos.
  const mediaPuntos = Math.round(
    empleados.reduce((acc, empleado) => acc + Number(empleado.puntos ?? 0), 0) / totalEmpleados
  );
  const topEmpleado = empleados.reduce((top, actual) => (
    Number(actual.puntos ?? 0) > Number(top.puntos ?? 0) ? actual : top
  ));

  return {
    totalEmpleados,
    mediaPuntos,
    topEmpleado,
    riesgoAlto: empleados.filter((empleado) => empleado.riesgo === 'Alto').length,
    riesgoMedio: empleados.filter((empleado) => empleado.riesgo === 'Medio').length,
    riesgoBajo: empleados.filter((empleado) => empleado.riesgo === 'Bajo').length
  };
}
