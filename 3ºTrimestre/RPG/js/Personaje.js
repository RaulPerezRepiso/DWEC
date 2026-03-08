//Importamos la clase para poder tirar lo dados
import { Dados } from "./Dados.js";

//Creamos la clase personaje como modulo para exportarla a otra
export class Personaje {
  //Propiedad privada y valor por defecto usamos para ello #
  #vida = 100;

  //Llamamos al constructor con los valores que le llegan a personaje en este caso nombre y fuerza
  constructor(nombre, fuerza) {
    this.nombre = nombre;
    this.fuerza = fuerza;
  }

  //Método para saer si esta vivo o no devolverá true o false
  estaVivo() {
    return this.#vida > 0;
  }

  //Método para recibir daño dado una cantidad reducirá la vida del personaje
  recibirDanio(cantidad) {
    this.#vida -= cantidad;
    // Si la vida esta en 0 no quitaremos más vida
    if (this.#vida < 0) {
      this.#vida = 0;
    }
  }

  //Getter para mostrar la vida que tiene el personaje
  get vida() {
    return this.#vida;
  }

  //Método para que un personaje ataque a otro
  atacar(objetivo) {
    //Comprobamos si esta vivo primero
    if (!this.estaVivo()) {
      console.log(this.nombre + " no puede atacar porque está muerto.");
      return;
    }

    //Creamos la constante para el daño
    const danio = Dados.generarNumeroAleatorio(1, this.fuerza);

    //Mostramos por consola quien ataca a quien y el daño
    console.log(
      this.nombre +
        " ataca a " +
        objetivo.nombre +
        " y le hace " +
        danio +
        " de daño.",
    );
    //Lanzamos el metodo para quitarle vida
    objetivo.recibirDanio(danio);
  }
}
