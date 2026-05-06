import {DiaSemana} from "../enums/DiaSemana.js" 

export default class DisponibilidadHoraria {
    constructor(diaSemana, horaDesde, horaHasta) {
        this.diaSemana = diaSemana; 
        this.horaDesde = horaDesde; // Formato 12:42 --> 1242 
        this.horaHasta = horaHasta;
    }
}