import express from "express"
import { Server } from "./server.js"
import adminRoutes from './routes/adminRoutes.js'; 

const app = express()
app.use(express.json())
app.use('/api/admin', adminRoutes);
const server = new Server(app)

export default server