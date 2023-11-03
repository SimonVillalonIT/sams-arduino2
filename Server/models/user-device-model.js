import { DataTypes } from 'sequelize'
import { db } from '../database/connectdb.js';

const UserDevice = db.define("user-device", {
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
});

export default UserDevice
