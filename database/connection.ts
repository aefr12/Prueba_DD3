import { Sequelize } from 'sequelize';

const db = new Sequelize('db_prueba','pruebas','$090rT31', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
});

export default db;