const {
  getDashboardStats,
} = require("../services/dashboardService");

const getStats = async (req, res, next) => {
  try {
    const stats = await getDashboardStats();

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};