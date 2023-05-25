const pool = require('../../../config/database.js');

module.exports = {

    // Create Organisation
    create: (data, callBack) => {
        pool.query(
            `insert into organisation(
                org_name,
                org_gstin,
                org_telephone,
                org_alt_telephone,
                org_email,
                org_city,
                org_state,
                org_address,
                org_lat,
                org_long)
                values(?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.org_name,
                    data.org_gstin,
                    data.org_telephone,
                    data.org_alt_telephone,
                    data.org_email,
                    data.org_city,
                    data.org_state,
                    data.org_address,
                    data.org_lat,
                    data.org_long
                ],
                function (error, results) {
                   if(error){
                    return callBack (error)
                   };
                   return callBack (null, results);                   
                }

        );
    },

    // Update Organisation
    update: (data, callBack) => {
        pool.query(
            `update organisation set 
            org_name = ?,
            org_gstin = ?,
            org_telephone = ?,
            org_alt_telephone = ?,
            org_email = ?,
            org_city = ?,
            org_state = ?,
            org_address = ?,
            org_lat = ?,
            org_long = ?,
            org_access = ?
            where org_id = ?`,
            [
                data.org_name,
                data.org_gstin,
                data.org_telephone,
                data.org_alt_telephone,
                data.org_email,
                data.org_city,
                data.org_state,
                data.org_address,
                data.org_lat,
                data.org_long,
                data.org_access,
                data.org_id
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }
        );
    },

    // Delete Organisation
    delete: (data, callBack) => {
        pool.query(
            `delete from organisation where org_id = ?`,
            [data.org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Organisations
    // getAll: (callBack) => {
    //     pool.query(
    //         `select 
    //         org_id,
    //         org_name,
    //         org_gstin,
    //         org_telephone,
    //         org_alt_telephone,
    //         org_email,
    //         org_city,
    //         org_state,
    //         org_address,
    //         org_lat,
    //         org_long,
    //         org_access
    //         from organisation`,
    //         [],
    //         function (error, results) {
    //             if(error){
    //              return callBack (error)
    //             }; 
    //             return callBack (null, results);                   
    //         }

    //     );
    // },

    // Get Organisation by Id
    getById: (org_id, callBack) => {
        pool.query(
            `select 
            org_id,
            org_name,
            org_gstin,
            org_telephone,
            org_alt_telephone,
            org_email,
            org_city,
            org_state,
            org_address,
            org_lat,
            org_long,
            org_access
            from organisation where org_id = ?`,
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
