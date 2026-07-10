-- ============================================================
--  MIGRACIÓN 002 - Datos de prueba (seeds)
--  Ejecutar DESPUÉS de 001_create_tables.sql
--
--  IMPORTANTE (HU-SEC1): las contraseñas NO están en texto plano.
--  Son hashes bcrypt reales generados con bcryptjs (10 rondas):
--     usuario "admin"      -> contraseña real: admin123
--     usuario "supervisor" -> contraseña real: super123
--  El login compara la contraseña ingresada contra estos hashes.
-- ============================================================

-- Usuarios (password = hash bcrypt, nunca texto plano)
INSERT INTO usuarios (username, password, role) VALUES
    ('admin',      '$2b$10$t2k/6FNCnPaE8JvMVDFWyuDhU1j65I.yc9AwbqztEwoQ934ITaWoS', 'Admin'),
    ('supervisor', '$2b$10$OrjVEebnzDf.utVSsNqkuOjCJqjstoXRJI9E5SzdwXTsQY9WWCLkK', 'Supervisor');

-- Categorias (de Categorias.jsx)
INSERT INTO categorias (name, description) VALUES
    ('Electrónica',           'Dispositivos como laptops, monitores, etc.'),
    ('Periféricos',           'Teclados, ratones, cables.'),
    ('Mobiliario',            'Sillas, escritorios, estantes.'),
    ('Licencias de Software', 'Licencias anuales o perpetuas');

-- Activos (de Stock.jsx). category_id referencia las categorias de arriba.
INSERT INTO activos (name, category_id, quantity, status, tags) VALUES
    ('Laptop Dell XPS 13',        1, 5,  'Disponible', ARRAY['Nuevo', 'Portátil']),
    ('Monitor LG 27"',            2, 2,  'En uso',     ARRAY['4K']),
    ('Teclado Mecánico Keychron', 2, 0,  'Disponible', ARRAY['Inalámbrico']),
    ('Silla Ergonómica',          3, 10, 'Disponible', ARRAY['Oficina']),
    ('MacBook Pro M2',            1, 1,  'En uso',     ARRAY['Premium']);

-- Movimientos (de Historial.jsx). Referencian activos y usuarios por id.
INSERT INTO movimientos (activo_id, usuario_id, action, quantity, details, fecha) VALUES
    (1, 1, 'Cambio de Estado',     0, 'De Disponible a En uso',            '2026-06-01 10:30'),
    (4, 1, 'Creación',            10, 'Añadido 10 unidades',               '2026-06-01 09:15'),
    (3, 2, 'Actualización Stock',  0, 'Stock reducido a 0 (Crítico)',      '2026-05-31 16:45'),
    (2, 1, 'Edición',              0, 'Cambio de categoría a Periféricos', '2026-05-30 11:20');
