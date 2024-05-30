/* eslint-disable max-len */
const debitNoteService = require('../v2services/debitNoteService');

module.exports = {
  debitNoteEntry: async (req, res) => {
    const data = req.body;
    try {
      const debitInvoiceNo = await debitNoteService.debitNoteEntry(data);
      res.status(201).json({
        success: true,
        debitInvoiceNo,
        message: 'Debit Note created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
