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

                for(i=1; i<diasProyectados; i++){
                    const fechaEvaluada = hoy.add(1,'day');
                    const nombreDiaSemana = MAPA_DIAS[fechaEvaluar.day()]; // esto me da un dia del array

                    const dispDia = medico.disponibilidades.find(d => d.diaSemana === nombreDiaSemana) // chequeo que tenga disponibiidad ese dia'

                    if(dispDia){
                        // uso el day.js para fraccionar los slots
                        let horaInicioSlot = dayjs(`${fechaEvaluar.format('YYYY-MM-DD')} ${dispDelDia.horaInicio}`);
                        const horaFinTotal = dayjs(`${fechaEvaluar.format('YYYY-MM-DD')} ${dispDelDia.horaFin}`);

                        
                    }

                    // mientras que la hr del slot + la duracion no pase la hora fin de su turno armamos los turnos
                    while(horaInicioSlot.add(duracionMinutos,'minute').isBefore(horaFinTotal) || horaInicioSlot.add(duracionMinutos, 'minute').isSame(horaFinTotal)){
                        
                        turnosNuevos.push({

                            medico_id: medico._id,
                                sede_id: sedeId,
                                servicio_id: servicioActivo._id, 
                                fechaHora: horaInicioSlot.toDate(), // hay qeu usar toDate para pasrlo al formato de fecha en mongo
                                estadoActual: 'DISPONIBLE',
                                historial: [{
                                    estado: 'DISPONIBLE',
                                    motivo: 'Generación Automática Batch'
                                }]

                        });

                        horaInicioSlot = horaInicioSlot.add(duracionMinutos, 'minute'); // pasamos a el siguiente horario
                    }

                }

            }

            // buscamos los turnos que ya existen en la base de datos para no pisarlos
            const fechasNuevas = turnosNuevos.filter(n => n.fechaHora);

            const turnosEnMongo = await Turno.find({ fechaHora: {$in : fechasNuevas} }, 'fechaHora medico_id').lean();

            // filtramos el array sacando los de mongo

            turnosNuevos = turnosNuevos.filter(nuevo => 
                !turnosExistentes.some(existente => 
                    existente.medico_id.toString() === nuevo.medico_id.toString() && 
                    dayjs(existente.fechaHora).isSame(nuevo.fechaHora)
                )
            ); 

            // cargamos los nuevos a mongo usando loadash, _.chunck divide el array en arrays mas chicos
            // es para que no se rechace una solicitud de carga por exceso de peso

            if (turnosNuevos.length > 0) {
                const paquetesDeTurnos = _.chunk(turnosNuevos, 100);
                
                for (const paquete of paquetesDeTurnos) {
                    await Turno.insertMany(paquete);
                }
                
                console.log(`Se generaron y guardaron ${turnosNuevos.length} turnos nuevos.`);
            } else {
                console.log("No hay turnos nuevos para generar hoy (ya estaban todos creados)");
            }

        }
        catch(error){
            console.error("Error detectado en el proceso batch",error)
        }
    }

    // se inicia a las 02 am
    IniciarCronometro(){
            cron.schedule('0 2 * * *', () => {
                        this.ejecutar();
                    });
        }

}

export default GeneradorDeTurnos();