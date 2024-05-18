/* eslint-disable max-len */
const {
  create, getBatch, getAllBatchesById, getTotalSumfromPurchase, getRemQtyafterSales, updateBatchQtyAfterSales, getTotalPurchaseQty, getBatchfromBatchId, updateBatchQtyAfterReturn, getOrderStatistics, deleteBatchById,
  updateOnCancelSalesInvoice,
  updateBatchOnCancelGRN,
  updateBatchOnCancelReturnInvoice,
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
  app.get('/api/deletebatch/:id', deleteBatchById);
  app.post('/api/updatebatchwhensale', updateBatchQtyAfterSales);
  app.post('/api/updatebatchwhenreturn', updateBatchQtyAfterReturn);
  app.get('/api/totalsumfrompurchase', getTotalSumfromPurchase);
  app.get('/api/getremqtyaftersales', getRemQtyafterSales);
  app.get('/api/gettotalpurchaseqty', getTotalPurchaseQty);

  app.get('/api/getorderstatistics', getOrderStatistics);

  app.get('/api/updatebatchoncancelsalesinvoice', updateOnCancelSalesInvoice);
  app.get('/api/updatebatchoncancelgrn', updateBatchOnCancelGRN);
  app.get('/api/updatebatchoncancelreturninvoice', updateBatchOnCancelReturnInvoice);
};
