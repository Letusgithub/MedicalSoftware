const controller = require('../controllers/vendors.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/vendor', controller.createVendor);
  app.post('/vendor/:id', controller.updateVendor);
  app.get('/vendor/:id', controller.deleteVendor);
  app.get('/vendor', controller.getAllVendorsById);
};
