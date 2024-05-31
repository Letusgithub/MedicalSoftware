const purchaseEntryService = require('../v2services/purchaseEntryService');

module.exports = {
  purchaseEntry: async (req, res) => {
    try {
      const data = req.body;
      const grnInvoiceNo = await purchaseEntryService.purchaseEntry(data);
      return res.json({
        success: true,
        message: 'Purchase entry created successfully',
        grnInvoiceNo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to create purchase entry',
      });
    }
  },
};
