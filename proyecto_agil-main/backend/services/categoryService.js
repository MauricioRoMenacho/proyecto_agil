import pool from '../db.js';

// Consultas parametrizadas -> HU-SEC3.

// HU4: listar categorías. Se calcula "itemCount" (cuántos activos tiene
// cada categoría) con un COUNT, tal como lo espera el frontend.
export const fetchCategories = async () => {
    const result = await pool.query(
        `SELECT c.id, c.name, c.description,
                COUNT(a.id)::int AS "itemCount"
         FROM categorias c
         LEFT JOIN activos a ON a.category_id = c.id
         GROUP BY c.id
         ORDER BY c.id`
    );
    return result.rows;
};

// HU4: crear una nueva categoría.
export const saveCategory = async (category) => {
    const { name, description } = category;
    const result = await pool.query(
        `INSERT INTO categorias (name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [name, description || null]
    );
    return result.rows[0];
};

// HU7: editar una categoría.
export const updateCategory = async (id, category) => {
    const { name, description } = category;
    const result = await pool.query(
        `UPDATE categorias
         SET name = $1, description = $2
         WHERE id = $3
         RETURNING *`,
        [name, description || null, id]
    );
    return result.rows[0] || null;
};

// HU7: eliminar una categoría.
export const deleteCategory = async (id) => {
    const result = await pool.query(
        'DELETE FROM categorias WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
};
