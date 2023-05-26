const { getPool } = require('../config/database');
// const {authMiddleware} = require('../middlewares');
// const controller = require('../controllers/front.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // Login Page
  app.get('/login', (req, res) => {
    res.render('Auth/login');
  });

  // Register Login
  app.get('/register', (req, res) => {
    res.render('Auth/register');
  });

  // Home Page
  app.get('/', (req, res) => {
    res.render('home');
  });

  // Admin Components
  app.get('/pharmacy_master', (req, res) => {
    res.render('Admin/pharmacy_master');
  });

  app.get('/register_pharmacy', (req, res) => {
    res.render('Admin/register_pharmacy');
  });

  app.get('/salesman_master', (req, res) => {
    res.render('Admin/salesman_master');
  });

  app.get('/access_managment', (req, res) => {
    res.render('Admin/access_managment');
  });

  app.get('/user_role_managment', (req, res) => {
    res.render('Admin/user_role_managment');
  });

  app.get('/pharmacy_sale_report', (req, res) => {
    res.render('Admin/pharmacy_sale_report');
  });

  // Owner Control components
  app.get('/employee_master', (req, res) => {
    getPool().query(
      'select * from employee limit 100',
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('OwnerControls/employee_master', { data: results });
      },
    );
  });

  app.get('/add_employee', (req, res) => {
    res.render('OwnerControls/add_employee');
  });

  app.get('/customer_list', (req, res) => {
    res.render('OwnerControls/customer_list');
  });

  app.get('/new_customer', (req, res) => {
    res.render('OwnerControls/new_customer');
  });

  app.get('/vendor_list', (req, res) => {
    res.render('OwnerControls/vendor_list');
  });

  app.get('/new_vendor', (req, res) => {
    res.render('OwnerControls/new_vendor');
  });

  // Sales components
  app.get('/sale_invoice', (req, res) => {
    res.render('Sales/sale_invoice');
  });

  app.get('/sale_entry_report', (req, res) => {
    res.render('Sales/sale_entry_report');
  });

  app.get('/sale_return_invoice', (req, res) => {
    res.render('Sales/sale_return_invoice');
  });

  app.get('/return_items', (req, res) => {
    res.render('Sales/return_items');
  });

  app.get('/sale_return_report', (req, res) => {
    res.render('Sales/sale_return_report');
  });

  app.get('/invoice_template', (req, res) => {
    res.render('Sales/invoice_template');
  });

  // Inventory Managment component
  app.get('/product_stock', (req, res) => {
    res.render('Inventory/product_stock');
  });

  app.get('/add_product', (req, res) => {
    res.render('Inventory/add_product');
  });

  app.get('/purchase_order', (req, res) => {
    res.render('Inventory/purchase_order');
  });

  app.get('/po_report', (req, res) => {
    res.render('Inventory/po_report');
  });
};
