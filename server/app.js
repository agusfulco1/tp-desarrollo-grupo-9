import express from "express"
import { Server } from "./server.js"
import generadorTurnos from './jobs/generadorTurnosBatch.js';

const app = express()
app.use(express.json())
const server = new Server(app)

// despues de conectar a Mongodb
generadorTurnosBatch.iniciarCron();

// EJECUCIÓN MANUAL PARA PRUEBAS (Descomentalo, corré el server, y volvelo a comentar)
// generadorTurnosBatch.ejecutar();

// esto es para probarlo 

export default server