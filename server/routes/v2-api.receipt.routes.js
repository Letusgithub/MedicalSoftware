const { getSalesReceipt, getSalesReceiptPDF } = require('../controllers/v2-api.receipt.controller');

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
};
