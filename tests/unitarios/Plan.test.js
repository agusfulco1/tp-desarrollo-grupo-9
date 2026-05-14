import { describe, expect, test, beforeEach } from "@jest/globals";
import { before } from "lodash";
import Plan from "../../server/domain/models/Plan";
import Especialidad from "../../server/domain/models/Especialidad";
import Practica from "../../server/domain/models/Practica";
import CoberturaEspecialidad from "../../server/domain/models/CoberturaEspecialidad";
import CoberturaPractica from "../../server/domain/models/CoberturaPractica";

describe("Plan", () => {
    let especialidad
    let practica
    let plan
    let coberturaEspecialidad
    let coberturaPractica
    beforeEach(() => {
        especialidad = new Especialidad('id', 'Cirujia plastica', 30, 10000)
        coberturaEspecialidad = new CoberturaEspecialidad(especialidad, 50);
        practica = new Practica('id', '123', 'Rinoplastia', 30, 10000)
        coberturaPractica = new CoberturaPractica(practica, 20);
        plan = new Plan(null,"asd", [coberturaEspecialidad], [coberturaPractica])
    })
    describe("ObtenerCobertura", () => {
       test("Debe mostrar el nivel de una cobertura especialidad de un plan segun una especialidad", () => {
        const coberturaEspecialidadNivel = plan.obtenerCobertura(especialidad);
        expect(coberturaEspecialidadNivel).toBe(50)
       })
       test("Debe mostrar el nivel de una cobertura practica de un plan segun una practica", () => {
        const coberturaPracticaNivel = plan.obtenerCobertura(practica);
        expect(coberturaPracticaNivel).toBe(20)
       })
       test("Debe fallar si la especialidad o practica no existen en el plan", () => {

        const otraPractica = new Practica('id', '123', 'asdasd', 30, 10000)
        expect(() =>  plan.obtenerCobertura(otraPractica))
                .toThrow("No existe esa especialidad ni practica en las coberturas del plan")
       })

    })
})