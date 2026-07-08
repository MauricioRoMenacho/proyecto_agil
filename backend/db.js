import pg from 'pg';
    const { Pool } = pg;
    
    // Configuración de la conexión a la base de datos PostgreSQL
    const pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'mau7175963', // Contraseña solicitada
        database: process.env.DB_NAME || 'proyecto_agil',
    });
    
    export const testConnection = async () => {
        try {
            const client = await pool.connect();
            console.log("¡Conexión exitosa a la base de datos");
            client.release();
        } catch (err) {
            console.error("Error al conectar a la base de datos PostgreSQL:", err.message);
        }
    };

    export default pool;