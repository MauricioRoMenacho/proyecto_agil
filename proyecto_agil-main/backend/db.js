import pg from 'pg';
import net from 'net';
const { Pool } = pg;

// Node 24 activa "Happy Eyeballs" (autoSelectFamily) por defecto, lo que a
// veces corta la conexión al pooler de Supabase con ECONNRESET. Lo apagamos
// para que la conexión sea estable.
net.setDefaultAutoSelectFamily(false);

// ¿Usar SSL? Supabase / producción lo requieren. En local se deja en false.
// Se activa si DB_SSL=true, si DB_SSLMODE=require, o si se usa DATABASE_URL
// (Supabase SIEMPRE necesita SSL). Se puede forzar apagado con DB_SSL=false.
const useSSL =
    process.env.DB_SSL === 'true' ||
    process.env.DB_SSLMODE === 'require' ||
    (Boolean(process.env.DATABASE_URL) && process.env.DB_SSL !== 'false');

// Dos formas de conectarse:
//  1) DATABASE_URL  -> cadena de conexión completa (Supabase la da hecha).
//  2) Variables sueltas (DB_HOST, DB_PORT, ...) -> para PostgreSQL local.
const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: useSSL ? { rejectUnauthorized: false } : false,
            keepAlive: true, // mantiene viva la conexión (evita cortes)
        }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'mau7175963',
            database: process.env.DB_NAME || 'proyecto_agil',
            ssl: useSSL ? { rejectUnauthorized: false } : false,
            keepAlive: true,
        }
);

// Captura errores de conexiones inactivas del pool para que el proceso
// no se caiga si la base de datos cierra una conexión.
pool.on('error', (err) => {
    console.error('Error inesperado en el pool de PostgreSQL:', err.message);
});

// Probar la conexión a la base de datos al arrancar el servidor
export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("¡Conexión exitosa a la base de datos!");
        client.release();
    } catch (err) {
        console.error("Error al conectar a la base de datos PostgreSQL:", err.message);
    }
};

export default pool;
