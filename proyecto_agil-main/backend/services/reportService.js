import pool from '../db.js';

// Consultas de AGREGACIÓN para las estadísticas generales (módulo Reportes).
// Todo se calcula en la base de datos con COUNT/SUM/GROUP BY (no en el frontend).
// Consultas parametrizadas / sin datos del usuario -> HU-SEC3.

// Nivel de stock considerado "crítico" (igual que en el frontend).
const NIVEL_CRITICO = 2;

export const getEstadisticas = async () => {
    // Resumen general (una sola consulta con varios conteos)
    const resumen = await pool.query(
        `SELECT
            COUNT(*)::int AS "totalAssets",
            COALESCE(SUM(CASE WHEN status = 'En uso' THEN 1 ELSE 0 END), 0)::int AS "inUseAssets",
            COALESCE(SUM(CASE WHEN quantity <= $1 THEN 1 ELSE 0 END), 0)::int AS "criticalAssets",
            COALESCE(SUM(quantity), 0)::int AS "totalUnits"
         FROM activos`,
        [NIVEL_CRITICO]
    );

    // Cantidad de activos por categoría
    const porCategoria = await pool.query(
        `SELECT c.name AS name, COUNT(a.id)::int AS total
         FROM categorias c
         LEFT JOIN activos a ON a.category_id = c.id
         GROUP BY c.id
         ORDER BY total DESC`
    );

    // Cantidad de activos por estado (Disponible / En uso)
    const porEstado = await pool.query(
        `SELECT status AS name, COUNT(*)::int AS value
         FROM activos
         GROUP BY status
         ORDER BY status`
    );

    return {
        summary: resumen.rows[0],
        byCategory: porCategoria.rows,
        byStatus: porEstado.rows,
    };
};
