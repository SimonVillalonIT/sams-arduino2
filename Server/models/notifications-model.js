import { DataTypes } from "sequelize";
import { db } from "../database/connectdb.js";

const NotificationModel = db.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.UUID
    },
    deviceId: {
        type: DataTypes.UUID
    }
}, {
    uniqueKeys: {
        unique_notification: {
            fields: ["userId", "deviceId"]
        }
    }
});

export default NotificationModel;
