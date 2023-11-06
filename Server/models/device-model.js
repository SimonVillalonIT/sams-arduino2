import { DataTypes, UUIDV4 } from "sequelize";
import { db } from "../database/connectdb.js";

const Device = db.define("device", {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Device;
