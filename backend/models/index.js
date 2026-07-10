import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// ============================================================
//  MODELOS DE SEQUELIZE (ORM)
//  Cada modelo representa una tabla de la base de datos.
//  timestamps: false  -> nuestras tablas no tienen createdAt/updatedAt.
// ============================================================

export const Usuario = sequelize.define('Usuario', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role:     { type: DataTypes.STRING, defaultValue: 'Admin' },
}, { tableName: 'usuarios', timestamps: false });

export const Categoria = sequelize.define('Categoria', {
    id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:        { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
}, { tableName: 'categorias', timestamps: false });

export const Activo = sequelize.define('Activo', {
    id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:        { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER },
    quantity:    { type: DataTypes.INTEGER, defaultValue: 0 },
    status:      { type: DataTypes.STRING, defaultValue: 'Disponible' },
    tags:        { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
}, { tableName: 'activos', timestamps: false });

export const Movimiento = sequelize.define('Movimiento', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    activo_id:  { type: DataTypes.INTEGER },
    usuario_id: { type: DataTypes.INTEGER },
    action:     { type: DataTypes.STRING, allowNull: false },
    quantity:   { type: DataTypes.INTEGER, defaultValue: 0 },
    details:    { type: DataTypes.TEXT },
    fecha:      { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'movimientos', timestamps: false });

// ============================================================
//  ASOCIACIONES (relaciones entre tablas)
// ============================================================

// Una categoría tiene muchos activos; un activo pertenece a una categoría.
// Usamos alias explícito 'categoria' porque Sequelize singulariza mal la
// palabra "Categoria" (la convertiría en "Categorium").
Categoria.hasMany(Activo, { foreignKey: 'category_id', as: 'activos' });
Activo.belongsTo(Categoria, { foreignKey: 'category_id', as: 'categoria' });

// Un activo tiene muchos movimientos; un movimiento pertenece a un activo.
Activo.hasMany(Movimiento, { foreignKey: 'activo_id' });
Movimiento.belongsTo(Activo, { foreignKey: 'activo_id' });

// Un usuario realiza muchos movimientos; un movimiento pertenece a un usuario.
Usuario.hasMany(Movimiento, { foreignKey: 'usuario_id' });
Movimiento.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export { sequelize };
