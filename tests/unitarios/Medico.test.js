import { describe, expect, test, beforeEach } from "@jest/globals";
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js";
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js";
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
import lodash from 'lodash';

describe("Medico", () => {
    let userMedico
    let especialidad
    let practica
    let sede
    let disponibilidadHoraria
    let medico
    
    beforeEach(() => {
        userMedico = new Usuario('id', 'Pedro', 'password')
        especialidad = new Especialidad('id', 'Cirujia plastica', 30, 10000)
        practica = new Practica('id', '123', 'Rinoplastia', 30, 10000)
        sede = new Sede('id', 'Charcas', 'Suipacha 676')
        disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500) 
        medico = new Medico(1, userMedico, '123', 'Pedro', [especialidad], [practica], [sede], [disponibilidadHoraria])
    })

    describe("Disponibilidad horaria de medico", () => {

        test("Medico agrega disponibilidad horaria", () => {
            const otraDisponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.MIERCOLES, 1100, 1500)
            
            medico.definirDisponibilidad(otraDisponibilidadHoraria)

            expect(lodash.last(medico.disponibilidades).diaSemana).toBe(DiaSemana.MIERCOLES)
            expect(lodash.last(medico.disponibilidades).horaDesde).toBe(1100)
            expect(lodash.last(medico.disponibilidades).horaHasta).toBe(1500)
        })

        test("Medico no agrega disponibilidad horaria (está ocupada)", () => {
            const otraDisponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
            
            expect(() => medico.definirDisponibilidad(otraDisponibilidadHoraria))
                .toThrow("Esta disponibilidad ya esta definida")
        })
    })
})