import express from 'express';
import {
    getStock,
    addStockItem,
    updateStockItem,
    deleteStockItem,
} from '../controllers/stockController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lectura: pública. Modificación: protegida con requireAuth (HU-SEC2).
router.get('/', getStock);
router.post('/', requireAuth, addStockItem);
router.put('/:id', requireAuth, updateStockItem);
router.delete('/:id', requireAuth, deleteStockItem);

export default router;
