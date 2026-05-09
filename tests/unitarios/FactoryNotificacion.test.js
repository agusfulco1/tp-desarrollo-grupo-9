import Turno from '../../server/domain/models/Turno.js';
import Medico from '../../server/domain/models/Medico.js';
import Paciente from '../../server/domain/models/Paciente.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';
import ObraSocial from '../../server/domain/models/ObraSocial.js';
import Plan from '../../server/domain/models/Plan.js';
import Notificacion from '../../server/domain/models/Notificacion.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js";
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js"
import { describe, expect, test } from "@jest/globals";
import FactoryNotification from '../../server/domain/models/FactoryNotificacion.js';
import Agenda from '../../server/domain/models/Agenda.js';

describe("FactoryNotificacion", () => {
    let factoryNotification
    let userMedico
    let especialidad
    let practica
    let sede
    let disponibilidadHoraria
    let medico
    let fechaHora
    let manana
    let userPaciente
    let obraSocial
    let plan
    let paciente
    beforeEach(() => {
        factoryNotification = new FactoryNotification()
        userMedico = new Usuario('id', 'username', 'password')
        especialidad = new Especialidad('id', 'nombre', 30, 10000)
        practica = new Practica('id', '123', 'nombre', 30, 10000)
        sede = new Sede('123', 'nombre', 'direccion')
        disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
        medico = new Medico(1, userMedico, '123', 'name', [especialidad], [practica], [sede], [disponibilidadHoraria])
        
        fechaHora = new Date()
        manana = new Date(fechaHora)
            manana.setDate(manana.getDate() + 1)
        userPaciente = new Usuario(1,'paciente','123')
        obraSocial = new ObraSocial(1,'OSDE', [])
        plan = new Plan(1,'test',[],[])
        paciente = new Paciente(1,userPaciente,12345, 'Pepe', obraSocial, plan)
    })
   

    describe("CrearSegunEstado", () => {
        //Cambiar el mensaje de notificacion esperada para cada test
        test("Crear notificacion para turno reservado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)
            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe('Pepe')
            expect(notificacion.destinatario).toBe('name')
            expect(notificacion.mensaje).toBe('Turno Reservado por Pepe para nombre')
        })

        test("Crear notificacion para turno confirmado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.CONFIRMADO, [], 8700)
            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe('name')
            expect(notificacion.destinatario).toBe('Pepe')
            expect(notificacion.mensaje).toBe('Turno Confirmado por Pepe para nombre')//Para revisar
        })

        test("Crear notificacion para turno cancelado si hay historial de estados", () => {  //Revisar cada caso en el cancelado
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.CANCELADO, [CONFIRMADO,RESERVADO,CANCELADO], 8700)
            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe('Pepe')
            expect(notificacion.destinatario).toBe('name')
            expect(notificacion.mensaje).toBe('Turno Confirmado por Pepe para nombre')
        })

        test("Debe lanzar error si no hay historial de estados al crear notificacion para un turno cancelado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.CANCELADO, [], 8700)

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow(new Error("No hay historial de estados para turno cancelado"))
        })

        test("Debe lanzar error cuando no corresponde a ningun estado", () => {
            
            const turno = new Turno(1, medico, paciente, manana, sede, practica, 'asdasdasd', [], 8700)

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow(new Error("Estado de turno inválido"))
        })
    })
    
    describe("CrearDiaPrevioTurno", () => {
        test("Debe no devolver notifaciones si la fecha del turno no es mañana", () => {
            const turno = new Turno(1, medico, paciente, new Date("2022-03-25"), sede, practica, EstadoTurno.RESERVADO, [], 8700)
            const notificaciones = factoryNotification.crearDiaPrevioTurno(turno)
            
            expect(notificaciones).toBe([])
        })
        test("Crear notifaciones al dia previo del turno", () => {
            const turno = new Turno(1, medico, paciente, new Date("2022-03-25"), sede, practica, EstadoTurno.RESERVADO, [], 8700)
            const notificaciones = factoryNotification.crearDiaPrevioTurno(turno)
            
            const notificacionParaPaciente = notificaciones[0]
            const notificacionParaMedico = notificaciones[1]
            expect(notificacionParaPaciente.destinatario).toBe('Pepe')
            expect(notificacionParaPaciente.mensaje).toBe('Recordatorio de turno para nombre el dia 25/3/2022')

            expect(notificacionParaMedico.destinatario).toBe('name')
            expect(notificacionParaMedico.mensaje).toBe('Recordatorio de turno para nombre el dia 25/3/2022')
        })
    })
    
})