import express from 'express';
import { getStock, addStockItem } from '../controllers/stockController.js';

const router = express.Router();

router.get('/', getStock);
router.post('/', addStockItem);

export default router;
