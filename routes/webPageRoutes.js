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



// Sales components
router.get('/invoice_sale', (req, res) => {
    res.render('Sales/invoice_sale')
});

router.get('/sale_entry_report', (req, res) => {
    res.render('Sales/sale_entry_report')
});

router.get('/invoice_sale_return', (req, res) => {
    res.render('Sales/invoice_sale_return')
});

router.get('/sale_return_report', (req, res) => {
    res.render('Sales/sale_return_report')
});

router.get('/invoice_template', (req, res) => {
    res.render('Sales/invoice_template')
});

router.get('/customer_list', (req, res) => {
    res.render('Sales/customer_list')
});

router.get('/new_customer', (req, res) => {
    res.render('Sales/new_customer')
});


// Inventory Managment component
router.get('/product_stock', (req, res) => {
    res.render('Inventory/product_stock')
});

router.get('/add_product', (req, res) => {
    res.render('Inventory/add_product')
});

router.get('/vendor_list', (req, res) => {
    res.render('Inventory/vendor_list')
});

router.get('/purchase_order', (req, res) => {
    res.render('Inventory/purchase_order')
});

router.get('/new_vendor', (req, res) => {
    res.render('Inventory/new_vendor')
});

router.get('/po_report', (req, res) => {
    res.render('Inventory/po_report')
});


module.exports = router;