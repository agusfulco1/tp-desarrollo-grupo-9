import mongoose from 'mongoose';
import { Medico } from "../domain/models/Medico.js";
import Especialidad from "../domain/models/Especialidad.js"
import Practica from "../domain/models/Practica.js"
import Sede from "../domain/models/Sede.js"
import Disponibilidad from "../domain/models/Disponibilidad.js"

    // constructor(id,usuario,matricula,nombre,especialidades,practicas,sedes,disponibilidades) {
    //     this.id = id;
    //     this.usuario = usuario;
    //     this.matricula = matricula;
    //     this.nombre = nombre;
    //     this.especialidades = [...especialidades];
    //     this.practicas = [...practicas];
    //     this.sedes = [...sedes];
    //     this.disponibilidades = [...disponibilidades];
    // }

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
    especialidades:{
        type: [Especialidad.schema],
    },
    practicas:{
        type: [Practica.schema]
    },
    sedes:{
        type:[Sede.schema]
    },
    disponibilidades:{
        type: [Disponibilidad.schema]
    }
    },{
    timestamps: true,
    
});

MedicoSchema.loadClass(Medico);

export const medicoSchema = mongoose.model('Medico', medicoSchema);
