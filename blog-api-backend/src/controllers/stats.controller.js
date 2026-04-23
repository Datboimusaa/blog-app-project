const statsService = require('../services/stats.service');

exports.getStats = async (req, res) => {
  try {
    const stats = await statsService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
