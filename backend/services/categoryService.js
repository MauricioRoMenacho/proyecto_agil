import { Categoria, Activo } from '../models/index.js';

// Acceso a datos con el ORM Sequelize (sin SQL a mano).

// HU4: listar categorías. Para cada una se cuenta cuántos activos tiene
// (itemCount), usando el método count() del ORM.
export const fetchCategories = async () => {
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });

    const resultado = [];
    for (const c of categorias) {
        const itemCount = await Activo.count({ where: { category_id: c.id } });
        resultado.push({
            id: c.id,
            name: c.name,
            description: c.description,
            itemCount,
        });
    }
    return resultado;
};

// HU4: crear una nueva categoría.
export const saveCategory = async (category) => {
    const { name, description } = category;
    return await Categoria.create({ name, description: description || null });
};

// HU7: editar una categoría.
export const updateCategory = async (id, category) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;

    const { name, description } = category;
    await categoria.update({ name, description: description || null });
    return categoria;
};

// HU7: eliminar una categoría.
export const deleteCategory = async (id) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;

    await categoria.destroy();
    return categoria;
};
