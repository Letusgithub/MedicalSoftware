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

          if (results[0].org_id_main === '') {
            const orgID = results[0].org_id.toString().padStart(7, '0');
            const id = `AA${results[0].org_pincode}${orgID}`;
            console.log('id in midd', id);
            getPool().query(
              'update organisation set org_id_main=? where org_id=?',
              [id, results[0].org_id],
              (idError, idResult) => {
                if (idError) {
                  console.log('id ka error', idError);
                }
                console.log('id ka result', idResult);
                req.app.locals.pharmaId = id;
              },

            );
          } else {
            console.log('here');
            req.app.locals.pharmaId = results[0].org_id_main;
          }
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

  // Home Page
  app.get('/', checkAuth, fetchOrgId, (req, res) => {
    res.render('home', {
      name: req.app.locals.token,
      owner: req.app.locals.name,
      number: req.app.locals.number,
      gst: req.app.locals.GST,
      pharmacyId: req.app.locals.pharmaId,
    });
  });

  // Profile Page
  app.get('/profile', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from organisation where org_id = ?',
      [req.org_id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Profile/profile', { data: results });
      },
    );
  });

  app.get('/update_profile', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from organisation where org_id = ?',
      [req.org_id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Profile/update_profile', { data: results, orgId: req.org_id });
      },
    );
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
        res.render('OwnerControls/employee_master', { data: results, orgId: req.org_id });
      },
    );
  });

  app.get('/add_employee', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/add_employee', { orgId: req.org_id });
  });

  app.get('/update_employee/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from employee where org_id = ? and emp_id =?',
      [req.org_id, req.params.id],
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

  app.get('/update_customer/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from customer_data where org_id = ? and customer_id =?',
      [req.org_id, req.params.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.render('OwnerControls/update_customer', { data: results });
      },
    );
  });

  app.get('/vendor_list', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from vendor where org_id = ? ',
      [req.org_id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        // console.log(results);
        res.render('OwnerControls/vendor_list', { data: results });
      },
    );
  });

  app.get('/update_vendor/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from vendor where org_id = ? and vendor_id =?',
      [req.org_id, req.params.id],
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
    res.render('Sales/sale_invoice', { orgId: req.org_id });
  });

  app.get('/sale_entry_report', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_entry_report', { orgId: req.org_id });
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

  app.get('/product_stock', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/product_stock', { orgId: req.org_id });
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
  });

  app.get('/add_product', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/add_product', { orgId: req.org_id });
  });

  app.get('/product_batch', (req, res) => {
    res.render('Inventory/product_batch');
  });

  app.get('/add_batch', (req, res) => {
    res.render('Inventory/add_batch');
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

  app.get('/po_template/:id', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/po_template', { id: req.params.id, orgId: req.org_id });
  });

  app.get('/po_report', (req, res) => {
    res.render('Inventory/po_report');
  });
};
