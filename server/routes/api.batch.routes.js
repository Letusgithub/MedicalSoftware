/* eslint-disable max-len */
const {
  create, getBatch, getAllBatchesById, updateBatchWhenSale, getTotalSumfromPurchase, getRemQtyafterSales, updateBatchQtyAfterSales, getTotalPurchaseQty, getBatchfromBatchId, updateBatchQtyAfterReturn, getOrderStatistics,
} = require('../controllers/api.batch.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/addbatch/', create);
  app.get('/api/getbatch', getBatch);
  app.get('/api/getbatchfrombatchid', getBatchfromBatchId);
  app.get('/api/getbatchforproductbatch', getAllBatchesById);
  // app.post('/api/updatebatchwhensale', updateBatchWhenSale);
  app.post('/api/updatebatchwhensale', updateBatchQtyAfterSales);
  app.post('/api/updatebatchwhenreturn', updateBatchQtyAfterReturn);
  app.get('/api/totalsumfrompurchase', getTotalSumfromPurchase);
  app.get('/api/getremqtyaftersales', getRemQtyafterSales);
  app.get('/api/gettotalpurchaseqty', getTotalPurchaseQty);

  app.get('/api/getorderstatistics', getOrderStatistics);
};
