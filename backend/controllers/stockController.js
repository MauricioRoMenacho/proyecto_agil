import * as stockService from '../services/stockService.js';

// HU2: listar activos
export const getStock = async (req, res) => {
    try {
        const stock = await stockService.fetchStock();
        return res.json(stock);
    } catch (err) {
        console.error('Error al obtener stock:', err.message);
        return res.status(500).json({ error: 'Error al obtener el stock.' });
    }
};

// HU3: crear un activo
export const addStockItem = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre del activo es obligatorio.' });
        }
        const nuevo = await stockService.saveStockItem(req.body);
        return res.status(201).json(nuevo);
    } catch (err) {
        console.error('Error al crear activo:', err.message);
        return res.status(500).json({ error: 'Error al guardar el activo.' });
    }
};

// HU5: editar un activo
export const updateStockItem = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizado = await stockService.updateStockItem(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Activo no encontrado.' });
        }
        return res.json(actualizado);
    } catch (err) {
        console.error('Error al editar activo:', err.message);
        return res.status(500).json({ error: 'Error al actualizar el activo.' });
    }
};

// HU6: eliminar un activo
export const deleteStockItem = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await stockService.deleteStockItem(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Activo no encontrado.' });
        }
        return res.json({ message: 'Activo eliminado.', item: eliminado });
    } catch (err) {
        console.error('Error al eliminar activo:', err.message);
        return res.status(500).json({ error: 'Error al eliminar el activo.' });
    }
};
