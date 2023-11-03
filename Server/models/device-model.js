import { DataTypes, UUIDV4 } from 'sequelize'
import { db } from '../database/connectdb.js';
import Historic from './historic-model.js';

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
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

});

Device.afterBulkUpdate(async (device, options) => {
    try {
        const entry = { ...device.attributes, deviceId: device.attributes.id};
        delete entry.id;
        await Historic.create(entry)
    } catch (error) {
        console.log(error)
    }
})

export default Device

