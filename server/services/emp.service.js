/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {

  // Create Employee
  create: (data, callBack) => {
    const date_time = new Date();
    const date = (`0${date_time.getDate()}`).slice(-2);
    const month = (`0${date_time.getMonth() + 1}`).slice(-2);
    const year = date_time.getFullYear();

    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();

    const emp_created = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const emp_updated = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      `insert into employee(
                org_id,
                emp_name,
                emp_mobile,
                emp_alt_mobile,
                emp_email,
                emp_address,
                emp_created,
                emp_updated)
                value(?,?,?,?,?,?,?,?)`,
      [
        data.org_id,
        data.emp_name,
        data.emp_mobile,
        data.emp_alt_mobile,
        data.emp_email,
        data.emp_address,
        emp_created,
        emp_updated,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Update Employee
  update: (emp_id, data, callBack) => {
    const date_time = new Date();
    const date = (`0${date_time.getDate()}`).slice(-2);
    const month = (`0${date_time.getMonth() + 1}`).slice(-2);
    const year = date_time.getFullYear();

    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();

    const emp_updated = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      `update employee set
                emp_name = ?,
                emp_mobile = ?,
                emp_alt_mobile = ?,
                emp_email = ?,
                emp_address = ?,
                emp_updated = ?
                where emp_id = ?`,
      [
        data.emp_name,
        data.emp_mobile,
        data.emp_alt_mobile,
        data.emp_email,
        data.emp_address,
        emp_updated,
        emp_id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  // Delete Employee
  delete: (emp_id, callBack) => {
    getPool().query(
      'delete from employee where emp_id = ?',
      [emp_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Get All Employees by Org ID
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
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },

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
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
};
