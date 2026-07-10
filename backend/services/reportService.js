import { Activo, Categoria } from '../models/index.js';

// Estadísticas generales del inventario (módulo Reportes).
// Se traen los datos con el ORM (findAll) y se calculan los totales en JS.
// Nivel de stock considerado "crítico" (igual que en el frontend).
const NIVEL_CRITICO = 2;

export const getEstadisticas = async () => {
    // Traemos todos los activos y todas las categorías con el ORM
    const activos = await Activo.findAll();
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });

    // Resumen general
    const totalAssets = activos.length;
    const inUseAssets = activos.filter((a) => a.status === 'En uso').length;
    const criticalAssets = activos.filter((a) => a.quantity <= NIVEL_CRITICO).length;
    const totalUnits = activos.reduce((suma, a) => suma + a.quantity, 0);

    // Cantidad de activos por categoría
    const byCategory = categorias
        .map((c) => ({
            name: c.name,
            total: activos.filter((a) => a.category_id === c.id).length,
        }))
        .sort((a, b) => b.total - a.total);

    // Cantidad de activos por estado
    const byStatus = [
        { name: 'Disponible', value: activos.filter((a) => a.status === 'Disponible').length },
        { name: 'En uso', value: inUseAssets },
    ];

    return {
        summary: { totalAssets, inUseAssets, criticalAssets, totalUnits },
        byCategory,
        byStatus,
    };
};
