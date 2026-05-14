import mongoose from 'mongoose';
import Sede from '../domain/models/Sede.js'

const sedeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
}, {timestamps: true});

sedeSchema.loadClass(Sede);

export const SedeModel = mongoose.model('Sede', sedeSchema);