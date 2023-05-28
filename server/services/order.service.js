const {getPool} = require('../config/database.js');

const date_time = new Date();
module.exports = {

    //Create Inventory
    create: (data, callBack) => {
        getPool().query(
            `insert into order(
                org_id,
                exp_date,
                mfg_date,
                qty_unit,
                batch_qty,
                entry_date,
                shelf_label,
                created_date,
                updated_date,
                product_id,
                vendor_id)
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
            `update order set
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

    // Delete order by order_id
    delete: (data, callBack) => {
        getPool().query(
            `delete from purchase_order where po_id = ?`,
            [data.po_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All orders by vendor ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select * from purchase_order where vendor_id = ?`,
            [data.vendor_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get order by po_id
    getById: (data, callBack) => {
        getPool().query(
            `select * from purchase_order where po_id = ?`,
            [data.po_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}