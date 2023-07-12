/* eslint-disable max-len */
const {
  createOrder, getAllOrders, getInvoiceOrder, getRevenue, searchDates, autoComplete, allSamples, invoiceSales, mainId, createSalesOrder, getTotalSumfromSales, salesMadePrevDay, salesMadePrevMonth, salesMadePrevYear, searchMonth, searchQuarter, searchYear, getSalesIdforReport,
} = require('../controllers/api.salesdetail.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // app.post('/api/salesdetail/', createOrder);
  app.post('/api/salesdetail/', createSalesOrder);
  app.get('/api/getmainid/:id', mainId);
  app.get('/api/salesdetail/:id', getAllOrders);
  app.get('/api/invoice', getInvoiceOrder);
  app.get('/api/searchinvoice', invoiceSales);
  app.get('/api/orderdetails/', getRevenue);

  app.get('/api/getsalesidforreport/:id', getSalesIdforReport);

  app.get('/api/searchdates/', searchDates);
  app.get('/api/searchmonth/', searchMonth);
  app.get('/api/searchquarter/', searchQuarter);
  app.get('/api/searchyear/', searchYear);
  
  app.get('/api/sampledetails', autoComplete);
  app.get('/api/allsample', allSamples);
  app.get('/api/totalsumfromsales', getTotalSumfromSales);
  app.get('/api/salesmadeprevday', salesMadePrevDay);
  app.get('/api/salesmadeprevmonth', salesMadePrevMonth);
  app.get('/api/salesmadeprevyear', salesMadePrevYear);
};
