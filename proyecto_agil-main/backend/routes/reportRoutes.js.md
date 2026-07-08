import express from 'express';
import { getEstadisticas } from '../controllers/reportController.js';

const router = express.Router();

// Estadísticas generales: lectura pública.
router.get('/', getEstadisticas);

export default router;
