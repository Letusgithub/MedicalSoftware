const express = require('express');
const cookieParser = require('cookie-parser');
const { initialisePool } = require('./server/config/database');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static('public', { maxAge: 1000 * 60 * 60 * 24 * 365 }));
app.set('views', './server/views');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
require('./server/routes/api.org.routes')(app);
require('./server/routes/api.emp.routes')(app);
require('./server/routes/api.owner.routes')(app);
require('./server/routes/api.ref.routes')(app);
require('./server/routes/inventory.routes')(app);
require('./server/routes/product.routes')(app);
require('./server/routes/vendor.routes')(app);
require('./server/routes/order.routes')(app);
require('./server/routes/api.customer.routes')(app);
require('./server/routes/api.auth.routes')(app);
require('./server/routes/api.salesdetail.routes')(app);
require('./server/routes/api.cartitem.routes')(app);
require('./server/routes/api.returndetails.routes')(app);

// FRONT Routes
require('./server/routes/front.routes')(app);

initialisePool().then(() => {
  app.listen(process.env.PORT || 4800, () => {
    console.log('Server is live!');
  });
});
