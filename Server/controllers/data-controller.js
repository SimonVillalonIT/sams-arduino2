import DataModel from "../models/data-model.js";
class DataController {
  constructor() {}

  async getDashboard(req, res) {
    const userId = req.uid;
    const data = await DataModel.getDashboardData(userId)
    res.json({
      data,
      error: null,
    });
  }

  async getGraph(req, res) {
    const userId = req.uid;
    const data = await DataModel.getGraphData(userId)
        res.json({
      data,
      error: null,
    });
  }

  async getDeviceGraph(req, res) {
    const { id } = req.params;
      const data = await DataModel.getDeviceGraphData(id)
      res.json({
      data,
      error: null,
    });
  }
}

export default new DataController();
