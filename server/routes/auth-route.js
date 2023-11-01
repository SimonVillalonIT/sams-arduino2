import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";
import { requireToken } from "../middlewares/require-token.js";
import {
    bodyLoginValidator,
    bodyRegisterValidator,
} from "../middlewares/validator-manager.js";

const router = Router();

router.get("/protected", requireToken,(req, res) => res.json({message: "Protected message"}) );
router.get("/verify", AuthController.verifyToken)
router.get("/logout", AuthController.logout);
router.post("/register", bodyRegisterValidator, AuthController.register);
router.post("/login", bodyLoginValidator, AuthController.login);

export default router;
