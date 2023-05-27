const controller = require('../controllers/inventory.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/inventory/', controller.createInventory);
  app.patch('/inventory/', controller.updateInventory);
  app.delete('/inventory/', controller.deleteInventory);
  app.get('/inventory/:id', controller.getInventoryById);
  app.get('/inventory/:id', controller.getAllInventorysById);
};
