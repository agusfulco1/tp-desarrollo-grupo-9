import {DiaSemana} from "../enums/DiaSemana.js" 

export class DisponibilidadHoraria {
    constructor(id,diaSemana, horaDesde, horaHasta) {
        this.id = id;
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
    }
}