import { Router } from "express";
import NotificationController from "../controllers/notification-controller.js";
import { requireToken } from "../middlewares/require-token.js";

const router = Router();

router.use(requireToken)
router.get("/", NotificationController.getInvitations);
router.get("/users", NotificationController.getUserByEmail);
router.post("/send", NotificationController.inviteUser);
router.put("/accept", NotificationController.acceptInvitation)

export default router
