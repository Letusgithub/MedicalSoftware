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
  app.get('/api/v2/inventory/all', inventoryController.getInventory);
  app.get('/api/v2/near-expiry/:id/:filter', inventoryController.getNearExpiryProducts);
  app.post('/api/v2/update-inventory', inventoryController.updateInventory);
  app.delete('/api/v2/inventory/:inventoryId', inventoryController.deleteInventory);
  app.post('/api/v2/onboard-product-inventory', inventoryController.onboardProductInventory);
  app.get('/api/v2/check-inventory', inventoryController.checkInventoryById);
  app.get('/api/v2/search-hsn-gst', inventoryController.getHsnSuggestion);
  app.get('/api/v2/all-category', inventoryController.getAllCategory);
  app.get('/api/v2/category/:categoryId', inventoryController.getCategoryById);
};
