import * as categoryService from '../services/categoryService.js';

// HU4: listar categorías
export const getCategories = async (req, res) => {
    try {
        const categorias = await categoryService.fetchCategories();
        return res.json(categorias);
    } catch (err) {
        console.error('Error al obtener categorías:', err.message);
        return res.status(500).json({ error: 'Error al obtener categorías.' });
    }
};

// HU4: crear categoría
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
        }
        const nueva = await categoryService.saveCategory(req.body);
        return res.status(201).json(nueva);
    } catch (err) {
        console.error('Error al crear categoría:', err.message);
        return res.status(500).json({ error: 'Error al guardar la categoría.' });
    }
};

// HU7: editar categoría
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizada = await categoryService.updateCategory(id, req.body);
        if (!actualizada) {
            return res.status(404).json({ error: 'Categoría no encontrada.' });
        }
        return res.json(actualizada);
    } catch (err) {
        console.error('Error al editar categoría:', err.message);
        return res.status(500).json({ error: 'Error al actualizar la categoría.' });
    }
};

// HU7: eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminada = await categoryService.deleteCategory(id);
        if (!eliminada) {
            return res.status(404).json({ error: 'Categoría no encontrada.' });
        }
        return res.json({ message: 'Categoría eliminada.', categoria: eliminada });
    } catch (err) {
        console.error('Error al eliminar categoría:', err.message);
        return res.status(500).json({ error: 'Error al eliminar la categoría.' });
    }
};
