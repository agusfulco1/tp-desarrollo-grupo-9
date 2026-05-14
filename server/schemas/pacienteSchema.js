import mongoose from 'mongoose';
import { Paciente } from "../domain/models/Paciente.js";

const pacienteSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true
    },
    dni:{
        type : Number,
        minlength: 8,
        maxlength: 8,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    cobertura:{
        obraSocial: { 
            type: String,
            required: true
        },
        plan: { 
            type: String,
            required: true
        },
        numeroAfiliado:{
            type: String,
            required: true
        }
    }
}, {timestamps: true});

//MIDDLEWARE PARA POPULAR TODOS LOS METODOS QUE TENGAN 'find'
// ReservaSchema.pre(/^find/, function(next) {
//     this.populate('alojamiento', '');
//     next();
// });


pacienteSchema.loadClass(Paciente);

export const PacienteModel = mongoose.model('Paciente', pacienteSchema);
