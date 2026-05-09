import lodash from 'lodash';

export const EstadoTurno = Object.freeze({
    DISPONIBLE:{
        descripcion: "Disponible",
        remitente: (turno) => null,
        destinario: (turno) => null
    },
    RESERVADO:{
        descripcion: "Reservado",
        remitente: (turno) => turno.paciente,
        destinario: (turno) => turno.medico
    },
    CONFIRMADO:{
        descripcion: "Confirmado",
        remitente: (turno) => turno.medico,
        destinario: (turno) => turno.paciente
    },
    CANCELADO:{
        descripcion: "Cancelado",
        remitente: (turno) => lodash.last(turno.historialEstados).usuario ?? null,
        destinario: (turno) => { 
            const ultimo_estado = lodash.last(turno.historialEstados).usuario;
            if (!ultimo_estado) return null;

            return ultimo_estado.usuario.id === turno.paciente.id
                        ? turno.medico
                        : turno.paciente;
        }
    },
    REALIZADO:{
        descripcion: "Realizado",
        remitente: (turno) => null,
        destinario: (turno) => null
    }
})