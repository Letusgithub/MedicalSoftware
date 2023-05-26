const {getPool} = require('../config/database.js');

module.exports = {

    // Create owner
    create: (data, callBack) => {
        getPool().query(
            `insert into owner(
                org_id,
                owner_name,
                owner_email)
                value(?,?,?)`,
            [data.org_id,
             data.owner_name,
             data.owner_email],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update Owner
    update: ( data, callBack) => {
        getPool().query(
            `update owner set
                owner_name = ?,
                owner_email = ?
                where org_id = ?`,
            [
                data.owner_name,
                data.owner_email,
                data.org_id 
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },

    // Delete Owner
    delete: (data, callBack) => {
        getPool().query(
            `delete from owner where org_id = ?`,
            [data.org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

}