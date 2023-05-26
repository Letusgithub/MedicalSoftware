const {getPool} = require('../config/database.js');

module.exports = {

    //Create Employee
    create: (data, callBack) => {
        getPool().query(
            `insert into employee(
                org_id,
                emp_name,
                emp_mobile,
                emp_alt_mobile,
                emp_email,
                emp_address)
                value(?,?,?,?,?,?)`,
            [
                data.org_id,
                data.emp_name,
                data.emp_mobile,
                data.emp_alt_mobile,
                data.emp_email,
                data.emp_address
            ],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    // Update Employee
    update: (error, results) => {
        getPool().query(
            `update employee set
                emp_name = ?,
                emp_mobile = ?,
                emp_alt_mobile = ?,
                emp_email = ?,
                emp_address = ?,
                emp_access = ?
                where org_id = ?`,
            [ 
                data.emp_name,
                data.emp_mobile,
                data.emp_alt_mobile,
                data.emp_email,
                data.emp_address,
                data.emp_access,
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

    // Delete Employee
    delete: (data, callBack) => {
        getPool().query(
            `delete from employee where emp_id = ?`,
            [data.emp_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }
        )
    },

    //Get All Employees by Org ID
    getAllById: (data, callBack) => {
        getPool().query(
            `select 
                emp_id,
                emp_name,
                emp_mobile,
                emp_alt_mobile,
                emp_email,
                emp_address,
                emp_access
            from employee where org_id = ?`,
            [data.org_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results);                   
            }

        );
    },

    // Get Employee by Emp ID
    getById: (emp_id, callBack) => {
        getPool().query(
            `select 
                org_id,
                emp_name,
                emp_mobile,
                emp_alt_mobile,
                emp_email,
                emp_address,
                emp_access
            from employee where emp_id = ?`,
            [emp_id],
            function (error, results) {
                if(error){
                 return callBack (error)
                }; 
                return callBack (null, results[0]);                   
            }

        )
    },
}