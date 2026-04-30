import { EstadoTurno } from "../enums/EstadoTurno.js"
import Medico from "./Medico.js" 
import Especialidad from "./Especialidad.js"
import Practica from "./Practica.js" 
import Turno from "./Turno.js" 
import DisponibilidadHoraria from "./DisponibilidadHoraria.js"

export default class Agenda {
    generarTurnosPara(tipo, medico, sede) {
    if (!medico.sedes.includes(sede)) {
        throw new Error("El medico no atiende en esta sede");
    }

    if (medico.especialidades?.includes(tipo)) {
        return this.armarTurnos(tipo, medico, sede);
    }

    if (medico.practicas?.includes(tipo)) {
        return this.armarTurnos(tipo, medico, sede);
    }

    throw new Error("El medico no tiene ni especialidad ni practica valida");
    }

    armarTurnos(tipoTurno, medico, sede){
        const turnos = [];
        medico.disponibilidades.forEach( disponibilidad => {
            const date = new Date();
            const year = date.getFullYear(); 
            const month = date.getMonth();
            const day = date.getDate();
            // Formato int 1242
            const horaDesde = Math.floor(Number(disponibilidad.horaDesde) / 100);
            const minDesde = Number(disponibilidad.horaDesde) % 100;
            const horaHasta = Math.floor(Number(disponibilidad.horaHasta) / 100);
            const minHasta = Number(disponibilidad.horaHasta) % 100;

            const inicioEnMin = horaDesde * 60 + minDesde
            const finEnMin = horaHasta * 60 + minHasta

            const duracion = tipoTurno.duracionTurnoEnMins
            const cantidadTurnos = Math.floor((finEnMin - inicioEnMin) / duracion)

            for (let i = 0; i < cantidadTurnos; i++) {
                const minutosTurno = inicioEnMin + i * duracion

                const hora = Math.floor(minutosTurno / 60)
                const minutos = minutosTurno % 60

                const fechaHoraTurno = new Date(year, month, day, hora, minutos, 0, 0)
                const turno = new Turno(
                    null, //id
                    medico,
                    null,
                    fechaHoraTurno,
                    sede,
                    null,
                    EstadoTurno.DISPONIBLE,
                    [],
                    tipoTurno.costoConsulta
                )
                turnos.push(turno);
            }
        })
        return turnos;
    }

    refrescarTurnosSegunDisponibilidadDe(medico){
    }
}