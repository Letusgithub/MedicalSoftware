const {getPool} = require('../config/database.js');

const date_time = new Date();
module.exports = {

    //Create product
    create: (data, callBack) => {
        getPool().query(
            `insert into product(
                product_name,
                mfg,
                mkt,
                salt,
                hsn,
                category,
                primary_unit,
                secondary_unit,
                conversion,
                mrp,
                addedBy,
                verified)
                values(?,?,?,?,?,?)`,
            [
                data.product_name,
                data.mfg,
                data.mkt,
                data.salt,
                data.hsn,
                data.category,
                data.primary_unit,
                data.secondary_unit,
                data.conversion,
                data.mrp,
                data.addedBy,
                data.verified,
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update product
    update: (error, results) => {
        getPool().query(
            `update product set
            product_name = ?,
            mfg = ?,
            mkt = ?,
            salt = ?,
            hsn = ?,
            category = ?,
            primary_unit = ?,
            secondary_unit = ?,
            conversion = ?,
            mrp = ?,
            addedBy = ?,
            verified = ?
            where product_id = ?`
            [ 
                data.product_name,
                data.mfg,
                data.mkt,
                data.salt,
                data.hsn,
                data.category,
                data.primary_unit,
                data.secondary_unit,
                data.conversion,
                data.mrp,
                data.addedBy,
                data.verified,
                data.product_id
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

    //Get All Products
    getAllById: (data, callBack) => {
        getPool().query(
            `select * from product`,
            [data],
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