export class Usuario {
    constructor(id, nombre, email, rol = "usuario", habitos = []) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol; // Designar usuario o manager
        this.habitos = habitos; // Número de id del hábito
    }

    //Asigna un hábito a la id de un usuario
    asignarHabito(habitoId) {
        this.habitos.push(habitoId);
    }
}
