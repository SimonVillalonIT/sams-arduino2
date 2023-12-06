import { generateToken, validateToken } from "../utils/token-manager.js";
import UserModel from "../models/user-model.js";

class UserController {
    constructor() {}

    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserModel.create({ name, email, password });
            // Generate the JWT token
            generateToken(user.id, res);
        } catch (error) {
            console.log(error);
            // Handle errors
            if (error.name === "SequelizeUniqueConstraintError") {
                return res
                    .status(400)
                    .json({ data: null, error: "El email ya se encuentra en uso" });
            }
            return res
                .status(500)
                .json({ data: null, error: "Error en el servidor" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        const error = "Email o contraseña incorrecta";
        try {
            let user = await UserModel.findOne({
                where: {
                    email,
                },
            });
            if (!user) return res.status(400).json({ data: null, error });

            const validPassword = await user.validatePassword(password);
            if (!validPassword) return res.status(400).json({ data: null, error });

            // Generate the JWT token
            generateToken(user.id, res);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ data: null, error: "Error en el servidor" });
        }
    }

    logout(req, res) {
        res.clearCookie("accessToken");
        res.json({ ok: true });
    }

    verifyToken(req, res) {
        const { error } = validateToken(req.body.accessToken);
        if (error) return res.status(403).json(error);
        res.status(200).json({ ok: true });
    }
}

export default new UserController();