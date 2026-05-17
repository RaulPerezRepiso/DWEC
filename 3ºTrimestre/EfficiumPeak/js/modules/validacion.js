/**
 * @file validacion.js
 * @description Validación de formularios con expresiones regulares
 * @author Raúl Pérez Repiso
 * @version 1.0.0
 */

/** @type {Object.<string, RegExp>} */
const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,50}$/,
  telefono: /^(\+34|0034|34)?[6789]\d{8}$/,
  empresa: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s&.,_-]{2,100}$/
};

/**
 * Normaliza el nombre de usuario para mostrarlo.
 * @param {string} nombre - Nombre introducido.
 * @returns {string} Nombre normalizado.
 */
export function normalizarNombre(nombre) {
  return nombre.trim().split(' ').map((palabra) => (
    palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
  )).join(' ');
}

/**
 * Genera las iniciales de un nombre completo.
 * @param {string} nombreCompleto - Nombre y apellidos.
 * @returns {string} Iniciales.
 */
export function obtenerIniciales(nombreCompleto) {
  return nombreCompleto.trim().split(' ').filter((parte) => parte.length > 0)
    .map((parte) => parte[0].toUpperCase()).slice(0, 2).join('');
}

/**
 * Trunca un texto largo para previsualizaciones.
 * @param {string} texto - Texto original.
 * @param {number} maxLength - Longitud máxima.
 * @returns {string} Texto truncado.
 */
export function truncarTexto(texto, maxLength = 80) {
  if (texto.length <= maxLength) return texto;
  return `${texto.substring(0, maxLength).trimEnd()}...`;
}

/**
 * Valida un email.
 * @param {string} email - Email a validar.
 * @returns {boolean} Resultado de validación.
 */
export function validarEmail(email) {
  const emailLimpio = email.trim();
  return emailLimpio.includes('@') && REGEX.email.test(emailLimpio);
}

/**
 * Valida una contraseña.
 * @param {string} password - Contraseña a validar.
 * @returns {boolean} Resultado de validación.
 */
export function validarPassword(password) {
  return REGEX.password.test(password);
}

/**
 * Valida un nombre de persona.
 * @param {string} nombre - Nombre a validar.
 * @returns {boolean} Resultado de validación.
 */
export function validarNombre(nombre) {
  return REGEX.nombre.test(nombre.trim());
}

/**
 * Valida un teléfono español.
 * @param {string} telefono - Teléfono a validar.
 * @returns {boolean} Resultado de validación.
 */
export function validarTelefono(telefono) {
  return REGEX.telefono.test(telefono.replace(/\s/g, ''));
}

/**
 * Valida el nombre de una empresa.
 * @param {string} empresa - Empresa a validar.
 * @returns {boolean} Resultado de validación.
 */
export function validarEmpresa(empresa) {
  return REGEX.empresa.test(empresa.trim());
}

/**
 * Valida todos los campos de un formulario y devuelve los errores.
 * @param {Object} campos - Campos del formulario.
 * @returns {{valido: boolean, errores: Object.<string, string>}} Estado y errores.
 */
export function validarFormulario(campos) {
  const errores = {};
  const validaciones = {
    email: { fn: validarEmail, msg: 'El email no tiene un formato válido' },
    password: { fn: validarPassword, msg: 'Mínimo 8 caracteres, una mayúscula y un número' },
    nombre: { fn: validarNombre, msg: 'El nombre solo puede contener letras y espacios (2-50 caracteres)' },
    telefono: { fn: validarTelefono, msg: 'Introduce un teléfono español válido' },
    empresa: { fn: validarEmpresa, msg: 'Nombre de empresa no válido' }
  };
  Object.entries(campos).forEach(([campo, valor]) => {
    if (validaciones[campo] && valor !== undefined && valor !== '') {
      if (!validaciones[campo].fn(valor)) errores[campo] = validaciones[campo].msg;
    } else if (!valor || valor.trim() === '') {
      errores[campo] = 'Este campo es obligatorio';
    }
  });
  return { valido: Object.keys(errores).length === 0, errores };
}

/**
 * Muestra errores de validación en el DOM.
 * @param {Object} errores - Errores por campo.
 * @returns {void}
 */
export function mostrarErroresFormulario(errores) {
  document.querySelectorAll('.campo-error').forEach((el) => {
    el.textContent = '';
    el.classList.remove('visible');
  });
  Object.entries(errores).forEach(([campo, mensaje]) => {
    const errorEl = document.getElementById(`error-${campo}`);
    const inputEl = document.getElementById(`input-${campo}`);
    if (errorEl) {
      errorEl.textContent = mensaje;
      errorEl.classList.add('visible');
    }
    if (inputEl) {
      inputEl.classList.add('input-invalido');
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.setAttribute('aria-describedby', `error-${campo}`);
    }
  });
}
