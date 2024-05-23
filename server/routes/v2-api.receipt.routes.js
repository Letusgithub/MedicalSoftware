const {
  getSalesReceipt, getSalesReceiptPDF,
  getReturnReceipt, getReturnReceiptPDF,
  getGrnReceipt,
  getGrnReceiptPDF,
} = require('../controllers/v2-api.receipt.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/v2/salesReceipt/:id', getSalesReceipt);
  app.get('/api/v2/salesReceipt/:id/pdf', getSalesReceiptPDF);

  app.get('/api/v2/returnReceipt/:id', getReturnReceipt);
  app.get('/api/v2/returnReceipt/:id/pdf', getReturnReceiptPDF);

  app.get('/api/v2/grnReceipt/:id', getGrnReceipt);
  app.get('/api/v2/grnReceipt/:id/pdf', getGrnReceiptPDF);
};
