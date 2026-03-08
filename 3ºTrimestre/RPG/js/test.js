import { Personaje } from "./Personaje.js";
import { Guerrero } from "./Guerrero.js";
import { Mago} from "./Mago.js";

const p1 = new Personaje("Raul", 5);
console.log("El nombre del personaje es: " + p1.nombre); // Se mostrar "Raúl" que es el nombre
console.log("La fuerza del personaje es: " + p1.fuerza); // Se mostrara la fuerza que es 5

console.log("¿El persoanje esta vivo? " + p1.estaVivo()); //Devolverá true porque ahora tiene 100 HP

console.log("El personaje tiene " + p1.vida + " HP"); //Getter que devuelve la cantidad de vida

p1.recibirDanio(99); //Cantidad de daño recibida
console.log("¿El persoanje esta vivo? " + p1.estaVivo()); //Devolverá false porque ha recibido mucho daño

console.log("El personaje tiene " + p1.vida + " HP");

const p2 = new Personaje("Orco", 3);
p1.atacar(p2);
p1.atacar(p2);
p1.atacar(p2);
p1.atacar(p2);

console.log("La vida del personaje 2 es: " + p2.vida);

const g = new Guerrero("Conan", 8, 4);
g.recibirDanio(10);
console.log("La vida del guerrero es: " + g.vida); // Recibirá solo 6 de daño

const g1= new Guerrero("Conan", 8, 4);
const m = new Mago("Gandalf", 4, 3);

m.atacar(g1);
m.atacar(g1);
m.atacar(g1);
console.log("Mana:", m.mana);
console.log("Vida de Conan:", g1.vida);
