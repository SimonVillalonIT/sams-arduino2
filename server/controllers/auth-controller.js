import { generateToken, validateToken } from "../utils/token-manager.js";
import UserModel from "../models/user-model.js";

class UserController {
    constructor() {}

    async register(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModel.create({ email, password });
            // Generate the JWT token
            generateToken(user.id, res);
        } catch (error) {
            // Handle errors
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ error: "El email ya se encuentra en uso" });
            }
            return res.status(500).json({ error: "Server error" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await UserModel.findOne({
                where: {
                    email,
                }
            });
            if (!user)
                return res.status(403).json({ error: "El usuario no existe" });

            const validPassword = await user.validatePassword(password);
            if (!validPassword)
                return res.status(403).json({ error: "Contraseña incorrecta" });

            // Generate the JWT token
            generateToken(user.id, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
    }

    logout(req, res) {
        res.clearCookie("accessToken");
        res.json({ ok: true });
    }

    verifyToken(req, res) {
        const result = validateToken(req.cookies.accessToken);
        console.log(result);
        res.send("Reached");
    }
}

export default new UserController();

