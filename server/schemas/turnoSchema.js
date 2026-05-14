import mongoose from 'mongoose';
import { Turno } from "../domain/models/Turno.js";
import Sede from "../domain/models/Sede.js"
import Practica from "../domain/models/Practica.js"
import { EstadoTurno } from '../domain/enums/EstadoTurno.js';

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sede',
        required: true
    },
    practica:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'practica',
        required: true
    },
    estado:{
        type: String,
        enum: Object.keys(EstadoTurno),
        default: "DISPONIBLE",
        required: true
    },
    historialEstados:{
        type: [String],
        enum: Object.keys(EstadoTurno),
        required: true
    },
    costo:{
        type: Number,
        required: true
    }
}, {timestamps: true});

turnoSchema.loadClass(Turno);

export const turnoSchema = mongoose.model('Turno', turnoSchema);