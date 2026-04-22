import { EstadoTurno } from "../enums/EstadoTurno.js"
import Medico from "./Medico.js" 
import Especialidad from "./Especialidad.js"
import Practica from "./Practica.js" 
import Turno from "./Turno.js" 
import DisponibilidadHoraria from "./DisponibilidadHoraria.js"

export default class Agenda {
    generarTurnosPara(especialidad, medico, sede) { // El parámetro sede no aparece en el diagrama
        if (!medico.especialidades.includes(especialidad)) {
            console.log("El medico no tiene esta especialidad");
            return;
        }
        if (!medico.sedes.includes(sede)) {
            console.log("El medico no atiende en esta sede");
            return;
        }

        return this.armarTurnos(especialidad, medico, sede);
    }

    generarTurnosPara(practica, medico, sede) { // El parámetro sede no aparece en el diagrama
        if (!medico.practicas.includes(practica)) {
            console.log("El medico no realiza esta practica");
            return;
        }
        if (!medico.sedes.includes(sede)) {
            console.log("El medico no atiende en esta sede");
            return;
        }

        return this.armarTurnos(practica, medico, sede);
            
    }

    refrescarTurnosSegunDisponibilidadDe(medico){
        
    }

    armarTurnos(tipoTurno, medico, sede){
        const turnos = [];
        medico.disponibilidades.forEach( disponibilidad => {
            const date = new Date();
            const year = date.getFullYear(); 
            const month = date.getMonth();
            const day = date.getDate();
            const [horaDesde, minDesde] = disponibilidad.horaDesde.split(":").map(Number);
            const [horaHasta, minHasta] = disponibilidad.horaHasta.split(":").map(Number);
            const inicioEnMin = horaDesde * 60 + minDesde
            const finEnMin = horaHasta * 60 + minHasta

            const duracion = tipoTurno.duracionTurnoEnMins
            const cantidadTurnos = Math.floor((finEnMin - inicioEnMin) / duracion)

            for (let i = 0; i < cantidadTurnos; i++) {
                const minutosTurno = inicioEnMin + i * duracion

                const hora = Math.floor(minutosTurno / 60)
                const minutos = minutosTurno % 60

                const fechaHoraTurno = new Date(year, month, day, hora-3, minutos, 0, 0)
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
}