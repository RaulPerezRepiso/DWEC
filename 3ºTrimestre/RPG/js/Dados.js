export class Dados {
  // Método estático para generar el número aleatorio al que le llegan el minimo y el maximo de daño que puede hacer ese persoanje
  static generarNumeroAleatorio(min, max) {
    //Constantes para el numero aleatorio y el umbral para generar el número valido
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    const valores = (min + max) / 2 + 1;
    if (numero >= valores) {
      // Si el ataque acierta devuelve el número
      return numero; 
    } else {
      //Si falla devuelve 0
      return 0; 
    }
  }
}
