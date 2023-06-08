/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {
  create: (data, callback) => {
    const date_time = new Date();
    const date = (`0${date_time.getDate()}`).slice(-2);
    const month = (`0${date_time.getMonth() + 1}`).slice(-2);
    const year = date_time.getFullYear();

    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();

    const cust_created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const cust_updated_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      `insert into customer_data(cust_name, org_id, cust_telephone, cust_address, cust_email, created_date)
                    values(?,?,?,?,?,?)`,
      [
        data.cust_name,
        data.org_id,
        data.cust_telephone,
        data.cust_address,
        data.cust_email,
        cust_created_date,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getUserByNumber: (number, orgId, callback) => {
    getPool().query(
      'select * from customer_data where cust_telephone =? and org_id=?',
      [number,
        orgId,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  getUsers: (callback) => {
    getPool().query(
      'select * from customer_data',
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getUsersOfOrg: (orgId, callback) => {
    getPool().query(
      'select * from customer_data where org_id=?',
      [orgId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getUsersById: (customer_id, callback) => {
    getPool().query(
      'select * from customer_data where customer_id =?',
      [customer_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      },
    );
  },

  updateUser: (id, data, callback) => {
    const date_time = new Date();
    const date = (`0${date_time.getDate()}`).slice(-2);
    const month = (`0${date_time.getMonth() + 1}`).slice(-2);
    const year = date_time.getFullYear();

    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();

    const cust_created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const cust_updated_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      'update customer_data set cust_name=?, cust_telephone=?, cust_address=?, cust_email=?, updated_date=? where customer_id =?',
      [
        data.cust_name,
        data.cust_telephone,
        data.cust_address,
        data.cust_email,
        cust_updated_date,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  deleteUser: (id, data, callback) => {
    getPool().query(
      'delete from customer_data where customer_id =?',
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getIdByNumber: (query, callback) => {
    getPool().query(
      'select * from custtomer_data where cust_telephone = ?',
      [query],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

};
