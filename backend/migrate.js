import sequelize from './db.js';
import bcrypt from 'bcryptjs';

export const runMigrations = async () => {
    try {
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id        SERIAL PRIMARY KEY,
                username  VARCHAR(50)  UNIQUE NOT NULL,
                password  VARCHAR(255) NOT NULL,
                role      VARCHAR(30)  NOT NULL DEFAULT 'Admin'
            );
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id           SERIAL PRIMARY KEY,
                name         VARCHAR(100) NOT NULL,
                description  TEXT
            );
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS activos (
                id           SERIAL PRIMARY KEY,
                name         VARCHAR(150) NOT NULL,
                category_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
                quantity     INTEGER NOT NULL DEFAULT 0,
                status       VARCHAR(20) NOT NULL DEFAULT 'Disponible'
                             CHECK (status IN ('Disponible', 'En uso')),
                tags         TEXT[] DEFAULT '{}'
            );
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS movimientos (
                id          SERIAL PRIMARY KEY,
                activo_id   INTEGER REFERENCES activos(id)   ON DELETE CASCADE,
                usuario_id  INTEGER REFERENCES usuarios(id)  ON DELETE SET NULL,
                action      VARCHAR(50) NOT NULL,
                quantity    INTEGER DEFAULT 0,
                details     TEXT,
                fecha       TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `);

        const [[{ count: userCount }]] = await sequelize.query(`SELECT COUNT(*) FROM usuarios`);

        if (parseInt(userCount) === 0) {
            const hashAdmin = await bcrypt.hash('admin123', 10);
            const hashSuper = await bcrypt.hash('super123', 10);

            await sequelize.query(`
                INSERT INTO usuarios (username, password, role) VALUES
                    ('admin',      '${hashAdmin}', 'Admin'),
                    ('supervisor', '${hashSuper}', 'Supervisor');
            `);

            await sequelize.query(`
                INSERT INTO categorias (name, description) VALUES
                    ('Electrónica',           'Dispositivos como laptops, monitores, etc.'),
                    ('Periféricos',           'Teclados, ratones, cables.'),
                    ('Mobiliario',            'Sillas, escritorios, estantes.'),
                    ('Licencias de Software', 'Licencias anuales o perpetuas');
            `);

            await sequelize.query(`
                INSERT INTO activos (name, category_id, quantity, status, tags) VALUES
                    ('Laptop Dell XPS 13',        1, 5,  'Disponible', ARRAY['Nuevo', 'Portátil']),
                    ('Monitor LG 27"',            2, 2,  'En uso',     ARRAY['4K']),
                    ('Teclado Mecánico Keychron', 2, 0,  'Disponible', ARRAY['Inalámbrico']),
                    ('Silla Ergonómica',          3, 10, 'Disponible', ARRAY['Oficina']),
                    ('MacBook Pro M2',            1, 1,  'En uso',     ARRAY['Premium']);
            `);

            await sequelize.query(`
                INSERT INTO movimientos (activo_id, usuario_id, action, quantity, details, fecha) VALUES
                    (1, 1, 'Cambio de Estado',     0, 'De Disponible a En uso',            '2026-06-01 10:30'),
                    (4, 1, 'Creación',            10, 'Añadido 10 unidades',               '2026-06-01 09:15'),
                    (3, 2, 'Actualización Stock',  0, 'Stock reducido a 0 (Crítico)',      '2026-05-31 16:45'),
                    (2, 1, 'Edición',              0, 'Cambio de categoría a Periféricos', '2026-05-30 11:20');
            `);
        }
    } catch (err) {
        console.error('[Migrate] Error:', err.message);
    }
};
