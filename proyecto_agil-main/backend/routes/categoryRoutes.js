import express from 'express';
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lectura: pública. Modificación: protegida con requireAuth (HU-SEC2).
router.get('/', getCategories);
router.post('/', requireAuth, addCategory);
router.put('/:id', requireAuth, updateCategory);
router.delete('/:id', requireAuth, deleteCategory);

export default router;
