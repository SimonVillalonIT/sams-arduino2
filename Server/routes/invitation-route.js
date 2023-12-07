import { Router } from "express";
import { requireToken } from "../middlewares/require-token.js";
import InvitationController from "../controllers/invitation-controller.js";

const router = Router();

router.get(
    "/validate",
    (req, res, next) => {
        const urlToken = req.query.token;
        const token = req.cookies.accessToken;
        if (!token) {
            res.cookie("invitation", urlToken, { httpOnly: false });
            return res
                .status(401)
                .redirect(`${process.env.CLIENT_DOMAIN}/dashboard/invitation`);
        }
        next();
    },
    InvitationController.getLink
);
router.use(requireToken);
router.post("/generate", InvitationController.generateLink);
router.put("/changePermission", InvitationController.changePermission);

export default router;