const inventoryService = require('../v2services/inventoryService');

module.exports = {
  createBatch: (req, res) => {
    try {
      const batchData = req.body;
      inventoryService.createBatch(batchData);
      res.status(200).json({
        success: true,
        message: 'Batch created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
