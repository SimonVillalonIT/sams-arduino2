import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validator-manager.js";

const router = Router();

router.post("/verify", AuthController.verifyToken);
router.get("/logout", AuthController.logout);
router.post("/register", bodyRegisterValidator, AuthController.register);
router.post("/login", bodyLoginValidator, AuthController.login);

export default router;
