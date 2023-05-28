const {getPool} = require('../config/database.js');

const date_time = new Date();
module.exports = {

    //Create product
    create: (data, callBack) => {
        getPool().query(
            `insert into product(
                batch_id,
                product_name,
                mfg,
                salt,
                hsn,
                primary_unit,
                secondary_unit,
                qty_unit,
                quantity,
                current_stock,
                mrp,
                shelf_label,
                entry_date,
                exp_date,
                mfg_date,
                emp_created,
                emp_updated,
                barcode,
                threshold)
                values(?,?,?,?,?,?)`,
            [
                data.org_id,
                data.exp_date,
                data.mfg_date,
                data.qty_unit,
                data.batch_qty,
                data.entry_date,
                data.shelf_label,
                `${date_time}`,
                `${date_time}`,
                data.product_id,
                data.vendor_id
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update Inventory
    update: (error, results) => {
        getPool().query(
            `update product set
            org_id = ?,
            exp_date = ?,
            mfg_date = ?,
            qty_unit= ?,
            batch_qty = ?,
            entry_date = ?,
            shelf_label = ?,
            updated_date = ?,
            product_id = ?,
            vendor_id = ?
            where product_id = ?`
            [ 
                data.org_id,
                data.exp_date,
                data.mfg_date,
                data.qty_unit,
                data.batch_qty,
                data.entry_date,
                data.shelf_label,
                `${date_time}`,
                data.product_id,
                data.vendor_id
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },

    // Delete product
    delete: (data, callBack) => {
        getPool().query(
            `delete from product where product_id = ?`,
            [data.product_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Products by batch ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select * from product where batch_id = ?`,
            [data.batch_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get product by product ID
    getById: (product_id, callBack) => {
        getPool().query(
            `select * from product where product_id = ?`,
            [data.product_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}