import mongoose from 'mongoose';
import Usuario from "../domain/models/Usuario.js";

const usuarioSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true,
        unique: true
    },
    rol:{
        type: [String],
        enum: ["PACIENTE", "MEDICO", "ADMIN"],
        required: true,
    }
})

usuarioSchema.loadClass(Usuario);

export const usurioSchema = mongoose.model('Usuario', usuarioSchema);