import { sequelize, Activo, Movimiento, Usuario } from '../models/index.js';

// Acceso a datos con el ORM Sequelize (sin SQL a mano).

// HU10: historial real. Incluye el activo y el usuario (relaciones) para
// mostrar el nombre del ítem y el usuario, como en Historial.jsx.
export const fetchMovimientos = async () => {
    const movimientos = await Movimiento.findAll({
        include: [
            { model: Activo, attributes: ['name'] },
            { model: Usuario, attributes: ['username'] },
        ],
        order: [['fecha', 'DESC']],
    });

    return movimientos.map((m) => ({
        id: m.id,
        action: m.action,
        quantity: m.quantity,
        details: m.details,
        fecha: m.fecha,
        item: m.Activo ? m.Activo.name : null,
        user: m.Usuario ? m.Usuario.username : null,
    }));
};

// HU8: registrar una ENTRADA (suma stock). HU9: registrar una SALIDA
// (resta stock, validando que no quede negativo).
// Usamos una TRANSACCIÓN del ORM: actualizar el stock y registrar el
// movimiento deben ocurrir juntos (o ambos, o ninguno).
const registrarMovimiento = async (tipo, { activo_id, usuario_id, quantity, details }) => {
    const cantidad = parseInt(quantity);

    if (!activo_id || !cantidad || cantidad <= 0) {
        throw new Error('Datos inválidos: se requiere activo_id y una cantidad mayor a 0.');
    }

    // sequelize.transaction ejecuta todo dentro de una transacción y hace
    // commit automático si sale bien, o rollback si algo lanza un error.
    return await sequelize.transaction(async (t) => {
        // Traer el activo (bloqueado durante la transacción)
        const activo = await Activo.findByPk(activo_id, {
            lock: t.LOCK.UPDATE,
            transaction: t,
        });
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
        await activo.update({ quantity: nuevoStock }, { transaction: t });

        // Registrar el movimiento en el historial
        await Movimiento.create({
            activo_id,
            usuario_id: usuario_id || null,
            action: tipo,
            quantity: cantidad,
            details: details || null,
        }, { transaction: t });

        return activo;
    });
};

export const registrarEntrada = (datos) => registrarMovimiento('Entrada', datos);
export const registrarSalida  = (datos) => registrarMovimiento('Salida', datos);
