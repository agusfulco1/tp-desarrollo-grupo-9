import {EstadoTurno} from "../enums/EstadoTurno.js" 
import {Turno} from "../enums/Turno.js" 
import {Notificacion} from "../enums/Notificacion.js" 

export class FactoryNotification {

    crearSegunEstado(turno) {

        let remitente = null;
        let destinatario = null;
        
        switch(turno.estado) {

            case RESERVADO:
                remitente = turno.paciente;
                destinatario = turno.medico;
                break;

            case CONFIRMADO:
                remitente = turno.medico;
                destinatario = turno.paciente;
                break;

            case CANCELADO:
                const ultimo_turno = turno.historialEstados.at(-1);
                remitente = ultimo_turno.usuario;
                destinatario = 
                    ultimo_turno.usuario === turno.paciente
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
                `Turno ${turno.estado} por ${remitente} para ${turno.practica}`,
                new Date(),
                null,
                null
            )

        return notificacion;
    }

    crearDiaPrevioTurno(turno){
        // FALTA RECORDATORIO EL DIA PREVIO AL TURNO A MEDICO Y PACIENTE
    }
}