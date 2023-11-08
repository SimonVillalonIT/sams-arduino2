import { DataTypes } from "sequelize";
import { db } from "../database/connectdb.js";

const UserDevice = db.define("user-device", {
    user_id: {
        type: DataTypes.INTEGER, // Adjust the data type as needed
        primaryKey: true,
        allowNull: false,
    },
    device_id: {
        type: DataTypes.INTEGER, // Adjust the data type as needed
        primaryKey: true,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

export default UserDevice;