import {Plan} from "./Plan.js"

export class ObraSocial {
    constructor(id, nombre, planes) {
        this.id = id;
        this.nombre = nombre;
        this.planes = [...planes];
    }
}