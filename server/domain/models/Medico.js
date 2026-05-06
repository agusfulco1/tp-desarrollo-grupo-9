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
        
        const existe = lodash.includes(this.disponibilidades,nuevaDisponibilidad)

        /*const existe = this.disponibilidades.some(disponibilidad =>
            disponibilidad == nuevaDisponibilidad             
        );*/
        
        if(!existe){
            this.disponibilidades.push(nuevaDisponibilidad);
        } else {
            throw new Error("Esta disponibilidad ya esta definida.");       
        }
    }
}