import { describe, expect, test, beforeEach } from "@jest/globals";
import { EstadoTurno } from "../../server/domain/enums/EstadoTurno.js";
import Medico from '../../server/domain/models/Medico.js';
import Usuario from '../../server/domain/models/Usuario.js';
import Especialidad from '../../server/domain/models/Especialidad.js';
import Practica from '../../server/domain/models/Practica.js';
import Sede from '../../server/domain/models/Sede.js';
import ObraSocial from '../../server/domain/models/ObraSocial.js';
import Plan from '../../server/domain/models/Plan.js';
import Notificacion from '../../server/domain/models/Notificacion.js';
import Paciente from '../../server/domain/models/Paciente.js';
import DisponibilidadHoraria from '../../server/domain/models/DisponibilidadHoraria.js';

describe('Notificacion', () => {
    let fechaRandom
    let notificacion 

    beforeEach(() => {
        fechaRandom = new Date("2025-12-25T10:00:00")
        notificacion = new Notificacion(1, null, null, "", null, fechaRandom.getTime(), false)
    })

    describe('Marcar Como Leida', () => {

        test('La notificacion deberia figurar como leida', () => {
            notificacion.marcarComoLeida()
            expect(notificacion.leida).toBe(true)
        })

        test('La fecha de lectura deberia ser la fecha actual', () => {
            const ahora = new Date()
            notificacion.marcarComoLeida()
            expect(notificacion.fechaHoraLeida.getTime()).toBeGreaterThanOrEqual(ahora.getTime())
        })
    })
})