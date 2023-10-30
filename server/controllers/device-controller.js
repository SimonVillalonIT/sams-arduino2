import DeviceModel from "../models/device-model.js"
import UserDeviceModel from "../models/user-device-model.js"
import UserModel from "../models/user-model.js"
import { validBody } from "../utils/device-utils.js"

class DeviceController {
    constructor() { }
    async store(req, res) {
        try {
            const { id } = await DeviceModel.create()
            res.json({ id })
        } catch (error) {
            res.status(500)
        }
    }
    async link(req, res) {
        const { deviceId, name } = req.body
        if (!deviceId) return res.status(400).json({ error: "Debes enviar el id del dispositivo" })
        if (!name) return res.status(400).json({ error: "Debes enviar el nombre del dispositivo" })
        if (!req.uid) return res.status(400).json({ error: "Debes estar autenticado" })
        try {
            const result = await DeviceModel.update({ name: name }, { where: { id: deviceId } })
            if (result[0] === 1) {
                await UserDeviceModel.create({ "userId": req.uid, "deviceId": deviceId, "admin": true })
                res.status(204).json({ ok: true })
            } else {
                throw new Error("Device not found")
            }
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Error en el servidor" })
        }
    }
    async getUserDevices(req, res) {
        try {
            const { devices } = await UserModel.findOne({ where: { id: req.uid }, include: DeviceModel })
            res.status(200).json({ "data": devices })
        }
        catch (error) {
            console.error('Error obteniendo los dispositivos:', error);
            res.status(404).json({ error })
        }
    }

    async getDevice(req, res) {
        try {
            const device = await DeviceModel.findOne({ where: { id: req.params.id } })
            if (!device) throw new Error("No se encontro el dispositivo")
            res.status(200).json({ data: device })
        } catch (error) {
            console.log(error.message)
            res.status(404).json({ error: error.message })
        }
    }
    async updateDevice(req, res) {
        if (validBody(req.body)) {
            try {
                const updateDevice = await DeviceModel.update(req.body, { where: { id: req.body.id } })
                if (updateDevice[0] === 1) { return res.status(204).send("Ok") }
                else {
                    res.status(404).json({error: "No se encontro el dispositivo"})
                }
            } catch (error) {
                console.log(error)
                return res.status(500).json({ error: "Error en el servidor" })
            }
        }
        return res.status(400).json({ error: "Formato de peticion invalido" })
    }
}

export default new DeviceController