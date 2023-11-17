import { Router } from "express";
import { requireToken } from "../middlewares/require-token.js";
import DataController from "../controllers/data-controller.js";

const router = Router();

router.use(requireToken);
router.get("/dashboard", DataController.getDashboard);
router.get("/graph", DataController.getGraph);

export default router;