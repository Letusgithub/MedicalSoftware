/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {
  create: (data, callback) => {
    getPool().query(

      `insert into cart_item(product_id, saled_pri_qty, saled_sec_qty, main_invoice_id, sales_invoice_id, saled_batch_id, unit_discount)
        values(?,?,?,?,?,?,?)`,
      [
        data.product_id,
        data.saled_pri_qty,
        data.saled_sec_qty === '' ? 0 : data.saled_sec_qty,
        data.main_invoice_id,
        data.sales_invoice_id,
        data.saled_batch_id,
        data.unit_discount === '' ? 0 : data.unit_discount,
      ],
      (error, results) => {
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
      `select * from cart_item cart
      JOIN sample spl
      on cart.product_id = spl.sample_id
      where main_invoice_id =?`,
      [id],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },
  updateOrders: (data, salesInvoiceId, batchId, productId, callback) => {
    getPool().query(
      'update cart_item set return_invoice_id=?, return_pri_qty=?, return_sec_qty=?, return_dis=?, return_mrp=? where main_invoice_id =? and product_id=? and saled_batch_id=?',
      [
        data.return_invoice_id,
        data.return_pri_qty,
        data.return_sec_qty,
        data.return_dis,
        data.return_mrp,
        salesInvoiceId,
        productId,
        batchId,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

};
