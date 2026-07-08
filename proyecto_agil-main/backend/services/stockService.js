import pool from '../db.js';

// Todas las consultas usan placeholders ($1, $2...) -> HU-SEC3 (anti inyección SQL).

// HU2: listar todos los activos. Hace JOIN con categorias para devolver
// también el NOMBRE de la categoría (el frontend lo muestra como texto).
export const fetchStock = async () => {
    const result = await pool.query(
        `SELECT a.id, a.name, a.category_id, c.name AS category,
                a.quantity, a.status, a.tags
         FROM activos a
         LEFT JOIN categorias c ON a.category_id = c.id
         ORDER BY a.id`
    );
    return result.rows;
};

// Obtener un activo por su id (usado internamente por entradas/salidas).
export const fetchStockById = async (id) => {
    const result = await pool.query('SELECT * FROM activos WHERE id = $1', [id]);
    return result.rows[0] || null;
};

// HU3: crear un nuevo activo.
export const saveStockItem = async (item) => {
    const { name, category_id, quantity, status, tags } = item;
    const result = await pool.query(
        `INSERT INTO activos (name, category_id, quantity, status, tags)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, category_id || null, quantity || 0, status || 'Disponible', tags || []]
    );
    return result.rows[0];
};

// HU5: editar un activo existente.
export const updateStockItem = async (id, item) => {
    const { name, category_id, quantity, status, tags } = item;
    const result = await pool.query(
        `UPDATE activos
         SET name = $1, category_id = $2, quantity = $3, status = $4, tags = $5
         WHERE id = $6
         RETURNING *`,
        [name, category_id || null, quantity || 0, status || 'Disponible', tags || [], id]
    );
    return result.rows[0] || null;
};

// HU6: eliminar un activo.
export const deleteStockItem = async (id) => {
    const result = await pool.query(
        'DELETE FROM activos WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
};
