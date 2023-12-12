import { Router } from "express";
import { requireToken } from "../middlewares/require-token.js";

const router = Router();

router.use(requireToken)
router.get("/",)

export default router;
