import generadorTurnosBatch from '../jobs/generadorTurnosBatch.js';

export const forzarGeneracionTurnos = async (req, res) => {
    try {
        await generadorTurnosBatch.ejecutar();
        
        return res.status(200).json({ 
            mensaje: "Proceso batch ejecutado manualmente con éxito." 
        });
    } catch (error) {
        return res.status(500).json({ 
            mensaje: "Error en el servidor", 
            error: error.message 
        });
    }
};