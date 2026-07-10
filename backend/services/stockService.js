import { Activo, Categoria } from '../models/index.js';

// Acceso a datos con el ORM Sequelize (sin SQL a mano).

// HU2: listar todos los activos. Incluye la categoría (relación) para
// devolver también el NOMBRE de la categoría, como lo muestra el frontend.
export const fetchStock = async () => {
    const activos = await Activo.findAll({
        include: [{ model: Categoria, as: 'categoria', attributes: ['name'] }],
        order: [['id', 'ASC']],
    });

    // Aplanamos el resultado para que tenga la misma forma que antes
    return activos.map((a) => ({
        id: a.id,
        name: a.name,
        category_id: a.category_id,
        category: a.categoria ? a.categoria.name : null,
        quantity: a.quantity,
        status: a.status,
        tags: a.tags,
    }));
};

// Obtener un activo por su id.
export const fetchStockById = async (id) => {
    return await Activo.findByPk(id);
};

// HU3: crear un nuevo activo.
export const saveStockItem = async (item) => {
    const { name, category_id, quantity, status, tags } = item;
    return await Activo.create({
        name,
        category_id: category_id || null,
        quantity: quantity || 0,
        status: status || 'Disponible',
        tags: tags || [],
    });
};

// HU5: editar un activo existente.
export const updateStockItem = async (id, item) => {
    const activo = await Activo.findByPk(id);
    if (!activo) return null;

    const { name, category_id, quantity, status, tags } = item;
    await activo.update({
        name,
        category_id: category_id || null,
        quantity: quantity || 0,
        status: status || 'Disponible',
        tags: tags || [],
    });
    return activo;
};

// HU6: eliminar un activo.
export const deleteStockItem = async (id) => {
    const activo = await Activo.findByPk(id);
    if (!activo) return null;

    await activo.destroy();
    return activo;
};
