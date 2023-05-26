const {getPool} = require('../config/database.js');
const express = require("express")
const router = express.Router();
// Page routing //

// Login Page
router.get('/login', (req, res) => {
    res.render('Auth/login')
});


//Register Login
router.get('/register', (req, res) => {
    res.render('Auth/register')
});


// Home Page
router.get('/', (req, res) => {
    res.render('home')
});


// Admin Components
router.get('/pharmacy_master', (req, res) => {
    res.render('Admin/pharmacy_master')
});

router.get('/register_pharmacy', (req, res) => {
    res.render('Admin/register_pharmacy')
});

router.get('/salesman_master', (req, res) => {
    res.render('Admin/salesman_master')
});

router.get('/access_managment', (req, res) => {
    res.render('Admin/access_managment')
});

router.get('/user_role_managment', (req, res) => {
    res.render('Admin/user_role_managment')
});

router.get('/pharmacy_sale_report', (req, res) => {
    res.render('Admin/pharmacy_sale_report')
});


// Owner Control components
router.get('/employee_master', (req, res) => {
    getPool().query(`select * from employee limit 100`,
        function (error, results) {
            if(error){
             return res.send({status:'error',error})
            }; 
            res.render('OwnerControls/employee_master', {data: results});
        }
    )
});

router.get('/add_employee', (req, res) => {
    res.render('OwnerControls/add_employee')
});

router.get('/customer_list', (req, res) => {
    res.render('OwnerControls/customer_list')
});

router.get('/new_customer', (req, res) => {
    res.render('OwnerControls/new_customer')
});

router.get('/vendor_list', (req, res) => {
    res.render('OwnerControls/vendor_list')
});

router.get('/new_vendor', (req, res) => {
    res.render('OwnerControls/new_vendor')
});


// Sales components
router.get('/sale_invoice', (req, res) => {
    res.render('Sales/sale_invoice')
});

router.get('/sale_entry_report', (req, res) => {
    res.render('Sales/sale_entry_report')
});

router.get('/sale_return_invoice', (req, res) => {
    res.render('Sales/sale_return_invoice')
});

router.get('/return_items', (req, res) => {
    res.render('Sales/return_items')
});

router.get('/sale_return_report', (req, res) => {
    res.render('Sales/sale_return_report')
});

router.get('/invoice_template', (req, res) => {
    res.render('Sales/invoice_template')
});


// Inventory Managment component
router.get('/product_stock', (req, res) => {
    res.render('Inventory/product_stock')
});

router.get('/add_product', (req, res) => {
    res.render('Inventory/add_product')
});

router.get('/purchase_order', (req, res) => {
    res.render('Inventory/purchase_order')
});

router.get('/po_report', (req, res) => {
    res.render('Inventory/po_report')
});


module.exports = router;