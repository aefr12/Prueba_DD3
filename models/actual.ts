import { DataTypes } from "sequelize";
import db from '../database/connection';

const Actual = db.define('actual',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    actual: {
        type: DataTypes.STRING
    }
});

export default Actual;