import mongoose from 'mongoose';
import { Paciente } from "../domain/models/Paciente.js";


        // this.id = id;
        // this.usuario = usuario;
        // this.dni = dni;
        // this.nombre = nombre;
        // this.obraSocial = obraSocial;
        // this.plan = plan;

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
    obraSocial:{
        // Aca deberiamos guardar obra social y plan . No se como
    },
    plan:{
        
    }
    },{
        timestamps: true,
});

//MIDDLEWARE PARA POPULAR TODOS LOS METODOS QUE TENGAN 'find'
// ReservaSchema.pre(/^find/, function(next) {
//     this.populate('alojamiento', '');
//     next();
// });


pacienteSchema.loadClass(Paciente);

export const PacienteModel = mongoose.model('Paciente', pacienteSchema);
