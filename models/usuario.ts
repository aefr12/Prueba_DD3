import { DataTypes } from "sequelize";
import db from '../database/connection';

const Usuario = db.define('usuario',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    intentos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    victorias: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

export default Usuario;