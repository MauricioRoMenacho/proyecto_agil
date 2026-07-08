-- ============================================================
--  SCRIPT DE CREACIÓN DE LA BASE DE DATOS - Proyecto Ágil
--  Motor: PostgreSQL (ejecutar en pgAdmin 4 -> Query Tool)
--
--  Deducido del código del frontend (datos mock y payloads):
--    - Stock.jsx        -> tabla "activos"
--    - Categorias.jsx   -> tabla "categorias"
--    - login/index.jsx  -> tabla "usuarios"
--    - Historial.jsx    -> tabla "movimientos"
--
--  RELACIONES:
--    activos      -> pertenece a una categoria   (activos.category_id)
--    movimientos  -> pertenece a un activo        (movimientos.activo_id)
--    movimientos  -> lo hace un usuario           (movimientos.usuario_id)
-- ============================================================

-- ------------------------------------------------------------
-- PASO 0 (IMPORTANTE): la base de datos "proyecto_agil"
-- Si aún NO existe, créala PRIMERO. En pgAdmin puedes:
--   a) Click derecho en "Databases" -> Create -> Database... -> nombre: proyecto_agil
--   o
--   b) Ejecutar esta línea SOLA, conectado a la BD "postgres":
--        CREATE DATABASE proyecto_agil;
-- Luego abre el Query Tool YA CONECTADO a "proyecto_agil"
-- y ejecuta TODO lo de abajo.
-- ------------------------------------------------------------


-- Borramos primero (en orden inverso a las dependencias) por si
-- necesitas volver a ejecutar el script desde cero sin errores.
DROP TABLE IF EXISTS movimientos;
DROP TABLE IF EXISTS activos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;


-- ============================================================
-- TABLA 1: usuarios
-- Guarda las credenciales del login y el rol (Admin / Supervisor).
-- ============================================================
CREATE TABLE usuarios (
    id        SERIAL PRIMARY KEY,           -- id autoincremental
    username  VARCHAR(50) UNIQUE NOT NULL,  -- nombre de usuario para el login
    password  VARCHAR(255) NOT NULL,        -- contraseña
    role      VARCHAR(30) NOT NULL DEFAULT 'Admin'
);


-- ============================================================
-- TABLA 2: categorias
-- Agrupa los activos (Electrónica, Periféricos, etc.).
-- ============================================================
CREATE TABLE categorias (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,   -- "name" en el frontend
    description  TEXT                      -- "description" en el frontend
);


-- ============================================================
-- TABLA 3: activos  (el Stock)
-- Cada activo pertenece a UNA categoria (category_id -> categorias.id).
-- ============================================================
CREATE TABLE activos (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,               -- "name"
    category_id  INTEGER REFERENCES categorias(id),   -- relación con categorias
    quantity     INTEGER NOT NULL DEFAULT 0,          -- "quantity"
    status       VARCHAR(20) NOT NULL DEFAULT 'Disponible'
                 CHECK (status IN ('Disponible', 'En uso')),  -- "status"
    tags         TEXT[]                                -- "tags": lista de etiquetas
);


-- ============================================================
-- TABLA 4: movimientos  (el Historial)
-- Registra cada acción sobre un activo, hecha por un usuario.
-- ============================================================
CREATE TABLE movimientos (
    id          SERIAL PRIMARY KEY,
    activo_id   INTEGER REFERENCES activos(id),    -- sobre qué activo
    usuario_id  INTEGER REFERENCES usuarios(id),   -- quién lo hizo ("user")
    action      VARCHAR(50) NOT NULL,              -- "action" (Entrada, Salida, Edición...)
    quantity    INTEGER DEFAULT 0,                 -- cantidad que entra/sale
    details     TEXT,                              -- "details"
    fecha       TIMESTAMP NOT NULL DEFAULT NOW()   -- "date"
);


-- ============================================================
-- DATOS DE PRUEBA (seeds)
-- Copiados de los datos mock del frontend para que la app
-- tenga contenido real al conectarse. Puedes borrarlos luego.
-- ============================================================

-- Usuarios
INSERT INTO usuarios (username, password, role) VALUES
    ('admin',      'admin123', 'Admin'),
    ('supervisor', 'super123', 'Supervisor');

-- Categorias (mismas de Categorias.jsx)
INSERT INTO categorias (name, description) VALUES
    ('Electrónica',           'Dispositivos como laptops, monitores, etc.'),
    ('Periféricos',           'Teclados, ratones, cables.'),
    ('Mobiliario',            'Sillas, escritorios, estantes.'),
    ('Licencias de Software', 'Licencias anuales o perpetuas');

-- Activos (mismos de Stock.jsx). category_id apunta a las categorias de arriba.
INSERT INTO activos (name, category_id, quantity, status, tags) VALUES
    ('Laptop Dell XPS 13',        1, 5,  'Disponible', ARRAY['Nuevo', 'Portátil']),
    ('Monitor LG 27"',            2, 2,  'En uso',     ARRAY['4K']),
    ('Teclado Mecánico Keychron', 2, 0,  'Disponible', ARRAY['Inalámbrico']),
    ('Silla Ergonómica',          3, 10, 'Disponible', ARRAY['Oficina']),
    ('MacBook Pro M2',            1, 1,  'En uso',     ARRAY['Premium']);

-- Movimientos (mismos de Historial.jsx). Referencian activos y usuarios por id.
INSERT INTO movimientos (activo_id, usuario_id, action, quantity, details, fecha) VALUES
    (1, 1, 'Cambio de Estado',     0, 'De Disponible a En uso',            '2026-06-01 10:30'),
    (4, 1, 'Creación',            10, 'Añadido 10 unidades',               '2026-06-01 09:15'),
    (3, 2, 'Actualización Stock',  0, 'Stock reducido a 0 (Crítico)',      '2026-05-31 16:45'),
    (2, 1, 'Edición',              0, 'Cambio de categoría a Periféricos', '2026-05-30 11:20');


-- ============================================================
-- COMPROBACIÓN rápida (opcional): ver que todo se creó bien.
-- ============================================================
-- SELECT * FROM usuarios;
-- SELECT * FROM categorias;
-- SELECT * FROM activos;
-- SELECT * FROM movimientos;
