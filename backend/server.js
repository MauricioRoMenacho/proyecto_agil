import express from 'express';
import cors from 'cors';
import { testConnection } from './db.js';
import { runMigrations } from './migrate.js';
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import movimientoRoutes from './routes/movimientoRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: en producción permite solo el dominio del frontend (FRONTEND_URL).
// En desarrollo permite localhost en cualquier puerto.
const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL]
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());


(async () => {
    await runMigrations();
    await testConnection();

    app.use('/api', authRoutes);
    app.use('/api/stock', stockRoutes);
    app.use('/api/categorias', categoryRoutes);
    app.use('/api/movimientos', movimientoRoutes);
    app.use('/api/reportes', reportRoutes);

    app.get('/api/health', (_req, res) => {
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    app.listen(PORT, () => {
        console.log(`[Express] Backend server running on port ${PORT}`);
    });
})();

