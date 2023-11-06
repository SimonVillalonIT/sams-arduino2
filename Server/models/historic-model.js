import { DataTypes } from "sequelize";
import { db } from "../database/connectdb.js";

const Historic = db.define("historic", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    sensor1: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sensor2: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sensor3: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sensor4: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sensor5: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sensor6: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default Historic;
