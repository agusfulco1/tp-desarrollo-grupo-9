import mongoose from 'mongoose';
import { Medico } from "../domain/models/Medico.js";
import Especialidad from "../domain/models/Especialidad.js"
import Practica from "../domain/models/Practica.js"
import Sede from "../domain/models/Sede.js"
import Disponibilidad from "../domain/models/Disponibilidad.js"
import { disponibilidadSchema } from './disponibilidadSchema.js';

const medicoSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true
    },
    matricula:{
        type: Number,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    
    especialidad: {type: mongoose.Schema.Types.ObjectId, ref: "especialidad"},

    practica: { type: mongoose.Schema.Types.ObjectId, ref: 'practica' },

    sedes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'sede' }],
    
    disponibilidades:[disponibilidadSchema]
    
}, {timestamps: true});

MedicoSchema.loadClass(Medico);

export const medicoSchema = mongoose.model('Medico', medicoSchema);
