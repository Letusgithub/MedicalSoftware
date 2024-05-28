const inventoryController = require('../v2controllers/inventoryController');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/v2/batches', inventoryController.createBatch);
  app.delete('/api/v2/batches/:batchId', inventoryController.deleteBatch);
  app.get('/api/v2/inventory', inventoryController.getProductInventory);
};
