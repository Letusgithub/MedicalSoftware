/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');
const { checkAuth } = require('../middlewares/checkAuth');
const { fetchOrgId } = require('../middlewares/fetchOrgId');

module.exports = (app) => {
  app.use((req, res, next) => {
    if (!req.app.locals.cookieRetrieved && req.cookies.token != null) {
      const token = req.cookies.token;
      const { payload } = jwt.decode(token);

      getPool().query(
        'select * from organisation where org_telephone =?',
        [payload],
        (error, results) => {
          req.app.locals.token = results[0].org_name;
          req.app.locals.name = results[0].owner_name;
          req.app.locals.number = results[0].org_telephone;
          req.app.locals.GST = results[0].org_gstin;
          req.app.locals.cookieRetrieved = true;
        },
      );
    }

    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/getphonenumber/', checkAuth, fetchOrgId, (req, res) => {
    console.log('org', req.org_id);
    const id = req.org_id;
    res.send({ id });
  });
  // Login Page
  app.get('/login', (req, res) => {
    res.render('Auth/login');
  });

  // Register Login
  app.get('/register', (req, res) => {
    res.render('Auth/register');
  });

  // OTP Verification
  app.get('/verify_otp', (req, res) => {
    const number = req.query.phoneNumber;
    const token = req.query.OTPtoken;
    res.render('Auth/otp_verification', { number, token });
  });

  // Home Page

  app.get('/', checkAuth, fetchOrgId, (req, res) => {
    res.render('home', {
      name: req.app.locals.token, owner: req.app.locals.name, number: req.app.locals.number, gst: req.app.locals.GST,
    });
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
  app.get('/employee_master', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from employee where org_id = ?',
      [req.org_id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('OwnerControls/employee_master', { data: results });
      },
    );
  });

  app.get('/add_employee', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/add_employee', { orgId: req.org_id });
  });

  app.get('/update_employee/:id', (req, res) => {
    getPool().query(
      'select * from employee where emp_id =?',
      [req.params.id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('OwnerControls/update_employee', { data: results });
      },
    );
  });

  app.get('/customer_list', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from customer_data where org_id =? ',
      [req.org_id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        // console.log(results)
        res.render('OwnerControls/customer_list', { data: results });
      },
    );
  });

  app.get('/new_customer', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/new_customer', { orgId: req.org_id });
  });

  app.get('/update_customer/:id', (req, res) => {
    getPool().query(
      'select * from customer_data where customer_id =?',
      [req.params.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.render('OwnerControls/update_customer', { customers: results });
      },
    );
  });

  app.get('/vendor_list', (req, res) => {
    getPool().query(
      'select * from vendor ',
      [],

      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('OwnerControls/vendor_list', { data: results });
      },
    );

    // res.render('OwnerControls/customer_list');
  });

  app.get('/update_vendor/:id', (req, res) => {
    getPool().query(
      'select * from vendor where vendor_id =?',
      [req.params.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.render('OwnerControls/update_vendor', { vendor: results });
      },
    );
  });

  app.get('/new_vendor', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/new_vendor', { orgId: req.org_id });
  });

  // Sales components
  app.get('/sale_invoice', checkAuth, fetchOrgId, (req, res) => {
    // console.log('sales ke andar', req.org_id);
    res.render('Sales/sale_invoice', { orgId: req.org_id });
  });

  app.get('/sale_entry_report', (req, res) => {
    res.render('Sales/sale_entry_report');
  });

  app.get('/sale_return_invoice', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_return_invoice', { orgId: req.org_id });
  });

  app.get('/return_items', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/return_items', { orgId: req.org_id });
  });

  app.get('/sale_return_report', (req, res) => {
    res.render('Sales/sale_return_report');
  });

  app.get('/invoice_template/:id', checkAuth, fetchOrgId, (req, res) => {
    console.log('got the id', req.params.id);
    console.log(req.org_id);
    res.render('Sales/invoice_template', { id: req.params.id, orgId: req.org_id });
  });

  // Inventory Managment component

  app.get('/product_stock', (req, res) => {
    getPool().query(
      'select * from product ',
      [],

      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Inventory/product_stock', { data: results });
      },
    );

    // res.render('OwnerControls/customer_list');
  });

  app.get('/update_product/:id', (req, res) => {
    getPool().query(
      'select * from product where product_id= ?',
      [req.params.id],

      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Inventory/update_product', { data: results });
      },
    );

    // res.render('OwnerControls/customer_list');
  });

  app.get('/add_product', (req, res) => {
    res.render('Inventory/add_product');
  });

  app.get('/purchase_order', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from vendor where org_id = ?',
      [req.org_id],
      (error, results) => {
        if (error) {
          console.log(error);
        }

        res.render('Inventory/purchase_order', { vendors: results });
      },
    );
  });

  app.get('/po_report', (req, res) => {
    res.render('Inventory/po_report');
  });
};
