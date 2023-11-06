import User from "./user-model.js";
import Device from "./device-model.js";
import UserDevice from "./user-device-model.js";
import Historic from "./historic-model.js";
import Notification from "./notifications-model.js";

//Relacion usuario - dispositivo
Device.belongsToMany(User, { through: { model: UserDevice, unique: true } });
User.belongsToMany(Device, { through: { model: UserDevice, unique: true } });

//Relacion dispositivo - historico
Device.hasMany(Historic);
Historic.belongsTo(Device);

//Relacion notificaciones
Device.hasMany(Notification);
User.hasMany(Notification);
Notification.belongsTo(Device);
Notification.belongsTo(User);
