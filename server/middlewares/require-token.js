import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/token-manager.js";

export const requireToken = (req, res, next) => {
    try {
        let token = req.cookies.accessToken;

        if (!token) throw new Error("No Bearer");

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};
