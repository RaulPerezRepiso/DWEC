export class Estadisticas {
    constructor(usuarioId, semana, habitosCompletados = 0, racha = 0) {
        this.usuarioId = usuarioId;
        this.semana = semana;
        this.habitosCompletados = habitosCompletados;
        this.racha = racha;
    }

    //Sumar hábito completo
    incrementarHabitos() {
        this.habitosCompletados++;
    }

    //Sumar racha si es seguida
    incrementarRacha() {
        this.racha++;
    }
}
