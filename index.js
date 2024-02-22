/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */

const express = require('express');
const cookieParser = require('cookie-parser');
const { initialisePool } = require('./server/config/database');
const { setCache } = require('./server/middlewares/cacheGobalProduct');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static('public', { maxAge: 1000 * 60 * 60 * 24 * 365 }));
app.set('views', './server/views');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache all global products
app.use(setCache);

// API Routes
require('./server/routes/api.org.routes')(app);
require('./server/routes/api.emp.routes')(app);
require('./server/routes/api.owner.routes')(app);
require('./server/routes/api.ref.routes')(app);
require('./server/routes/api.inventory.routes')(app);
require('./server/routes/api.product.routes')(app);
require('./server/routes/api.category.routes')(app);
require('./server/routes/api.vendor.routes')(app);
require('./server/routes/api.order.routes')(app);
require('./server/routes/api.customer.routes')(app);
require('./server/routes/api.auth.routes')(app);
require('./server/routes/api.salesdetail.routes')(app);
require('./server/routes/api.cartitem.routes')(app);
require('./server/routes/api.returndetails.routes')(app);
require('./server/routes/api.batch.routes')(app);
require('./server/routes/api.purchase_order.routes')(app);
require('./server/routes/api.credit.routes')(app);
require('./server/routes/api.debit.routes')(app);
require('./server/routes/api.grn.routes')(app);
require('./server/routes/api.financials.routes')(app);
require('./server/routes/api.itemSearch.routes')(app);
require('./server/routes/api.whatsappMsg.route')(app);

// FRONT Routes
require('./server/routes/front.routes')(app);
require('./server/routes/front.auth.routes')(app);

initialisePool().then(() => {
  app.listen(process.env.PORT || 4800, () => {
    console.log('Server is live!');
  });
});
