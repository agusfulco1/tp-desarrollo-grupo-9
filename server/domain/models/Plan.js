import CoberturaEspecialidad from './CoberturaEspecialidad.js';
import CoberturaPractica from './CoberturaPractica.js';
import Especialidad from './Especialidad.js';
import Practica from './Practica.js';
import lodash from "lodash";

export default class Plan {
    constructor(id, nombre, coberturaEspecialidad, coberturasPracticas) {
        this.id = id;
        this.nombre = nombre;
        this.coberturaEspecialidad = [...coberturaEspecialidad];
        this.coberturasPracticas = [...coberturasPracticas];
    }

    obtenerCobertura(tipo) {
    const coberturaEspecialidad = this.coberturaEspecialidad.find(
        cobertura => cobertura.especialidad === tipo
    );

    if (coberturaEspecialidad) {
        return coberturaEspecialidad.nivel;
    }

    const coberturaPractica = this.coberturasPracticas.find(
        cobertura => cobertura.practica === tipo
    );

    if (coberturaPractica) {
        return coberturaPractica.nivel;
    }

    throw new Error("No existe esa especialidad ni practica en las coberturas del plan");
    }
}