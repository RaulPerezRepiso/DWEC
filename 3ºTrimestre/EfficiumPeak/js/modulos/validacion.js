/** @type {Object.<string, RegExp>} */
const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
};

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
