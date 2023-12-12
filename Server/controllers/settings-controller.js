import SettingsModel from "../models/settings-model"

class SettingsController {
  async getUserSettings(req, res) {
    const userId = req.uid
    const result = await SettingsModel.findOne({where : {user_id : userId}})
    console.log(result)
    res.json({result})
  }
}

export default new SettingsController
