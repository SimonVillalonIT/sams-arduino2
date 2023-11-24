import { Op } from "sequelize";
import { deviceHeartbeats } from "../middlewares/check-device.js";
import DeviceModel from "../models/device-model.js";
import Historic from "../models/historic-model.js";
import UserDeviceModel from "../models/user-device-model.js";
import UserModel from "../models/user-model.js";
import { sendUpdate } from "../sockets/device-socket.js";
import { validBody } from "../utils/device-utils.js";

class DeviceController {
    constructor() { }

    async assign(req, res) {
        try {
            const { id } = await DeviceModel.create();
            res.json({ id });
        } catch (error) {
            res.status(500);
        }
    }

    async link(req, res) {
        const { deviceId, name } = req.body;
        if (!deviceId)
            return res
                .status(400)
                .json({ error: "Debes enviar el id del dispositivo" });
        if (!name)
            return res
                .status(400)
                .json({ error: "Debes enviar el nombre del dispositivo" });
        if (!req.uid)
            return res.status(400).json({ error: "Debes estar autenticado" });
        try {
            const used = await UserDeviceModel.findOne({where:{device_id:deviceId, admin:true}})
            if(used) return res.status(400).json({error: "El dispositivo ya a sido vinculado", data: null})
            const result = await DeviceModel.update({ name}, { where: { id: deviceId } });
            if (result[0] === 1) {
                await UserDeviceModel.create({
                    user_id: req.uid,
                    device_id: deviceId,
                    admin: true,
                });
                res.status(204).json({ ok: true });
            } else {
                throw new Error("Device not found");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async getUserDevices(req, res) {
        try {
            const [data] = await UserModel.findAll({
                where: { id: req.uid },
                attributes: { exclude: ["*"] },
                include: {
                    model: DeviceModel,
                    attributes: { include: ["id", "name", "active"] },
                    through: { attributes: ["admin"] },
                }
            });
            if (data.dataValues.devices.length > 0) return res.status(200).json({ data: data.dataValues.devices, error: null })
            return res.status(404).json({ data: null, error: "El usuario no tiene dispositivos asociados" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ data: null, error });
        }
    }

    async getDeviceUsers(req, res) {
        const userId = req.uid
        const {id} = req.params
         try {
            const [data] = await DeviceModel.findAll({
                where: { id },
                attributes: { exclude: ["*"] },
                include: {
                    model: UserModel,
                    where: {id:{[Op.ne]: userId}},
                    attributes: {  exclude: ["password"] },
                    through: { attributes: ["admin"] },
                }
            });
            if (data.dataValues.users.length > 0) return res.status(200).json({ data:data.dataValues.users, error: null });
            return res.status(404).json({ data: null, error: "El dispositivo no tiene usuarios asociados" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ data: null, error });
        }
    }

    async getDevice(req, res) {
        try {
            const device = await DeviceModel.findOne({
                where: { id: req.params.id },
            });
            if (!device) throw new Error("No se encontro el dispositivo");
            res.status(200).json({ data: device });
        } catch (error) {
            console.log(error.message);
            res.status(404).json({ error: error.message });
        }
    }

    async updateDevice(req, res) {
        if (validBody(req.body)) {
            try {
                const deviceUsers = await UserDeviceModel.findAll({
                    where: {
                        device_id: req.body.id,
                    },
                    attributes: {
                        exclude: ["id"],
                    },
                });
                sendUpdate(deviceUsers, req.body);
                if (!deviceHeartbeats.has(req.body.id)) {
                    await DeviceModel.update({ active: true }, {
                        where: { id: req.body.id },
                    });
                }
                await Historic.create({
                    sensor1: req.body.sensor1,
                    sensor2: req.body.sensor2,
                    sensor3: req.body.sensor3,
                    sensor4: req.body.sensor4,
                    sensor5: req.body.sensor5,
                    sensor6: req.body.sensor6,
                    deviceId: req.body.id,
                });
                return res.status(204).send("Ok");
            } catch (error) {
                console.log(error)
                return res.status(500).json({ error: "Error en el servidor" });
            }
        }
        return res.status(400).json({ error: "Formato de peticion invalido" });
    }
}

export default new DeviceController();
