import express from 'express';
import cors from 'cors';
import { testConnection } from './db.js';
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import movimientoRoutes from './routes/movimientoRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT;

// Middlewares para habilitar CORS y parsear cuerpos JSON
app.use(cors());
app.use(express.json());

// Probar la conexión a la base de datos PostgreSQL al arrancar el servidor
testConnection();

// Rutas de la API REST
app.use('/api', authRoutes);                    // /api/login, /api/logout
app.use('/api/stock', stockRoutes);             // /api/stock (GET, POST, PUT, DELETE)
app.use('/api/categorias', categoryRoutes);     // /api/categorias (GET, POST, PUT, DELETE)
app.use('/api/movimientos', movimientoRoutes);  // /api/movimientos (GET, entrada, salida)
app.use('/api/reportes', reportRoutes);         // /api/reportes (estadísticas generales)

// Iniciar servidor Express
app.listen(PORT, () => {
    console.log(`[Express] Backend server running on port ${PORT}`);
});
