import mongoose from 'mongoose';
import { Turno } from "../domain/models/Turno.js";
import Sede from "../domain/models/Sede.js"
import Practica from "../domain/models/Practica.js"
import { EstadoTurno } from '../domain/enums/EstadoTurno.js';

        // this.id = id;
        // this.medico = medico;
        // this.paciente = paciente;
        // this.fechaHora = fechaHora;
        // this.sede = sede;
        // this.practica = practica;
        // this.estado = estado;
        // this.historialEstados = [...historialEstados];
        // this.costo = costo;

const turnoSchema = new mongoose.Schema({
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medico',
        required: true
    },
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paciente',
        required: true
    },
    fechaHora:{
        type: Date,
        required: true
    },
    sede:{
        type: Sede.schema
    },
    practica:{
        type: Practica.schema
    },
    estado:{
        type: [String],
        enum: Object.values(EstadoTurno)
    },
    historialEstados:{
        type: [[String]]
    },
    costo:{
        type: Number,
        required: true
    }
    },{
        timestamps: true,
});
    

tuenoSchema.loadClass(Turno);

export const turnoSchema = mongoose.model('Turno', turnoSchema);