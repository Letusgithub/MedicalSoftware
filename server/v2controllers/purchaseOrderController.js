const purchaseOrderService = require('../v2services/purchaseOrderService');

module.exports = {
  purchaseOrder: async (req, res) => {
    try {
      const data = req.body;
      const purchaseOrderNo = await purchaseOrderService.createPurchaseOrder(data);
      return res.json({
        success: true,
        message: 'Purchase order created successfully',
        purchaseOrderNo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to create purchase order',
      });
    }
  },
};
