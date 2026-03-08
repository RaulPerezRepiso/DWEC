//Clase importadada para crear la clase heredada Guerrero
import { Personaje } from "./Personaje.js";

export class Guerrero extends Personaje {
    //Constructor sobrecargado al que le llegan los 2 valores de la clase padre
    //  y la armadura que es la nueva propiedad de essta clase con valor por defecto 3
    constructor(nombre, fuerza, armadura = 3) {
        super(nombre, fuerza); 
        this.armadura = armadura;
    }

    //Recibir daño override para que primero tengan que quitar la armadura del personaje y luego la vida del guerrero
    recibirDanio(cantidad) {
        const danoReducido = Math.max(0, cantidad - this.armadura);
        super.recibirDanio(danoReducido);
    }
}
