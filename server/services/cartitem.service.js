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

      `insert into cart_item(product_id, product_name, main_invoice_id, sales_invoice_id, quantity, unit_discount, created_date, mrp)
        values(?,?,?,?,?,?,?,?)`,
      [
        data.product_id,
        data.product_name,
        data.main_invoice_id,
        data.sales_invoice_id,
        data.quantity,
        data.unit_discount === '' ? 0 : data.unit_discount,
        created_date,
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
  getOrders: (id, callback) => {
    getPool().query(
      'select * from cart_item where main_invoice_id =?',
      [id],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },
  updateOrders: (data, salesInvoiceId, productId, callback) => {
    getPool().query(
      'update cart_item set return_invoice_id=?, return_qty=?, return_dis=?, return_mrp=? where main_invoice_id =? and product_id=?',
      [
        data.return_invoice_id,
        data.return_qty,
        data.return_dis,
        data.return_mrp,
        salesInvoiceId,
        productId,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

};
