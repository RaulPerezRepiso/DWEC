export class Habito {
    constructor(id, titulo, descripcion, frecuencia = "diario", completado = []) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.frecuencia = frecuencia; // frecuencia con la que hacer el hábito
        this.completado = completado; // array de hábitos completados con la fecha del día que se completo
    }

    //Marcar como hábito y guardar la fecha
    marcarComoCompletado(fecha) {
        this.completado.push(fecha);
    }
}
