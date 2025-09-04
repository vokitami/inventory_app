import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// 1️⃣ Conectar a MySQL
const sequelizeRoot = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

// 2️⃣ Crear la base de datos si no existe
await sequelizeRoot.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);

// 3️⃣ Conectar Sequelize a la base recién creada
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// 4️⃣ Definición de modelos

export const Role = sequelize.define('Role', {
  name: { type: DataTypes.STRING, unique: true },
});

export const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

export const Permission = sequelize.define('Permission', {
  action: { type: DataTypes.STRING, unique: true },
});

export const RolePermission = sequelize.define('RolePermission', {}, { timestamps: false });

// 5️⃣ Relaciones
User.belongsTo(Role); // agrega RoleId automáticamente
Role.hasMany(User);

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

// 6️⃣ Sincronizar tablas (en desarrollo usar force: true)
await sequelize.sync({ alter: true });
console.log('✅ Base de datos y tablas sincronizadas');

// 7️⃣ Poblar roles y permisos
const roles = ['guest', 'user', 'admin'];
const permissions = [
  'view_inventory','search_inventory','create_inventory',
  'edit_own_inventory','edit_any_inventory','add_items',
  'edit_items','delete_items','comment_like','manage_users'
];

// Crear roles si no existen
for (const roleName of roles) {
  await Role.findOrCreate({ where: { name: roleName } });
}

// Crear permisos si no existen
for (const perm of permissions) {
  await Permission.findOrCreate({ where: { action: perm } });
}

// Asignar permisos
const adminRole = await Role.findOne({ where: { name: 'admin' } });
const userRole = await Role.findOne({ where: { name: 'user' } });
const guestRole = await Role.findOne({ where: { name: 'guest' } });

await adminRole.addPermissions(await Permission.findAll());
await userRole.addPermissions(await Permission.findAll({
  where: { action: ['view_inventory','search_inventory','create_inventory','edit_own_inventory','comment_like'] }
}));
await guestRole.addPermissions(await Permission.findAll({
  where: { action: ['view_inventory','search_inventory'] }
}));

console.log('✅ Roles y permisos iniciales creados');
