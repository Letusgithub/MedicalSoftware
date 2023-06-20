const controller = require('../controllers/inventory.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/createinventory/', controller.createInventory);
  app.get('/api/getallinventory', controller.getAllInventory);
  app.patch('/inventory/', controller.updateInventory);
  app.delete('/inventory/', controller.deleteInventory);
  app.get('/api/getinventory/:id', controller.getInventoryById);
  app.get('/inventory/:id', controller.getAllInventorysById);
};
