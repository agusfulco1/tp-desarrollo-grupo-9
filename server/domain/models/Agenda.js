import { EstadoTurno } from "../enums/EstadoTurno.js"
import {Medico} from "./Medico.js" 
import {Especialidad} from "./Especialidad.js"
import {Practica} from "./Practica.js" 
import {Turno} from "./Turno.js" 
import { DisponibilidadHoraria } from "./DisponibilidadHoraria.js"

export class Agenda {
    generarTurnosPara(especialidad, medico, sede) { // El parámetro sede no aparece en el diagrama
        if (!medico.especialidades.includes(especialidad)) {
            console.log("El medico no tiene esta especialidad");
            return;
        }
        if (!medico.sedes.includes(sede)) {
            console.log("El medico no atiende en esta sede");
            return;
        }

        const turnos = [];
        for (const disponibilidad of medico.disponibilidades) {
            const turno = new Turno(
                null, //id
                medico,
                null,
                disponibilidad.fechaHora, // TODO método para generar fecha y hora a partir de la disponibilidad horaria
                sede = sede,
                null,
                EstadoTurno.DISPONIBLE,
                null,
                null
            )
            turnos.push(turno);
        }
        return turnos;
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

        const turnos = [];
        for (const disponibilidad of medico.disponibilidades) {
            const turno = new Turno(
                null, //id
                medico,
                null,
                disponibilidad.fechaHora, // TODO método para generar fecha y hora a partir de la disponibilidad horaria
                sede,
                practica,
                EstadoTurno.DISPONIBLE,
                null,
                practica.costo
            )
            turnos.push(turno);
        }
        return turnos;
    }

    refrescarTurnosSegunDisponibilidadDe(medico){
        
    }
}