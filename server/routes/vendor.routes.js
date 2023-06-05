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
  app.patch('/vendor', controller.updateVendor);
  app.delete('/vendor/:id', controller.deleteVendor);
  app.get('/getvendor/:id', controller.getVendorById);
  // app.get('/vendor/:id', controller.getAllVendorsById);
  app.get('/allvendors/', controller.getAllVendors);
};
