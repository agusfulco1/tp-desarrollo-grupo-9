import mongoose from 'mongoose';
import { DisponibilidadHoraria } from "../domain/models/DisponibilidadHoraria.js";
import { DiaSemana } from "../domain/enums/DiaSemana.js"

const disponibilidadSchema = new mongoose.Schema({
    diaSemana:{
        type: String,
        enum: Object.values(DiaSemana),
        required: true
    },
    horaDesde:{
        type: Number,
        min: 0,
        max: 2359,
        required: true
    },
    horaHasta:{
        type: Number,
        min: 0,
        max: 2359,
        required: true
    }
}, {timestamps: true});

disponibilidadSchema.loadClass(DisponibilidadHoraria);

export const disponibilidadSchema = mongoose.model('DisponibilidadHoraria', disponibilidadSchema);