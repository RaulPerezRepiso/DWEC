//Clases importadas necesarias para crear la clase heredada Mago
import { Personaje } from "./Personaje.js";
import { Dados } from "./Dados.js";

//Clase qeu hereda de Personaje
export class Mago extends Personaje {
  //Constructor sobrecargada al que le llegan las 2 propiedades de personaje más
  // la extra mana por ser mago por defecto valor a 0 sino le llega nada
  constructor(nombre, fuerza, mana = 0) {
    super(nombre, fuerza);
    this.mana = mana;
    this.maxMana = 5;
  }

  //Metodo modificado adaptado al mago para controlar que tenga mana y que  la fuerza se modifica con el mana que tenga
  /**
   * Modifica el método atacar(objetivo). Si tiene mana
   * suficiente (mayor que cero), gasta maná y el daño aplicado es
   * generarNumeroAleatorio(1,(fuerza + 2 * mana)) Si no, hace un ataque
   * normal (usando super.atacar si queréis reutilizar el log)
   */
  atacar(objetivo) {
    //Si tiene mana ataca diferente
    if (this.mana > 0) {
      this.mana--;

      //Constante de daño con las restinciones de la feura +2 * mana
      const danio = Dados.generarNumeroAleatorio(
        1,
        this.fuerza + 2 * this.mana,
      );

      //Si el daño es 0 fallará el ataque
      if (danio === 0) {
        console.log(this.nombre + " falla su hechizo contra " + objetivo.nombre,);
      } else {
        //Sino lanza el hechizo
        console.log(this.nombre+ " lanza un hechizo a "+objetivo.nombre+ " y le hace " + danio+ " de daño");
        objetivo.recibirDanio(danio);
      }
    } else {
      //Sino tiene mana hace una ataque normal
      super.atacar(objetivo);
    }
  }

  //Cada vez que se lanze este método recuperara mana
  recuperarMana() {
    if (this.mana < this.maxMana) {
      this.mana++;
    }
  }
}
