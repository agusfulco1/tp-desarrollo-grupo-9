import lodash from 'lodash';

export const EstadoTurno = Object.freeze({
    DISPONIBLE:{
        descripcion: "Disponible",
        remitente: (turno) => null,
        destinatario: (turno) => null
    },
    RESERVADO:{
        descripcion: "Reservado",
        remitente: (turno) => turno.paciente,
        destinatario: (turno) => turno.medico
    },
    CONFIRMADO:{
        descripcion: "Confirmado",
        remitente: (turno) => turno.medico,
        destinatario: (turno) => turno.paciente
    },
    CANCELADO:{
        descripcion: "Cancelado",
        remitente: (turno) => lodash.last(turno.historialEstados).usuario ?? null,
        destinatario: (turno) => { 
            const ultimo_turno = lodash.last(turno.historialEstados).usuario;
            if (!ultimo_turno) return null;

            return ultimo_turno.usuario.id === turno.paciente.id
                        ? turno.medico
                        : turno.paciente;
        }
    },
    REALIZADO:{
        descripcion: "Realizado",
        remitente: (turno) => null,
        destinatario: (turno) => null
    }
})