import { Router } from "express";
import {
    logout,
    login,
    register,
    verifyToken
} from "../controllers/auth-controller.js";
import { requireToken } from "../middlewares/require-token.js";
import {
    bodyLoginValidator,
    bodyRegisterValidator,
} from "../middlewares/validator-manager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken,(req, res) => res.json({message: "Protected message"}) );
router.get("/verify", verifyToken)
router.get("/logout", logout);
export default router;
