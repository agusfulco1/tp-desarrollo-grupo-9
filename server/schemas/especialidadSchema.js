import mongoose from 'mongoose';
import { Especialidad } from "../domain/models/Especialidad.js";

const especialidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    duracionTurnoEnMinutos: {
        type: Number,
        default: 30,
        require: true
    },
    costoConsulta: {
        type: Number,
        default: 0,
        require: true
    }
}, {timestamps: true});

especialidadSchema.loadClass(Especialidad);

export const EspecialidadModel = mongoose.model('Especialidad', especialidadSchema);