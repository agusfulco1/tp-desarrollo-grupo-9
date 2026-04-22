import {DiaSemana} from "../enums/DiaSemana.js" 

export default class DisponibilidadHoraria {
    constructor(id, diaSemana, horaDesde, horaHasta) {
        this.id = id;
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
        this.fechaHora = this.crearfechaHora();
    }

    crearfechaHora() {
        const date = new Date();
        const year = date.getFullYear(); 
        const month = date.getMonth();
        const d = new Date(year, month, 24, 10, 33, 30, 0);
    }

    
}