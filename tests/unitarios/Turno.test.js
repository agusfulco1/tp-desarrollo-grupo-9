import { describe, expect, test, beforeEach } from "@jest/globals";
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js";
import Turno from '../../server/domain/models/Turno.js';
import Medico from '../../server/domain/models/Medico.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import ObraSocial from '../../server/domain/models/ObraSocial.js';
import Plan from '../../server/domain/models/Plan.js';
import Paciente from '../../server/domain/models/Paciente.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';
import lodash from "lodash";

describe("Turno", () => {
    let userMedico
    let especialidad
    let practica
    let sede
    let medico
    let manana
    let userPaciente
    let obraSocial
    let plan 
    let paciente
    let turno

    beforeEach(() => {
        userMedico = new Usuario('id', 'Pedro', 'password')
        especialidad = new Especialidad('id', 'Cirujia plastica', 30, 10000)
        practica = new Practica('id', '123', 'Rinoplastia', 30, 10000)
        sede = new Sede('123', 'Charcas', 'direccion')
        medico = new Medico(1, userMedico, '123', 'Pedro', [especialidad], [practica], [sede], [])
        fechaHora = new Date()
        manana = new Date(fechaHora)
        manana.setDate(manana.getDate() + 1)
        userPaciente = new Usuario(1,'paciente','123')
        obraSocial = new ObraSocial(1,'OSDE', [])
        plan = new Plan(1,'test',[],[])
        paciente = new Paciente(1,userPaciente,12345, 'Pepe', obraSocial, plan)
        turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)
    })

    describe("Actualizar Estado Turno", () => {
        test("Actualizar estado de turno a disponible", () => { // Tal vez fijarse si cambia el historial de estados
            turno.actualizarEstado(EstadoTurno.DISPONIBLE,userPaciente,"Estoy disponible")

            expect(turno.estado).toBe(EstadoTurno.DISPONIBLE)
            expect((lodash.last(turno.historialEstados)).estado).toBe(EstadoTurno.DISPONIBLE)
            expect((lodash.last(turno.historialEstados)).turno).toBe(turno)
            expect((lodash.last(turno.historialEstados)).usuario).toBe(userPaciente)
            expect((lodash.last(turno.historialEstados)).motivo).toBe("Estoy disponible")
        })

        test("Actualizar estado de turno a reservado", () => {
            turno.actualizarEstado(EstadoTurno.RESERVADO,userPaciente,"Reservo turno")
            
            expect(turno.estado).toBe(EstadoTurno.RESERVADO)
            expect((lodash.last(turno.historialEstados)).estado).toBe(EstadoTurno.RESERVADO)
            expect((lodash.last(turno.historialEstados)).turno).toBe(turno)
            expect((lodash.last(turno.historialEstados)).usuario).toBe(userPaciente)
            expect((lodash.last(turno.historialEstados)).motivo).toBe("Reservo turno")
        })

        test("Actualizar estado de turno a confirmado", () => {
            turno.actualizarEstado(EstadoTurno.CONFIRMADO,userPaciente,"Confirmo turno")
            
            expect(turno.estado).toBe(EstadoTurno.CONFIRMADO)
            expect((lodash.last(turno.historialEstados)).estado).toBe(EstadoTurno.CONFIRMADO)
            expect((lodash.last(turno.historialEstados)).turno).toBe(turno)
            expect((lodash.last(turno.historialEstados)).usuario).toBe(userPaciente)
            expect((lodash.last(turno.historialEstados)).motivo).toBe("Confirmo turno")
        })

        test("Actualizar estado de turno a cancelado", () => {
            turno.actualizarEstado(EstadoTurno.CANCELADO,userPaciente,"No estoy disponible")
            
            expect(turno.estado).toBe(EstadoTurno.CANCELADO)
            expect((lodash.last(turno.historialEstados)).estado).toBe(EstadoTurno.CANCELADO)
            expect((lodash.last(turno.historialEstados)).turno).toBe(turno)
            expect((lodash.last(turno.historialEstados)).usuario).toBe(userPaciente)
            expect((lodash.last(turno.historialEstados)).motivo).toBe("No estoy disponible")
        })

        test("Actualizar estado de turno a realizado", () => {
            turno.actualizarEstado(EstadoTurno.REALIZADO,userPaciente,"Consulta realizada")
            
            expect(turno.estado).toBe(EstadoTurno.REALIZADO)
            expect((lodash.last(turno.historialEstados)).estado).toBe(EstadoTurno.REALIZADO)
            expect((lodash.last(turno.historialEstados)).turno).toBe(turno)
            expect((lodash.last(turno.historialEstados)).usuario).toBe(userPaciente)
            expect((lodash.last(turno.historialEstados)).motivo).toBe("Consulta realizada")
        })

        test("No se actualiza con un estado invalido", () => {
            expect(() => turno.actualizarEstado(EstadoTurno.TERMINADO,userPaciente,"generic"))
                .toThrow("Estado invalido")
        })
    })
})