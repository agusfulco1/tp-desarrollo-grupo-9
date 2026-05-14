import mongoose from 'mongoose';
import { Practica } from "../domain/models/Practica.js";

const practicaSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    duracionTurnoEnMins: {
        type: Number,
        default: 30,
        required: true
    },
    costoConsulta: {
        type: Number,
        default: 0,
        required: true
    }
}, {timestamps: true});

PracticaSchema.loadClass(Practica);

export const PracticaModel = mongoose.model('Practica', practicaSchema);