import { describe, expect, test, beforeEach } from "@jest/globals";
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js";
import Medico from '../../server/domain/models/Medico.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import Agenda from '../../server/domain/models/Agenda.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';

describe("Agenda", () => {
    let userMedico
    let especialidad 
    let sede
    let disponibilidadHoraria 
    let medico 
    let practica
    let agenda

    beforeEach(() => {
       userMedico = new Usuario('id', 'username', 'password')
       especialidad = new Especialidad('id', 'Cirujia plastica', 30, 10000)
       practica = new Practica('id', '123', 'Rinoplastia', 30, 10000)
       sede = new Sede('id', 'Charcas', 'Suipacha 676')
       disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
       medico = new Medico(1, userMedico, '123', 'Pedro', [especialidad], [practica], [sede], [disponibilidadHoraria])
       agenda = new Agenda() 
    })

    //Fijarse en estos tests que tambien hay que verificar el contenido de los turnos
    describe("Generar Turnos", () => {
        test("Debe generar turnos para un medico segun su especialidad y sede, ", () => {
            const turnosEspecialidad = agenda.generarTurnosPara(especialidad, medico, sede)
        
            expect(turnosEspecialidad).toHaveLength(8)
        })
        
        test("Debe generar turnos para un medico segun su practica y sede, respentando la franja horaria de la disponibilidad", () => {
            const turnosPractica = agenda.generarTurnosPara(practica,medico,sede)

            expect(turnosPractica).toHaveLength(8)
        })

        test("No genera turnos si el medico no atiende en la sede", () => {
            const practicaInvalida = new Practica('id', '123', 'invalida', 30, 10000)
            const sedeInvalida = new Sede('id', 'Barrio Norte', 'Pueyrredón 1441')

            expect(() => agenda.generarTurnosPara(practica,medico,sedeInvalida))
                .toThrow("El medico no atiende en esta sede")
        })

        test("No genera turnos para un medico sin especialidad o practica valida", () => {
            const practicaInvalida = new Practica('id', '123', 'invalida', 30, 10000)

            expect(() => agenda.generarTurnosPara(practicaInvalida,medico,sede))
                .toThrow("El medico no tiene ni especialidad ni practica valida")
        })
    })

    describe("Refrescar Turnos Segun Disponibilidad", () => {
        // FALTA IMPLEMENTACION
    })
})