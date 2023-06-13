const {
  createOrder, getAllOrders, getInvoiceOrder, getRevenue, searchDates, autoComplete, allSamples,
} = require('../controllers/api.salesdetail.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/salesdetail/', createOrder);
  app.get('/api/salesdetail/:id', getAllOrders);
  app.get('/api/invoice', getInvoiceOrder);
  app.get('/api/orderdetails/', getRevenue);
  app.get('/api/searchdates/', searchDates);
  app.get('/api/sampledetails', autoComplete);
  app.get('/api/allsample', allSamples);
};
