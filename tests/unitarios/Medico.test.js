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
import { DiaSemana } from "../../server/domain/enums/DiaSemana.js";
import { describe, expect, test } from "@jest/globals";
import FactoryNotification from '../../server/domain/models/FactoryNotificacion.js';
import Agenda from '../../server/domain/models/Agenda.js';

describe("Medico", () => {
    let userMedico
    let especialidad
    let practica
    let sede
    let disponibilidadHoraria

    let medico
    
    beforeEach(() => {
        userMedico = new Usuario('id', 'username', 'password')
        especialidad = new Especialidad('id', 'nombre', 30, 10000)
        practica = new Practica('id', '123', 'nombre', 30, 10000)
        sede = new Sede('123', 'nombre', 'direccion')
        disponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500) 
        medico = new Medico(1, userMedico, '123', 'name', [especialidad], [practica], [sede], [disponibilidadHoraria])
    })
    describe("DisponibilidadHoraria", () => {
        test("Medico agrega disponibilidad horaria", () => { //Verificar tambien que la disponibilidad que se agrego sea la correcta (como en FactoryNotifiacin)
            const otraDisponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.MIERCOLES, 1100, 1500)
            medico.definirDisponibilidad(otraDisponibilidadHoraria)

            expect(medico.disponibilidades).toHaveLength(2)
        })

        test("Medico no agrega disponibilidad horaria (está ocupada)", () => { //Creo que en este caso tiraba error en la entrega del PR
            const otraDisponibilidadHoraria = new DisponibilidadHoraria(DiaSemana.LUNES, 1100, 1500)
            medico.definirDisponibilidad(otraDisponibilidadHoraria)

            expect(medico.disponibilidades).toHaveLength(1)
        })
    })
    
})