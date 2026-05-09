import Medico from '../../server/domain/models/Medico.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import ObraSocial from '../../server/domain/models/ObraSocial.js';
import Plan from '../../server/domain/models/Plan.js';
import Paciente from '../../server/domain/models/Paciente.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js"
import { describe, expect, test } from "@jest/globals"

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
        userMedico = new Usuario('id', 'username', 'password')
        especialidad = new Especialidad('id', 'nombre', 30, 10000)
        practica = new Practica('id', '123', 'nombre', 30, 10000)
        sede = new Sede('123', 'nombre', 'direccion')
        medico = new Medico(1, userMedico, '123', 'name', [especialidad], [practica], [sede], [])
        manana = new Date(fechaHora)
        manana.setDate(manana.getDate() + 1)
        userPaciente = new Usuario(1,'paciente','123')
        obraSocial = new ObraSocial(1,'OSDE', [])
        plan = new Plan(1,'test',[],[])
        paciente = new Paciente(1,userPaciente,12345, 'Pepe', obraSocial, plan)
        turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)
    })
    describe("ActualizarEstadoTurno", () => {
        test("Actualizar estado de turno a cancelado", () => { //Tal vez fijarse si cambia el historial de estados
            turno.actualizarEstado(EstadoTurno.CANCELADO,user,"abc")
            expect(turno.estado).toBe(EstadoTurno.CANCELADO)
        })

        test("Actualizar estado de turno a reservado", () => {
            turno.actualizarEstado(EstadoTurno.RESERVADO,userPaciente,"def")
            expect(turno.estado).toBe(EstadoTurno.RESERVADO)
        })
    })

    
})