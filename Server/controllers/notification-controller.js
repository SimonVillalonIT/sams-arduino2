import { Op } from "sequelize"
import NotificationModel from "../models/notifications-model.js"
import UserModel from "../models/user-model.js"

class NotificationController {
    constructor() { }
    async getInvitations(req, res) {
        const userId = req.uid
        try {
            const response = await NotificationModel.findAll({ where: { userId } })
            if (response.length === 0) res.status(404).json({ ok: false, error: "No se encontraron notificaciones" })
            res.status(200).json({ ok: true, error: false })
        } catch (error) {
            res.status(500).json({ ok: false, error: "Error en el servidor" })
        }
    }

    async getUserByEmail(req, res) {
        const { email } = req.query
        console.log(email)
        try {
            const { count, rows } = await UserModel.findAndCountAll(
                {
                    attributes: ["id", "email"],
                    where: {
                        email: {
                            [Op.like]: `%${email}%`,
                        },
                    },
                    limit: 10,
                }
            )
            res.status(200).json({ ok: true, error: null, data: { count, rows } })
        } catch (error) {
            console.log(error)
        }
    }

    async inviteUser(req, res) {
        const { userId, deviceId } = req.body
        if (userId === req.uid) return res.status(400).json({ ok: false, error: "No puedes enviar notificiones a ti mismo" })
        try {
            await NotificationModel.create({ userId, deviceId })
            res.status(200).json({ ok: true, error: null })
        } catch (error) {
            if (error.parent.code === "ER_DUP_ENTRY") return res.status(400).json({ ok: false, error: "El usuario ya ha sido invitado" })
            return res.status(500).json({ ok: false, error })
        }
    }

    async acceptInvitation(req, res) {
        const { notificationId } = req.body
        const userId = req.uid
        try {
            const [result] = await NotificationModel.update({ accepted: true }, { where: { id: notificationId, userId, accepted: false } })
            if (result === 0) res.status(404).json({ ok: false, error: "No tienes ninguna notificacion con ese id o ya fue aceptada" })
            res.status(200).json({ ok: true, error: null })
        } catch (error) {
            console.log(error)
            res.status(500).json({ ok: true, error: "Error en el servidor" })
        }
    }
}

export default new NotificationController();
