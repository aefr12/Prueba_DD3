import { DataTypes } from "sequelize";
import db from '../database/connection';

const Palabra = db.define('palabra',{
    palabra: {
        type: DataTypes.STRING
    },
    acertada: {
        type: DataTypes.INTEGER
    },
    mostrada: {
        type: DataTypes.BOOLEAN
    }
});

export default Palabra;