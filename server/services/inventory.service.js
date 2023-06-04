const {getPool} = require('../config/database.js');

const date_time = new Date();
module.exports = {

    //Create Inventory
    create: (data, callBack) => {
        getPool().query(
            `insert into inventory(
                org_id,
                product_id,
                vendor_id,
                exp_date,
                mfg_date,
                qty_unit,
                batch_qty,
                entry_date,
                shelf_label)
                values(?,?,?,?,?,?,?,?,?)`,
            [
                data.org_id,
                data.vendor_id,
                data.product_id,
                data.exp_date,
                data.mfg_date,
                data.qty_unit,
                data.batch_qty,
                data.entry_date,
                data.shelf_label,
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
            `update inventory set
            org_id = ?,
            product_id = ?,
            vendor_id = ?,
            exp_date = ?,
            mfg_date = ?,
            qty_unit= ?,
            batch_qty = ?,
            entry_date = ?,
            shelf_label = ? 
            where batch_id = ?`
            [ 
                data.org_id,
                data.product_id,
                data.vendor_id,
                data.exp_date,
                data.mfg_date,
                data.qty_unit,
                data.batch_qty,
                data.entry_date,
                data.shelf_label,
                data.batch_id
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },

    // Delete Inventory
    delete: (data, callBack) => {
        getPool().query(
            `delete from inventory where batch_id = ?`,
            [data.batch_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Inventories by vendor ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select * from inventory where vendor_id = ?`,
            [data.vendor_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get Inventory by batch ID
    getById: (batch_id, callBack) => {
        getPool().query(
            `select * from inventory where batch_id = ?`,
            [data.batch_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}