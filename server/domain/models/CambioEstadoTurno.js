import {EstadoTurno} from "../enums/EstadoTurno.js"
import Turno from "./Turno.js" 

export default class CambioEstadoTurno {
    constructor(fechaHoraIngreso, estado, turno, usuario, motivo) {
        this.fechaHoraIngreso = fechaHoraIngreso;
        this.estado = estado;
        this.turno = turno;
        this.usuario = usuario;
        this.motivo = motivo;
    }
}