import express from "express"
import { Server } from "./server.js"

const app = express()
app.use(express.json())
const server = new Server(app)

export default server