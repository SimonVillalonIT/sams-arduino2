import jwt from "jsonwebtoken";
import UserDeviceModel from "../models/user-device-model.js";

class InvitationController {
    constructor() {}

    async generateLink(req, res) {
        if (!process.env.JWT_SECRET || !process.env.DOMAIN) {
            console.error("Missing required environment variables.");
            process.exit(1); // Exit the process or handle the missing variables appropriately
        }
        const { deviceId } = req.body;
        const expiresIn = Math.floor(Date.now() / 1000) + 3600 * 24; // Expira en 24 horas
        const payload = {
            deviceId,
            expiresIn,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        const url = `${process.env.DOMAIN}/api/v1/invitation/validate?token=${token}`;
        res.json({ data: { url }, error: null });
    }

    async getLink(req, res) {
        if (!process.env.JWT_SECRET || !process.env.CLIENT_DOMAIN) {
            console.error("Missing required environment variables.");
            process.exit(1);
        }
        const { token } = req.query;
        const userId = req.uid;
        // In the getLink method
        try {
            if (!token) {
                // Redirect with a message if there's no tokenInternal Server Error
                return res.status(400).json({
                    error: "No se envio ningun token",
                });
            }
            // Verify the token
            const verify = jwt.verify(token, process.env.JWT_SECRET);
            // Handle verification result
            if (verify) {
                const deviceId = verify.deviceId;
                await UserDeviceModel.create({ device_id: deviceId, user_id: userId });
                // If verification is successful, redirect with a success message
                return res.status(200).json({ ok: true });
            } else {
                // Handle unsuccessful verification with an error message
                return res.status(500).json({ error: "Error en la validación" });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async changePermission(req, res) {
        const { userId, admin, deviceId } = req.body;
        if (!userId)
            return res
                .status(400)
                .json({ ok: null, error: "No se especifico ningun Id de usuario" });
        if (admin === null || admin === undefined)
            return res
                .status(400)
                .json({ ok: null, error: "No se especifico ningun permiso" });
        if (!deviceId)
            return res
                .status(400)
                .json({ ok: null, error: "No se especifico ningun Id de dispositivo" });

        try {
            await UserDeviceModel.update({ admin }, { where: { user_id: userId, device_id: deviceId } });
            return res.status(204).json({ ok: true, error: null });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: null, error });
        }
    }
}

export default new InvitationController();