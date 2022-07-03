"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('db_prueba', 'pruebas', '$090rT31', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
});
exports.default = db;
