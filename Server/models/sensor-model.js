import { DataTypes, UUIDV4 } from "sequelize";
import { db } from "../database/connectdb.js";

const Sensor = db.define("sensor", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Sensor
