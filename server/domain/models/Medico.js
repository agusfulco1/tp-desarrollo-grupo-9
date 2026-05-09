import Usuario from './Usuario.js';
import Especialidad from './Especialidad.js';
import Practica from './Practica.js';
import Sede from './Sede.js';
import DisponibilidadHoraria from './DisponibilidadHoraria.js';
import lodash from "lodash";

export default class Medico {
    constructor(id,usuario,matricula,nombre,especialidades,practicas,sedes,disponibilidades) {
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.especialidades = [...especialidades];
        this.practicas = [...practicas];
        this.sedes = [...sedes];
        this.disponibilidades = [...disponibilidades];
    }

    definirDisponibilidad(nuevaDisponibilidad) {
        
        const existe = this.disponibilidades.some(d =>
            d.diaSemana === nuevaDisponibilidad.diaSemana &&
            d.horaDesde === nuevaDisponibilidad.horaDesde &&
            d.horaHasta === nuevaDisponibilidad.horaHasta
        );
        
        if(existe){
            throw new Error("Esta disponibilidad ya esta definida"); 
        }

        this.disponibilidades.push(nuevaDisponibilidad);
    }
}