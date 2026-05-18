import dotenv from "dotenv"
dotenv.config()
import server from "./app.js"
import { MongoDBClient } from "./config/database.js"

import generadorTurnosBatch from './jobs/generadorTurnosBatch.js'

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        // Conectar mongoDB
        await MongoDBClient.connect()
        
        // inicio el generador de turnos desp de conectar mongo
        generadorTurnosBatch.iniciarCron()

        // levantar servidor
        server.port = PORT
        server.launch()
    } catch (error) {
        console.error(error)
    }
}

start()