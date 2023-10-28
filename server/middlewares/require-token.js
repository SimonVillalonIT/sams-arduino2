import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/token-manager.js";

export const requireToken = (req, res, next) => {
    try {
        console.log(req.cookies)
        let token = req.cookies.accessToken;

        console.log(token)

        if (!token) throw new Error("No Bearer");

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};
