const {getPool} = require('../config/database.js');

module.exports = {

    //Create Reference
    create: (data, callBack) => {
        getPool().query(
            `insert into reference(
                org_id,
                refer_name)
            value(?,?)`,
            [
                data.org_id,
                data.refer_name 
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    }
}