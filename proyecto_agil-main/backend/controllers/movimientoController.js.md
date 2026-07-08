import * as movimientoService from '../services/movimientoService.js';

// HU10: listar el historial de movimientos
export const getMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientoService.fetchMovimientos();
        return res.json(movimientos);
    } catch (err) {
        console.error('Error al obtener movimientos:', err.message);
        return res.status(500).json({ error: 'Error al obtener el historial.' });
    }
};

// HU8: registrar una entrada. usuario_id se toma del usuario autenticado.
export const addEntrada = async (req, res) => {
    try {
        const datos = { ...req.body, usuario_id: req.user?.id };
        const activo = await movimientoService.registrarEntrada(datos);
        return res.status(201).json({ message: 'Entrada registrada.', activo });
    } catch (err) {
        console.error('Error al registrar entrada:', err.message);
        return res.status(400).json({ error: err.message });
    }
};

// HU9: registrar una salida (valida stock suficiente en el service).
export const addSalida = async (req, res) => {
    try {
        const datos = { ...req.body, usuario_id: req.user?.id };
        const activo = await movimientoService.registrarSalida(datos);
        return res.status(201).json({ message: 'Salida registrada.', activo });
    } catch (err) {
        console.error('Error al registrar salida:', err.message);
        return res.status(400).json({ error: err.message });
    }
};
