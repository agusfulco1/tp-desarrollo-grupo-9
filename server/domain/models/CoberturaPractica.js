import {NivelCobertura} from "../enums/NivelCobertura.js" 
import Practica from './Practica.js';

export default class CoberturaPractica {
    constructor(practica, nivel) {
        this.practica = practica;
        this.nivel = nivel;
    }
}