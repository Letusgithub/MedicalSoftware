const pool = require('../../../config/database.js');

module.exports = {

    // Create owner
    create: (data, callBack) => {
        pool.query(
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
        pool.query(
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
        pool.query(
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

    // Get Organisation by Id
    getById: (org_id, callBack) => {
        pool.query(
            `select 
             org_id,
             owner_name,
             owner_email
             from owner where org_id`,
            [org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        )
    },



}