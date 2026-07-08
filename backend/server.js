import express from 'express';
import cors from 'cors';
import { testConnection } from './db.js';
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para habilitar CORS y parsear cuerpos JSON
app.use(cors());
app.use(express.json());

// Probar la conexión a la base de datos PostgreSQL al arrancar el servidor
testConnection();


app.use('/api', authRoutes);         // /api/login
app.use('/api/stock', stockRoutes);   // /api/stock (GET y POST)
app.use('/api/categorias', categoryRoutes); // /api/categorias (GET y POST)

// Iniciar servidor Express
app.listen(PORT, () => {
    console.log(`[Express] Backend server running on port ${PORT}`);
});
