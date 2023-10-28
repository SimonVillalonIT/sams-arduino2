import jwt from "jsonwebtoken";

export const validateToken = (token) => {
    try {
        if (!token) throw new Error("No Bearer");

        const result = jwt.verify(token, process.env.JWT_SECRET);
        console.log(result)
        return { ok: true, error: null }
    } catch (error) {
        console.log(error.message);
        return { ok: false, error: tokenVerificationErrors[error.message] }
    }
}

export const generateToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24;
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        res.status(200).cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            secure: !(process.env.MODO === "developer"),
            sameSite: "none",
        }).json({ success: true })
    } catch (error) {
        console.log(error);
    }
};
export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};
