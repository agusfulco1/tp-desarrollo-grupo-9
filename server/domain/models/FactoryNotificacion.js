import {EstadoTurno} from "../enums/EstadoTurno.js" 
import Turno from "./Turno.js" 
import Notificacion from "./Notificacion.js" 

export default class FactoryNotification {

    crearSegunEstado(turno) {

        if (!(turno instanceof Turno)) {
            throw new Error("Turno inválido");
        }

        if (!turno.estado || !turno.estado.descripcion) {
            throw new Error("Estado inválido");
        }

        if (turno.estado === EstadoTurno.CANCELADO && 
            (!turno.historialEstados || turno.historialEstados.length === 0)
        ) {
            throw new Error("Historial de Estados vacio");
        }

        return new Notificacion(
            null, //id
            turno.estado.destinario(turno),
            turno.estado.remitente(turno),
            `Turno ${turno.estado.descripcion} para ${turno.practica.nombre}`,
            new Date(),
            null,
            false
        );
    }

    crearDiaPrevioTurno(turno) {

        if (!(turno instanceof Turno)) {
            throw new Error("Turno inválido");
        }

        if (!turno.estado || !turno.estado.descripcion) {
            throw new Error("Estado inválido");
        }

        return [
            this.recordatorioDiaPrevio(turno, turno.paciente),
            this.recordatorioDiaPrevio(turno, turno.medico)
        ];
    }

    recordatorioDiaPrevio(turno, destinario) {

        const diaTurno = `${turno.fechaHora.getDate()}/${turno.fechaHora.getMonth()}/${turno.fechaHora.getFullYear()}`;
        
        const recordatorio = new Notificacion(
                null, //id
                destinario,
                null,
                `Recordatorio de turno para ${turno.practica.nombre} el dia ${diaTurno}`,
                new Date(),
                null,
                false
            );

        return recordatorio;
    }
}