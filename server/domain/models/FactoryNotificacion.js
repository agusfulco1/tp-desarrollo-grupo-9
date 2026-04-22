import {EstadoTurno} from "../enums/EstadoTurno.js" 
import Turno from "./Turno.js" 
import Notificacion from "./Notificacion.js" 

export default class FactoryNotification {

    crearSegunEstado(turno) {

        if (!turno) {
            throw new Error("Turno inválido");
        }

        let remitente = null;
        let destinatario = null;
        
        switch(turno.estado) {

            case EstadoTurno.RESERVADO:
                remitente = turno.paciente;
                destinatario = turno.medico;
                break;

            case EstadoTurno.CONFIRMADO:
                remitente = turno.medico;
                destinatario = turno.paciente;
                break;

            case EstadoTurno.CANCELADO:
                const ultimo_turno = turno.historialEstados?.at(-1);  // REVISAR

                if (!ultimo_turno) {
                    throw new Error("No hay historial de estados para turno cancelado");
                }

                remitente = ultimo_turno.usuario;
                destinatario = 
                    ultimo_turno.usuario.id === turno.paciente.id
                        ? turno.medico
                        : turno.paciente;
                break;

            default:
                throw new Error("Estado de turno inválido");
        }

        const notificacion = new Notificacion(
                null, //id
                destinatario,
                remitente,
                `Turno ${turno.estado} por ${remitente.nombre} para ${turno.practica.nombre}`,
                new Date(),
                null,
                false
            )

        return notificacion;
    }

    crearDiaPrevioTurno(turno) {
        const fechaTurno = turno.fechaHora;

        if(this.esManana(fechaTurno)){
            return [
                this.recordatorioDiaPrevio(turno, turno.paciente),
                this.recordatorioDiaPrevio(turno, turno.medico)
            ];
        } else {
            return [];
        }
    }

    esManana(fechaTurno) {
        const hoy = new Date();

        const hoyFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

        const turnoDia = new Date(
            fechaTurno.getFullYear(),
            fechaTurno.getMonth(),
            fechaTurno.getDate()
        );

        const manana = new Date(hoyFecha);
        manana.setDate(manana.getDate() + 1);

        return turnoDia.getTime() === manana.getTime();
    }

    recordatorioDiaPrevio(turno, destinatario) {

        const diaTurno = `${turno.fechaHora.getDate()}/${turno.fechaHora.getMonth()+1}/${turno.fechaHora.getFullYear()}`;
        
        const recordatorio = new Notificacion(
                null,
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