/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {
  create: (data, invoiceId, callback) => {
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
      `insert into order_details(customer_id, invoice_id_main, subtotal, total_dist, grand_total, mop, current_total, sales_created_date) 
                                    values(?,?,?,?,?,?,?,?)`,
      [
        data.customer_id,
        invoiceId,
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
  searchTotalSales: (month, year, callback) => {
    getPool().query(
      `SELECT COUNT(*) as total_rows FROM order_details WHERE SUBSTRING(invoice_id_main, 20, 4) = ${month}${year}`,
      [],
      (error, results) => {
        if (error) return callback(error);

        const totalCount = JSON.parse(results[0].total_rows);
        console.log(results);
        return callback(null, totalCount);
      },
    );
  },

  createNewMonth: (month, year, count, callback) => {
    getPool().query(

      `insert into sales_month_count(month, year, count)
      values(?,?,?)`,
      [
        month,
        year,
        count,
      ],
      (error, results) => {
        if (error) {
          console.log('error in createNewMonth', error);
        }
        return callback(null, results);
      },
    );
  },

  updateMonthCount: (month, year, count) => {
    getPool().query(

      'update sales_month_count set count=? where month=? and year =?',
      [
        count,
        month,
        year,
      ],
      (error, results) => {
        if (error) console.log('error in update month', error);
        console.log('results of update', results);
      },
    );
  },

  getMonthCount: (month, year, callback) => {
    getPool().query(
      'select * from sales_month_count where month=? and year =?',
      [
        month,
        year,
      ],
      (error, results) => {
        if (error) {
          console.log('error in getting count', error);
          return callback(error);
        }
        console.log('results of count', results);
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
  mainId: (id, callback) => {
    getPool().query(
      'select invoice_id_main from order_details where si_invoice_id = ?',
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  allSamples: (callback) => {
    getPool().query(
      'select * from sample',
      [],
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
  invoiceSales: (salesId, orgId, callback) => {
    getPool().query(
      `select * from order_details od 
        join customer_data cd 
        on od.customer_id = cd.customer_id
        where od.invoice_id_main=? and cd.org_id = ?`,
      [salesId,
        orgId],
      (error, results) => {
        if (error) return callback(error);

        return callback(null, results);
      },
    );
  },

  getRevenue: (orgId, callback) => {
    getPool().query(
      `select * from order_details od
      JOIN customer_data cd 
      on cd.customer_id = od.customer_id 
      where cd.org_id = ${orgId}`,
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  searchDates: (orgId, from, to, callback) => {
    let querys;
    let datas = [];
    if (from && to) {
      const date = new Date(to);
      querys = 'WHERE sales_created_date >= ? AND sales_created_date < ?';
      datas = [
        from,
        new Date(date.getTime() + 86400000),
      ];
    } else if (from) {
      querys = 'WHERE sales_created_date >= ?';
      datas = [from];
    } else if (to) {
      const date = new Date(to);
      querys = 'WHERE sales_created_date < ?';
      datas = [new Date(date.getTime() + 86400000)];
    }

    getPool().query(
      `SELECT * FROM order_details od
      JOIN customer_data cd 
      ON od.customer_id = cd.customer_id
      ${querys} and org_id = ${orgId} 
      ORDER BY sales_created_date DESC`,
      datas,
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  autoComplete: (querys, callback) => {
    const queries = querys.toLowerCase();
    getPool().query(
      'select * from sample where lower(med_name) like ? limit 10',
      [`%${queries}%`],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },

    );
  },

};
