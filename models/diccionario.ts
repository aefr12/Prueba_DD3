import { DataTypes } from "sequelize";
import db from '../database/connection';

const Diccionario = db.define('diccionario',{
    palabra: {
        type: DataTypes.STRING
    }
});

export default Diccionario;