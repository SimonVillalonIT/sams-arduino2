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
        const existingSetting = await SettingsModel.findOne({
          where: {
            userId,
          },
        });
        if (existingSetting) {
          const update = await SettingsModel.update(
            {
              max_acepted: req.body["max-acepted"],
              max_warning: req.body["max-warning"],
            },
            {
              where: { id: existingSetting.dataValues.id },
            }
          );
          console.log(update);
          return res.status(200).json({ ok: true });
        }
        await SettingsModel.create({
          userId,
          ...req.body,
        });
        return res.status(200).json({ ok: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
    }
  }
}

export default new SettingsController();
