import { Router } from "express";
import DeviceController from "../controllers/device-controller.js";
import { requireToken } from "../middlewares/require-token.js";
import checkDevice from "../middlewares/check-device.js";

const router = Router();

router.get("/assign", DeviceController.assign);
router.put("/", checkDevice, DeviceController.updateDevice);
router.use(requireToken);
router.get("/", DeviceController.getUserDevices);
router.get("/:id", DeviceController.getDevice);
router.get("/deviceUsers/:id", DeviceController.getDeviceUsers);
router.post("/link", DeviceController.link);

export default router;
