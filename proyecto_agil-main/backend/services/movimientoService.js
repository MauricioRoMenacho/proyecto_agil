import pool from '../db.js';

// Consultas parametrizadas -> HU-SEC3.

// HU10: historial real. JOIN con activos y usuarios para mostrar el
// nombre del ítem y el usuario (como en Historial.jsx).
export const fetchMovimientos = async () => {
    const result = await pool.query(
        `SELECT m.id, m.action, m.quantity, m.details, m.fecha,
                a.name AS item,
                u.username AS "user"
         FROM movimientos m
         LEFT JOIN activos a  ON m.activo_id = a.id
         LEFT JOIN usuarios u ON m.usuario_id = u.id
         ORDER BY m.fecha DESC`
    );
    return result.rows;
};

// HU8: registrar una ENTRADA (suma stock al activo).
// HU9: registrar una SALIDA (resta stock, validando que no quede negativo).
// Se usa "tipo" = 'Entrada' o 'Salida'. Devuelve el activo actualizado.
// Usamos una TRANSACCIÓN: actualizar el stock y registrar el movimiento
// deben ocurrir juntos (o ambos, o ninguno).
const registrarMovimiento = async (tipo, { activo_id, usuario_id, quantity, details }) => {
    const cantidad = parseInt(quantity);

    if (!activo_id || !cantidad || cantidad <= 0) {
        throw new Error('Datos inválidos: se requiere activo_id y una cantidad mayor a 0.');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Traer el activo actual (bloqueado durante la transacción)
        const activoRes = await client.query(
            'SELECT * FROM activos WHERE id = $1 FOR UPDATE',
            [activo_id]
        );
        const activo = activoRes.rows[0];
        if (!activo) {
            throw new Error('El activo indicado no existe.');
        }

        // Calcular el nuevo stock según el tipo de movimiento
        let nuevoStock;
        if (tipo === 'Entrada') {
            nuevoStock = activo.quantity + cantidad;
        } else { // Salida
            if (activo.quantity < cantidad) {
                throw new Error('Stock insuficiente para la salida.');
            }
            nuevoStock = activo.quantity - cantidad;
        }

        // Actualizar el stock del activo
        const updated = await client.query(
            'UPDATE activos SET quantity = $1 WHERE id = $2 RETURNING *',
            [nuevoStock, activo_id]
        );

        // Registrar el movimiento en el historial
        await client.query(
            `INSERT INTO movimientos (activo_id, usuario_id, action, quantity, details)
             VALUES ($1, $2, $3, $4, $5)`,
            [activo_id, usuario_id || null, tipo, cantidad, details || null]
        );

        await client.query('COMMIT');
        return updated.rows[0];
    } catch (err) {
        await client.query('ROLLBACK'); // si algo falla, se deshace todo
        throw err;
    } finally {
        client.release();
    }
};

export const registrarEntrada = (datos) => registrarMovimiento('Entrada', datos);
export const registrarSalida  = (datos) => registrarMovimiento('Salida', datos);
