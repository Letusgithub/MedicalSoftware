const creditNoteService = require('../v2services/creditNoteService');

module.exports = {
  creditNoteEntry: async (req, res) => {
    const data = req.body;
    try {
      const creditInvoiceNo = await creditNoteService.creditNoteEntry(data);
      res.status(201).json({
        success: true,
        creditInvoiceNo,
        message: 'Credit Note created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
