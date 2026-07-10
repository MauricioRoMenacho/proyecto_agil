import { Sequelize } from 'sequelize';
import net from 'net';

// Node 24 activa "Happy Eyeballs" por defecto, lo que a veces corta la
// conexión al pooler de Supabase con ECONNRESET. Lo apagamos.
net.setDefaultAutoSelectFamily(false);

// ¿Usar SSL? Supabase / producción lo requieren. En local se deja en false.
const useSSL =
    process.env.DB_SSL === 'true' ||
    process.env.DB_SSLMODE === 'require' ||
    (Boolean(process.env.DATABASE_URL) && process.env.DB_SSL !== 'false');

const opcionesSSL = useSSL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {};

// Instancia de Sequelize (el ORM). Dos formas de conectarse:
//  1) DATABASE_URL  -> cadena de conexión completa (Supabase).
//  2) Variables sueltas (DB_HOST, DB_USER, ...) -> PostgreSQL local.
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,               // no imprimir cada consulta en consola
        dialectOptions: opcionesSSL,
    })
    : new Sequelize(
        process.env.DB_NAME || 'proyecto_agil',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'mau7175963',
        {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            dialect: 'postgres',
            logging: false,
            dialectOptions: opcionesSSL,
        }
    );

// Probar la conexión a la base de datos al arrancar el servidor
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("¡Conexión exitosa a la base de datos!");
    } catch (err) {
        console.error("Error al conectar a la base de datos PostgreSQL:", err.message);
    }
};

export default sequelize;
