import { describe, expect, test, beforeEach } from "@jest/globals";
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js";
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js"
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
import FactoryNotification from '../../server/domain/models/FactoryNotificacion.js';
import Agenda from '../../server/domain/models/Agenda.js';
import CambioEstadoTurno from "../../server/domain/models/CambioEstadoTurno.js";

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
        userMedico = new Usuario('id', 'Pedro', 'password')
        especialidad = new Especialidad('id', 'Cirujia plastica', 30, 10000)
        practica = new Practica('id', '123', 'Rinoplastia', 30, 10000)
        sede = new Sede('123', 'Charcas', 'direccion')
        disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
        medico = new Medico(1, userMedico, '123', 'Pedro', [especialidad], [practica], [sede], [disponibilidadHoraria])
        
        // REVISAR FORMATO DE FECHAS
        
        fechaHora = new Date(2022, 3, 24)
        manana = new Date(fechaHora)
            manana.setDate(manana.getDate() + 1)
        userPaciente = new Usuario(1,'paciente','123')
        obraSocial = new ObraSocial(1,'OSDE', [])
        plan = new Plan(1,'test',[],[])
        paciente = new Paciente(1, userPaciente, 12345, 'Pepe', obraSocial, plan)
    })

    describe("CrearSegunEstado", () => {
        
        test("Crear notificacion para turno reservado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.DISPONIBLE, [], 8700)
            turno.actualizarEstado(EstadoTurno.RESERVADO, paciente, "Reservar turno")

            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe(paciente)
            expect(notificacion.destinario).toBe(medico)
            expect(notificacion.mensaje).toBe('Turno Reservado para Rinoplastia')
        })

        test("Crear notificacion para turno confirmado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)
            turno.actualizarEstado(EstadoTurno.CONFIRMADO, medico, "Confirmar turno")

            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe(medico)
            expect(notificacion.destinario).toBe(paciente)
            expect(notificacion.mensaje).toBe('Turno Confirmado para Rinoplastia')
        })

        test("Crear notificacion para turno cancelado (si hay historial de estados)", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.CANCELADO, [], 8700)
            turno.actualizarEstado(EstadoTurno.CANCELADO, paciente, "Cancelar turno")
            
            const notificacion = factoryNotification.crearSegunEstado(turno)

            expect(notificacion.remitente).toBe(paciente)
            expect(notificacion.destinario).toBe(medico)
            expect(notificacion.mensaje).toBe('Turno Cancelado para Rinoplastia')
        })

        test("No se crea una notificacion con un turno invalido", () => {
            const turno = "invalido"

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow("Turno inválido")
        })

        test("No se crea una notificacion con un turno sin estado", () => {
            const estadoActual = new CambioEstadoTurno(new Date(), null, null, paciente, "Prueba")
            const turno = new Turno(1, medico, paciente, manana, sede, practica, null, [estadoActual], 8700)

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow("Estado inválido")
        })

        test("No se crea una notificacion con un turno con estado invalido", () => {
            const estadoActual = new CambioEstadoTurno(new Date(), {}, null, paciente, "Prueba")
            const turno = new Turno(1, medico, paciente, manana, sede, practica, {}, [estadoActual], 8700)

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow("Estado inválido")
        })

        test("No se crea una notificacion si no hay historial de estados para un turno cancelado", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.CANCELADO, [], 8700)

            expect(() => factoryNotification.crearSegunEstado(turno))
                    .toThrow("Historial de Estados vacio")
        })
    })
    
    describe("CrearDiaPrevioTurno", () => {
        test("Crear notifaciones al dia previo del turno", () => {
            const turno = new Turno(1, medico, paciente, new Date(2022, 3, 25), sede, practica, EstadoTurno.RESERVADO, [], 8700)
            
            const notificaciones = factoryNotification.crearDiaPrevioTurno(turno)
            const notificacionParaPaciente = notificaciones[0]
            const notificacionParaMedico = notificaciones[1]

            expect(notificacionParaPaciente.destinario).toBe(paciente)
            expect(notificacionParaPaciente.mensaje).toBe('Recordatorio de turno para Rinoplastia el dia 25/3/2022')
            expect(notificacionParaMedico.destinario).toBe(medico)
            expect(notificacionParaMedico.mensaje).toBe('Recordatorio de turno para Rinoplastia el dia 25/3/2022')
        })

        test("No se crean notificaciones con un turno invalido", () => {
            const turno = "invalido"

            expect(() => factoryNotification.crearDiaPrevioTurno(turno))
                    .toThrow("Turno inválido")
        })

        test("No se crean notificaciones con un turno con estado invalido", () => {
            const turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.INVALIDO, [], 8700)

            expect(() => factoryNotification.crearDiaPrevioTurno(turno))
                    .toThrow("Estado inválido")
        })
    })
})