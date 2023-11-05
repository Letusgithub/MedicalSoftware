const {
  create, getOrdersById, getOrders, updateOrders, getOrderCartInInvoice, getCartItemsInInvoice,
} = require('../controllers/api.cartitem.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/cartitems/', create);
  app.get('/api/cartitems/:id', getOrdersById);
  app.get('/api/getordercartininvoice/:id', getOrderCartInInvoice);
  app.get('/api/getcartitemsininvoice/:id', getCartItemsInInvoice); // get invoice data directly from cart_item table
  app.get('/api/cartmainid/:id', getOrders);
  app.post('/api/updatecartitems', updateOrders);
};
