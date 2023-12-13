import SettingsModel from "../models/settings-model.js";

class SettingsController {
  async getUserSettings(req, res) {
    const userId = req.uid;
    const result = await SettingsModel.findOne({ where: { user_id: userId } });
    return res.status(200).json({ data: result });
  }

  async setUserSettings(req, res) {
    const userId = req.uid;
    if (req.body["max-warning"] && req.body["max-acepted"]) {
      try {
        await SettingsModel.create({
          userId,
          "max-warning": req.body["max-warning"],
          "max-acepted": req.body["max-acepted"],
        });
        return res.status(200).json({ ok: true });
      } catch (error) {
        if (error.message === "unique") {
          SettingsModel.update(
            {
              "max-warning": req.body["max-warning"],
              "max-acepted": req.body["max-acepted"],
            },
            { where: {userId} },
          );
          return res.status(200).json({ ok: true });
        }
        return res.status(500).json({ error });
      }
    }
  }
}

export default new SettingsController();
