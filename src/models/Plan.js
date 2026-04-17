import CoberturaEspecialidad from './CoberturaEspecialidad.js';
import CoberturaPractica from './CoberturaPractica.js';
import NivelCobertura from './NivelCobertura.js';
import Especialidad from './Especialidad.js';
import Practica from './Practica.js';

class Plan {
    constructor(id, nombre, coberturaEspecialidad, coberturasPracticas) {
        this.id = id;
        this.nombre = nombre;
        this.coberturaEspecialidad = [...coberturaEspecialidad];
        this.coberturasPracticas = [...coberturasPracticas];
    }
}