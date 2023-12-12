import { Router } from "express";
import { requireToken } from "../middlewares/require-token.js";
import settingsController from "../controllers/settings-controller.js";

const router = Router();

router.use(requireToken);
router.get("/", settingsController.getUserSettings);
router.post("/", settingsController.setUserSettings);

export default router;
