const controller = require('../controllers/product.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/product', controller.createProduct);
  app.post('/product/:id', controller.updateProduct);
  app.get('/product/:id', controller.deleteProduct);
  app.get('/product/', controller.getAllProductsById);
};
