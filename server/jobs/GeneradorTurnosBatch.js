import cron from 'node-cron';
import dayjs from 'dayjs';
import _, { find } from 'lodash'; 
import Medico from '../schemas/medicoSchema.js';
import Turno from '../schemas/turnoSchema.js';
import Especialidad from '../domain/models/Especialidad.js';
import Practica from '../domain/models/Practica.js';

const MAPA_DIAS = ['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO']

class GeneradorDeTurnos{
    async ejecutar(){
        try {
            // me traigo a los medico que tienen disponibilidad con su especialidad y practica
            const medicos = await medicos.find({'disponibilidades.0' : {$exist : true}})
                .populate('especialidad')
                .populate('practica');

            let turnosNuevos = [];
            const diasProyectados = 30;
            const hoy = dayjs();

            for(const medico of medicos){
                const servicioActivo = medico.Especialidad || medico.Practica;

                if(!servicioActivo || !medico.sedes || medico.sedes.length === 0) continue;

                // tomo su primera sede
                const duracionMinutos = servicioActivo.duracionMinutos || 30;
                const sedeId = medico.sedes[0];

                for(i=1;i<diasProyectados;i++){
                    const fechaEvaluada = hoy.add(1,'day');
                    const nombreDiaSemana = MAPA_DIAS[fechaEvaluar.day()]; // esto me da un dia del array

                    const dispDia = medico.disponibilidades.find(d => d.diaSemana === nombreDiaSemana) // chequeo que tenga disponibiidad ese dia'

                    if(dispDia){
                        // uso el day.js para fraccionar los slots
                        let horaInicioSlot = dayjs(`${fechaEvaluar.format('YYYY-MM-DD')} ${dispDelDia.horaInicio}`);
                        const horaFinTotal = dayjs(`${fechaEvaluar.format('YYYY-MM-DD')} ${dispDelDia.horaFin}`);

                        
                    }


                }

            }
        }
        catch{

        }
    }
}