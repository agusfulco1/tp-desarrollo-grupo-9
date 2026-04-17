import {EstadoTurno} from "../enums/EstadoTurno.js"
import Medico from './Medico.js'
import Paciente from './Paciente.js'
import Sede from './Sede.js'
import Practica from './Practica.js'
import CambioEstadoTurno from './CambioEstadoTurno.js';

class Turno {
    constructor(id, medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo){
        this.id = id;
        this.medico = medico;
        this.paciente = paciente;
        this.fechaHora = fechaHora;
        this.sede = sede;
        this.practica = practica;
        this.estado = estado;
        this.historialEstados = [...historialEstados];
        this.costo = costo;
    }

    actualizarEstado(nuevoEstado, quien, motivo){
        const cambio = new CambioEstadoTurno(
            new Date(),
            nuevoEstado,
            this,
            quien,
            motivo
        );

        this.historialEstados.push(cambio);
        
        this.estado = nuevoEstado;
        
        console.log("El usuario: " + quien + " actualizo el turno al estado: " + nuevoEstado + " por el motivo: " + motivo)
    }
}