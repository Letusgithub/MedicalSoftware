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

    const created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const updated_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    getPool().query(

      `insert into cart_item(product_name, sales_invoice_id, quantity, unit_discount, created_date, cust_id, mrp)
        values(?,?,?,?,?,?,?)`,
      [
        data.product_name,
        data.sales_invoice_id,
        data.quantity,
        data.unit_discount === '' ? 0 : data.unit_discount,
        created_date,
        data.cust_id,
        data.mrp,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getOrdersById: (id, callback) => {
    getPool().query(
      'select * from cart_item where sales_invoice_id =?',
      [id],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

};
