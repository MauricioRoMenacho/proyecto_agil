import * as reportService from '../services/reportService.js';

// Devuelve las estadísticas generales del inventario (módulo Reportes).
export const getEstadisticas = async (req, res) => {
    try {
        const data = await reportService.getEstadisticas();
        return res.json(data);
    } catch (err) {
        console.error('Error al obtener estadísticas:', err.message);
        return res.status(500).json({ error: 'Error al obtener las estadísticas.' });
    }
};
