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

describe('Notificacion', () => {
    let fechaRandom
    let notificacion
    let turno
    let medico
    let paciente
    let manana
    let sede
    let practica
    let especialidad
    let userMedico
    let userPaciente
    let fechaHora
    let disponibilidadHoraria  

    beforeEach(() => {
        fechaRandom = new Date("2025-12-25T10:00:00")
        notificacion = new Notificacion(1, null, null, "", null, fechaRandom.getTime(), false)
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
        turno = new Turno(1, medico, paciente, manana, sede, practica, EstadoTurno.RESERVADO, [], 8700)
    })
    describe('MarcarComoLeida', () => {
        test('La notificacion deberia figurar como leida', () => {
            notificacion.marcarComoLeida()
            expect(notificacion.leida).toBe(true)
        })

        test('La fecha de lectura deberia ser la fecha actual', () => {
            const ahora = new Date()
            notificacion.marcarComoLeida()
            expect(notificacion.fechaHoraLeida.getTime()).toBeGreaterThanOrEqual(ahora.getTime()) // fechaHoraLeida siempre se genera después de "ahora"
        })
    })
    
})

