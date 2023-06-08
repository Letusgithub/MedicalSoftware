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

    const order_created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const order_updated_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      `insert into order_details(customer_id, subtotal, total_dist, grand_total, mop, current_total, created_date) 
                                    values(?,?,?,?,?,?,?)`,
      [
        data.customer_id,
        data.subtotal,
        data.total_dist,
        data.grand_total,
        data.mop,
        data.current_total,
        order_created_date,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getAllOrders: (id, callback) => {
    getPool().query(
      'select * from order_details where customer_id = ?',
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getInvoiceOrder: (salesId, orgId, callback) => {
    getPool().query(
      `select * from order_details od 
        join customer_data cd 
        on od.customer_id = cd.customer_id
        where od.si_invoice_id=? and cd.org_id = ?`,
      [salesId,
        orgId],
      (error, results) => {
        if (error) return callback(error);

        return callback(null, results);
      },
    );
  },

  getRevenue: (callback) => {
    getPool().query(
      'select * from order_details',
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

};
