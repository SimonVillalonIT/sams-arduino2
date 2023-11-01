import { Router } from "express";
import DeviceController from "../controllers/device-controller.js";
import { requireToken } from "../middlewares/require-token.js";

const router = Router();

router.get("/assign", DeviceController.assign);
router.use(requireToken)
router.get("/", DeviceController.getUserDevices)
router.get("/:id", DeviceController.getDevice)
router.post("/link", DeviceController.link);
router.put("/", DeviceController.updateDevice)

export default router;
