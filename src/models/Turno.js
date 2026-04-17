class Turno {
    ID;
    medico;
    paciente;
    fechaHora;
    sede;
    practica;
    estado;
    historialEstados;
    costo;

    constructor(ID, medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo){
        this.ID = ID;
        this.medico = medico;
        this.paciente = paciente;
        this.fechaHora = fechaHora;
        this.sede = sede;
        this.practica = practica;
        this.estado = estado;
        this.historialEstados = historialEstados;
        this.costo = costo;
    }

    actualizarEstado(nuevoEstado, usuario, motivo){

    }
}