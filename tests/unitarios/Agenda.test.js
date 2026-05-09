import Medico from '../../server/domain/models/Medico.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import Agenda from '../../server/domain/models/Agenda.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js"
import { describe, expect, test } from "@jest/globals"

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
       especialidad = new Especialidad('id', 'nombre', 30, 10000)
       sede = new Sede('123', 'nombre', 'direccion')
       disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
       medico = new Medico(1, userMedico, '123', 'name', [especialidad], [practica], [sede], [disponibilidadHoraria])
       practica = new Practica('id', '123', 'nombre', 30, 10000)
       agenda = new Agenda() 
    })
    describe("GenerarTurnosPara", () => { //Fijarse en estos tests que tambien hay que verificar el contenido de los turnos
        test("Debe generar turnos para un medico segun su especialidad y sede, ", () => {
            const turnosEspecialidad = agenda.generarTurnosPara(especialidad, medico, sede)
        
            expect(turnosEspecialidad).toHaveLength(8)
        })
    
        test("Debe generar turnos para un medico segun su practica y sede, respentando la franja horaria de la disponibilidad", () => {
            const turnosPractica = agenda.generarTurnosPara(practica,medico,sede)

            expect(turnosPractica).toHaveLength(8)
        })
    })
    
    
})