import Turno from './domain/models/Turno.js';
import Medico from './domain/models/Medico.js';
import Paciente from './domain/models/Paciente.js';
import Usuario from './domain/models/Usuario.js';
import Especialidad from './domain/models/Especialidad.js';
import Practica from './domain/models/Practica.js';
import Sede from './domain/models/Sede.js';
import DisponibilidadHoraria from './domain/models/DisponibilidadHoraria.js';
import ObraSocial from './domain/models/ObraSocial.js';
import Plan from './domain/models/Plan.js';
import Notificacion from './domain/models/Notificacion.js';
import {EstadoTurno} from "./domain/enums/EstadoTurno.js"
import {DiaSemana} from "./domain/enums/DiaSemana.js"
import FactoryNotification from './domain/models/FactoryNotificacion.js';
import Agenda from './domain/models/Agenda.js';

const user = new Usuario('id', 'username', 'password')
const especialidad = new Especialidad('id', 'nombre', 30, 10000)
const practica = new Practica('id', '123', 'nombre', 30, 10000)
const sede = new Sede('123', 'nombre', 'direccion')
const disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, "11:00", "15:00")
const otraDisponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.MIERCOLES, "11:00", "15:00")
const medico = new Medico(1, user, '123', 'name', [especialidad], [practica], [sede], [disponibilidadHoraria])

const fechaHora = new Date()
const manana = new Date(fechaHora)
        manana.setDate(manana.getDate() + 1)
const userPaciente = new Usuario(1,'paciente','123')
const obraSocial = new ObraSocial(1,'OSDE', [])
const plan = new Plan(1,'test',[],[])
const paciente = new Paciente(1,userPaciente,12345, 'Pepe', obraSocial, plan)

const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)

turno.actualizarEstado(EstadoTurno.CANCELADO,user,"abc")
console.log(turno)
turno.actualizarEstado(EstadoTurno.RESERVADO,userPaciente,"def")
console.log(turno)

medico.definirDisponibilidad(disponibilidadHoraria) // Error
medico.definirDisponibilidad(otraDisponibilidadHoraria)
console.log(medico)

const factoryNotification = new FactoryNotification()
const notificacion = factoryNotification.crearSegunEstado(turno)
console.log(notificacion)

const notificacionmanana = factoryNotification.crearDiaPrevioTurno(turno)
console.log(notificacionmanana)

notificacion.marcarComoLeida()
console.log(notificacion)

const agenda = new Agenda()
const turnosEspecialidad = agenda.generarTurnosPara(especialidad, medico, sede)
console.log(turnosEspecialidad)

const turnosPractica = agenda.generarTurnosPara(practica,medico,sede)
console.log(turnosPractica)
