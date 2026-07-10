-- ============================================================
--  MIGRACIÓN 001 - Creación de tablas
--  Proyecto Ágil | PostgreSQL (Supabase o local)
--
--  Cómo usar:
--    * SUPABASE: SQL Editor -> pega este archivo -> Run.
--    * LOCAL (pgAdmin/psql): crea antes la BD "proyecto_agil"
--      y ejecuta este script conectado a ella.
--
--  Relaciones:
--    activos      -> categorias   (activos.category_id)
--    movimientos  -> activos      (movimientos.activo_id)
--    movimientos  -> usuarios     (movimientos.usuario_id)
-- ============================================================

-- Borrado en orden inverso a las dependencias (permite re-ejecutar limpio)
DROP TABLE IF EXISTS movimientos CASCADE;
DROP TABLE IF EXISTS activos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ------------------------------------------------------------
-- TABLA usuarios  (login + seguridad)
-- La contraseña se guarda SIEMPRE como hash bcrypt (HU-SEC1),
-- por eso el campo es largo (VARCHAR 255).
-- ------------------------------------------------------------
CREATE TABLE usuarios (
    id        SERIAL PRIMARY KEY,
    username  VARCHAR(50)  UNIQUE NOT NULL,
    password  VARCHAR(255) NOT NULL,
    role      VARCHAR(30)  NOT NULL DEFAULT 'Admin'
);

-- ------------------------------------------------------------
-- TABLA categorias
-- ------------------------------------------------------------
CREATE TABLE categorias (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    description  TEXT
);

-- ------------------------------------------------------------
-- TABLA activos  (el Stock)
-- ON DELETE SET NULL: si se borra una categoria, el activo
-- queda sin categoria (no se borra el activo).
-- ------------------------------------------------------------
CREATE TABLE activos (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    category_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    quantity     INTEGER NOT NULL DEFAULT 0,
    status       VARCHAR(20) NOT NULL DEFAULT 'Disponible'
                 CHECK (status IN ('Disponible', 'En uso')),
    tags         TEXT[] DEFAULT '{}'
);

-- ------------------------------------------------------------
-- TABLA movimientos  (Historial / Entradas / Salidas)
-- ON DELETE CASCADE: si se borra un activo, se borran sus
-- movimientos asociados.
-- ------------------------------------------------------------
CREATE TABLE movimientos (
    id          SERIAL PRIMARY KEY,
    activo_id   INTEGER REFERENCES activos(id)  ON DELETE CASCADE,
    usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    action      VARCHAR(50) NOT NULL,   -- Entrada, Salida, Creación, Edición...
    quantity    INTEGER DEFAULT 0,
    details     TEXT,
    fecha       TIMESTAMP NOT NULL DEFAULT NOW()
);
