import { DataTypes, UUIDV4 } from "sequelize";
import { db } from "../database/connectdb.js";

const Notification = db.define("device", {
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
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Notification;