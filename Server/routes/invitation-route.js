import { Router } from "express";
import { requireToken } from "../middlewares/require-token.js";
import InvitationController from "../controllers/invitation-controller.js"

const router = Router();

router.use(requireToken)
router.get("/validate", InvitationController.getLink);
router.post("/generate", InvitationController.generateLink);

export default router
