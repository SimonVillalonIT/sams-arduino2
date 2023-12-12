import SettingsModel from "../models/settings-model.js";

class SettingsController {
  async getUserSettings(req, res) {
    const userId = req.uid;
    const result = await SettingsModel.findOne({ where: { user_id: userId } });
    res.json({ result });
  }

  async setUserSettings(req, res) {
    const userId = req.uid;
    if (req.body["max-warning"] && req.body["max-acepted"]) {
      try {
        const result = await SettingsModel.create({
          user_id: userId,
          "max-warning": req.body["max-warning"],
          "max-acepted": req.body["max-acepted"],
        });
        console.log(result);
        res.status(200).json({ ok: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  }
}

export default new SettingsController();
