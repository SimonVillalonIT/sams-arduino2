import User from "./user-model.js";
import Device from "./device-model.js";
import UserDevice from "./user-device-model.js";
import Historic from "./historic-model.js";
import Settings from "./settings-model.js";
import Sensor from "./sensor-model.js";

//Relacion usuario - dispositivo
Device.belongsToMany(User, { through: { model: UserDevice, unique: true } });
User.belongsToMany(Device, { through: { model: UserDevice, unique: true } });

//Relacion dispositivo - sensor
Device.hasMany(Sensor)
Sensor.belongsTo(Device)

//Relacion dispositivo - historico
Device.hasMany(Historic);
Historic.belongsTo(Device);

//Relacion usuario - configuraciones
User.hasMany(Settings);
Settings.belongsTo(User);
