const {getPool} = require('../config/database.js');

const date_time = new Date();
module.exports = {

    //Create vendor
    create: (data, callBack) => {
        getPool().query(
            `insert into vendor(
                org_id,
                vendor_name,
                vendor_address,
                vendor_contact,
                vendor_gstin,
                values(?,?,?,?)`,
            [
                data.org_id,
                data.vendor_name,
                data.vendor_address,
                data.vendor_contact,
                data.vendor_gstin,
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update vendor
    update: (error, results) => {
        getPool().query(
            `update vendor set
            org_id = ?,
            vendor_name= ?,
            vendor_address= ?,
            vendor_contact = ?,
            vendor_gstin = ?,
            where vendor_id = ?`
            [ 
                data.org_id,
                data.vendor_name,
                data.vendor_address,
                data.vendor_contact,
                data.vendor_gstin
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },

    // Delete vendor
    delete: (data, callBack) => {
        getPool().query(
            `delete from vendor where vendor_id = ?`,
            [data.vendor_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Vendors by Org ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select * from vendor where org_id = ?`,
            [data.org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get Vendor by vendor ID
    getById: (vendor_id, callBack) => {
        getPool().query(
            `select * from vendor where vendor_id = ?`,
            [data.vendor_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}