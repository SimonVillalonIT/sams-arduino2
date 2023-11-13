import jwt from "jsonwebtoken";
import UserDeviceModel from "../models/user-device-model.js"

class InvitationController {
  constructor() {}

  async generateLink(req, res) {
    if (!process.env.JWT_SECRET || !process.env.DOMAIN) {
      console.error("Missing required environment variables.");
      process.exit(1); // Exit the process or handle the missing variables appropriately
    }
    const { deviceId } = req.body;
    const expiresIn = Math.floor(Date.now() / 1000) + 3600 * 24; // Expira en 24 horas
    const payload = {
      deviceId,
      expiresIn,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    const url = `${process.env.DOMAIN}/api/v1/invitation/validate?token=${token}`;
    res.json({ data: { url }, error: null });
  }

  async getLink(req, res) {
    if (!process.env.JWT_SECRET || !process.env.CLIENT_DOMAIN) {
      console.error("Missing required environment variables.");
      process.exit(1);
    }
    const { token } = req.query;
    const userId = req.uid;
    // In the getLink method
    try {
      if (!token) {
        // Redirect with a message if there's no tokenInternal Server Error
        return res.redirect(
          `${process.env.CLIENT_DOMAIN}/dashboard?success=false`,
        );
      }
      if (!userId) {
        // Redirect with a message if the user is not authenticated
        return res.redirect(
          `${process.env.CLIENT_DOMAIN}/auth`,
        );
      }
      // Verify the token
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      // Handle verification result
      if (verify) {
          const deviceId = verify.deviceId
          await UserDeviceModel.create({"device_id":deviceId,"user_id": userId})
        // If verification is successful, redirect with a success message
        return res.redirect(
          `${process.env.CLIENT_DOMAIN}/dashboard?success?=true`,
        );
      } else {
        // Handle unsuccessful verification with an error message
        return res.redirect(
          `${process.env.CLIENT_DOMAIN}/dashboard?success=false`,
        );
      }
    } catch (error) {
      return res.redirect(
        `${process.env.CLIENT_DOMAIN}/dashboard?success=false`,
      );
    }
  }
}

export default new InvitationController();
