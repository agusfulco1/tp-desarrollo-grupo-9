import Usuario from './Usuario.js';
import ObraSocial from './ObraSocial.js';
import Plan from './Plan.js';

export default class Paciente {
    constructor(id, usuario, dni, nombre, obraSocial, plan) {
        this.id = id;
        this.usuario = usuario;
        this.dni = dni;
        this.nombre = nombre;
        this.obraSocial = obraSocial;
        this.plan = plan;
    }
}