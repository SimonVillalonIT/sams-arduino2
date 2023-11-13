import jwt from "jsonwebtoken";

export const validateToken = (token) => {
    try {
        if (!token) throw new Error("No Bearer");
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET);
        return { ok: true, error: null }
    } catch (error) {
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
        }).json({ data: { id: uid }, error: null })
    } catch (error) {
        return res.status(400).json({ ok: false, error: tokenVerificationErrors[error.message] })
    }
};
export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};
