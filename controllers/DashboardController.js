const { countFolderByMonth } = require("../models/DashboardModal");

class DashboardController {
  async CountparMoisController(req, res) {
    try {
      const { date } = req.body;
      const data = await countFolderByMonth(date);
      res.json(data[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new DashboardController();
