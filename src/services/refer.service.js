const {getPool} = require('../config/database.js');

module.exports = {

    //Create Reference
    create: (data, callBack) => {
        getPool().query(
            `insert into reference(
                org_id,
                refer_name,
                refer_mobile,
                refer_address)
            value(?,?,?,?)`,
            [
                data.org_id,
                data.refer_name,
                data.refer_mobile,
                data.refer_address 
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update Reference
    update: (error, results) => {
        getPool().query(
            `update reference set
                refer_name = ?,
                refer_mobile = ?,
                refer_address = ?
                where refer_id = ?`,
            [ 
                data.refer_name,
                data.refer_mobile,
                data.refer_address,
                data.refer_id,
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },

    // Delete Reference
    delete: (data, callBack) => {
        getPool().query(
            `delete from reference where refer_id = ?`,
            [data.refer_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Reference by Org ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select 
            refer_id,
            refer_name,
            refer_mobile,
            refer_address
            from reference where org_id = ?`,
            [data.org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get Reference by refer ID
    getById: (refer_id, callBack) => {
        getPool().query(
            `select 
                org_id,
                refer_name,
                refer_mobile,
                refer_address
            from employee where refer_id = ?`,
            [refer_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}