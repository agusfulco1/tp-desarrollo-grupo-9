import {EstadoTurno} from "../enums/EstadoTurno.js" 
import Turno from "./Turno.js" 
import Notificacion from "./Notificacion.js" 

export default class FactoryNotification {

    crearSegunEstado(turno) {

        if (!turno) {
            throw new Error("Turno inválido");
        }

        return new Notificacion(
            null, //id
            turno.estado.destinatario(turno),
            turno.estado.remitente(turno),
            `Turno ${turno.estado.descripcion} para ${turno.practica.nombre}`,
            new Date(),
            null,
            false
        );
    }

    crearDiaPrevioTurno(turno) {
        return [
            this.recordatorioDiaPrevio(turno, turno.paciente),
            this.recordatorioDiaPrevio(turno, turno.medico)
        ];
    }

    recordatorioDiaPrevio(turno, destinatario) {

        const diaTurno = `${turno.fechaHora.getDate()}/${turno.fechaHora.getMonth()+1}/${turno.fechaHora.getFullYear()}`;
        
        const recordatorio = new Notificacion(
                null, //id
                destinatario,
                null,
                `Recordatorio de turno para ${turno.practica.nombre} el dia ${diaTurno}`,
                new Date(),
                null,
                false
            );

        return recordatorio;
    }
}