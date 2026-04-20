import {Usuario} from "./Usuario.js"

export class Notificacion {
    constructor(id, destinario, remitente, mensaje, fechaHorarioCreacion, fechaHoraLeida, leida) {
        this.id = id;
        this.destinario = destinario;
        this.remitente = remitente;
        this.mensaje = mensaje;
        this.fechaHorarioCreacion = fechaHorarioCreacion;
        this.fechaHoraLeida = fechaHoraLeida;
        this.leida = leida;
    }

    marcarComoLeida() {
        this.leida = true;
    }
}