import Usuario from './Usuario.js';
import Especialidad from './Especialidad.js';
import Practica from './Practica.js';
import Sede from './Sede.js';
import DisponibilidadHoraria from './DisponibilidadHoraria.js';

class Medico{
    constructor(id,usuario,matricula,nombre){
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.especialidades = [];
        this.practicas = [];
        this.sedes = [];
        this.disponibilidades = [];
    }

    definirDisponibilidad(nuevaDisponibilidad){
        this.disponibilidades = nuevaDisponibilidad;
    }
}