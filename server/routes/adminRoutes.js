import express from 'express';
import { forzarGeneracionTurnos } from '../controllers/adminController.js';

const router = express.Router();

router.post('/turnos/generar-batch', forzarGeneracionTurnos);

export default router;