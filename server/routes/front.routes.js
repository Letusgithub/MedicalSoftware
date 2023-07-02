/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');
const { checkAuth } = require('../middlewares/checkAuth');
const { fetchOrgId } = require('../middlewares/fetchOrgId');
const { getPharmaData } = require('../middlewares/getPharmaData');

module.exports = async (app) => {
  app.use((req, res, next) => {
    // if (!req.app.locals.cookieRetrieved && req.cookies.token != null) {
    //   const token = req.cookies.token;
    //   const { payload } = jwt.decode(token);

    //   getPool().query(
    //     'select * from organisation where org_telephone =?',
    //     [payload],
    //     (error, results) => {
    //       req.app.locals.token = results[0].org_name;
    //       req.app.locals.name = results[0].owner_name;
    //       req.app.locals.number = results[0].org_telephone;
    //       req.app.locals.GST = results[0].org_gstin;

    //       if (results[0].org_id_main === '') {
    //         const orgID = results[0].org_id.toString().padStart(7, '0');
    //         const id = `AA${results[0].org_pincode}${orgID}`;
    //         console.log('id in midd', id);
    //         getPool().query(
    //           'update organisation set org_id_main=? where org_id=?',
    //           [id, results[0].org_id],
    //           (idError, idResult) => {
    //             if (idError) {
    //               console.log('id ka error', idError);
    //             }
    //             console.log('id ka result', idResult);
    //             req.app.locals.pharmaId = id;
    //           },

    //         );
    //       } else {
    //         console.log('here');
    //         req.app.locals.pharmaId = results[0].org_id_main;
    //       }
    //       req.app.locals.cookieRetrieved = true;
    //     },
    //   );
    // }

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
  app.get('/', checkAuth, fetchOrgId, getPharmaData, (req, res) => {
    console.log('insdie the req statement', req.app.locals.token);
    console.log('insdie the req statement', req.app.locals.name);
    console.log('insdie the req statement', req.app.locals.number);
    console.log('insdie the req statement', req.app.locals.gst);
    console.log('insdie the req statement', req.app.locals.pharmaId);

    res.render('home', {
      name: req.app.locals.token,
      owner: req.app.locals.name,
      number: req.app.locals.number,
      gst: req.app.locals.gst,
      pharmacyId: req.app.locals.pharmaId,
      orgName: req.org_name,
      ownerName: req.owner_name,
      orgId: req.org_id,
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
        res.render('Profile/profile', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
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
        res.render('Profile/update_profile', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
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
        res.render('OwnerControls/employee_master', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
  });

  app.get('/add_employee', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/add_employee', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/update_employee/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from employee where org_id = ? and emp_id =?',
      [req.org_id, req.params.id],
      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('OwnerControls/update_employee', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
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
        res.render('OwnerControls/customer_list', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
  });

  app.get('/new_customer', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/new_customer', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/update_customer/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from customer_data where org_id = ? and customer_id =?',
      [req.org_id, req.params.id],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.render('OwnerControls/update_customer', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
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
        res.render('OwnerControls/vendor_list', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
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
        res.render('OwnerControls/update_vendor', {
          vendor: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
  });

  app.get('/new_vendor', checkAuth, fetchOrgId, (req, res) => {
    res.render('OwnerControls/new_vendor', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  // Sales components

  app.get('/sale_invoice', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_invoice', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/sale_entry_report', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_entry_report', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/sale_return_invoice', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_return_invoice', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/return_items', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/return_items', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/sale_return_report', checkAuth, fetchOrgId, (req, res) => {
    res.render('Sales/sale_return_report', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/invoice_template/:id', checkAuth, fetchOrgId, (req, res) => {
    console.log('got the id', req.params.id);
    console.log(req.org_id);
    res.render('Sales/invoice_template', {
      id: req.params.id, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
    });
  });

  // Inventory Managment component

  app.get('/product_stock', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/product_stock', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  // app.get('/update_product/:id', checkAuth, fetchOrgId, (req, res) => {
  //   console.log('herr', JSON.stringify(req.params.id));
  //   getPool().query(
  //     `select * from inventory where product_id= ? and org_id = ${req.org_id}`,
  //     [req.params.id],

  //     (error, results) => {
  //       if (error) {
  //         return res.send({ status: 'error', error });
  //       }
  //       res.render('Inventory/update_product', { data: results });
  //     },
  //   );
  // });

  app.get('/update_addproduct/:id', checkAuth, fetchOrgId, (req, res) => {
    console.log('herr', JSON.stringify(req.params.id));
    getPool().query(
      `select * from inventory inv
      JOIN sample spl 
      on spl.sample_id = inv.product_id
      where product_id= ? and org_id = ${req.org_id}`,
      [req.params.id],

      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Inventory/update_addproduct', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
  });

  app.get('/add_product', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/add_product', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/product_batch', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/product_batch', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  // app.get('/add_batch', checkAuth, fetchOrgId, (req, res) => {
  //   res.render('Inventory/add_batch', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  // });

  app.get('/add_batch/:id', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      `select * from inventory inv
      JOIN sample spl 
      on spl.sample_id = inv.product_id
      where product_id= ? and org_id = ${req.org_id}`,
      [req.params.id],

      (error, results) => {
        if (error) {
          return res.send({ status: 'error', error });
        }
        res.render('Inventory/add_batch_after', {
          data: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
    // res.render('Inventory/add_batch_after', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  app.get('/purchase_order', checkAuth, fetchOrgId, (req, res) => {
    getPool().query(
      'select * from vendor where org_id = ?',
      [req.org_id],
      (error, results) => {
        if (error) {
          console.log(error);
        }

        res.render('Inventory/purchase_order', {
          vendors: results, orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name,
        });
      },
    );
  });
  app.get('/po_template/:id', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/po_template', { id: req.params.id, orgId: req.org_id });
  });

  app.get('/po_report', checkAuth, fetchOrgId, (req, res) => {
    res.render('Inventory/po_report', { orgId: req.org_id, orgName: req.org_name, ownerName: req.owner_name });
  });

  // Receipt
  app.get('/saleInvoice', (req, res) => {
    res.render('Receipt/saleInvoice');
  });

  app.get('/returnInvoice', (req, res) => {
    res.render('Receipt/returnInvoice');
  });

  app.get('/po_receipt', (req, res) => {
    res.render('Receipt/PO');
  });
};
