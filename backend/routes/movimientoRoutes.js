import express from 'express';
import {
    getMovimientos,
    addEntrada,
    addSalida,
} from '../controllers/movimientoController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Historial: lectura pública. Entradas/Salidas: protegidas (HU-SEC2).
router.get('/', getMovimientos);
router.post('/entrada', requireAuth, addEntrada);
router.post('/salida', requireAuth, addSalida);

export default router;
