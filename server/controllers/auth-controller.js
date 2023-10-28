import { generateToken, validateToken } from "../utils/token-manager.js";
import UserModel from "../models/user-model.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.create({ email, password })
        //Generar el token JWT
        generateToken(user.id, res);
    }
    catch (error) {
        // Alternativa por defecto mongoose
        if (error.name === "SequelizeUniqueConstraintError") {
            // Handle the unique constraint violation for the email field
            return res.status(400).json({ error: "Email is already in use" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({
            where: {
                email,
            }
        })
        if (!user)
            return res.status(403).json({ error: "No existe este usuario" });

        const validPassword = await user.validatePassword(password);
        if (!validPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });
        // Generar el token JWT
        generateToken(user.id, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.json({ ok: true });
};

export const verifyToken = (req, res) => {
const result = validateToken(req.cookies.accessToken)
console.log(result)
    res.send("Llego")
}

