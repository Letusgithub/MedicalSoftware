const { getPool } = require('../config/database');

module.exports = {
  createReturnOrder: (data, returnId, callback) => {
    getPool().query(
      `insert into return_details(return_invoice_id, sales_invoice_id, return_subtotal, new_return_discount, return_amount, reason) 
                                      values(?,?,?,?,?,?)`,
      [
        returnId,
        data.sales_invoice_id,
        data.return_subtotal,
        data.new_return_discount,
        data.return_amount,
        data.reason,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getTotalReturns: (callback) => {
    getPool().query(
      'SELECT COUNT(*) as total_rows FROM return_details',
      [],
      (error, results) => {
        if (error) return callback(error);
        const totalCount = JSON.parse(results[0].total_rows);
        return callback(null, totalCount);
      },
    );
  },

  searchDates: (orgId, from, to, callback) => {
    let querys;
    let datas = [];
    if (from && to) {
      const date = new Date(to);
      querys = 'WHERE return_created_date >= ? AND return_created_date < ?';
      datas = [
        from,
        new Date(date.getTime() + 86400000),
      ];
    } else if (from) {
      querys = 'WHERE return_created_date >= ?';
      datas = [from];
    } else if (to) {
      const date = new Date(to);
      querys = 'WHERE return_created_date < ?';
      datas = [new Date(date.getTime() + 86400000)];
    }
    getPool().query(
      `SELECT * FROM return_details rd
      JOIN order_details od 
      ON od.invoice_id_main = rd.sales_invoice_id
      JOIN customer_data cd
      on cd.customer_id = od.customer_id
      ${querys} and cd.org_id = ${orgId} 
      ORDER BY return_created_date DESC`,
      datas,
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  searchMonth: (orgId, month, callback) => {
    getPool().query(
      `SELECT * FROM return_details rd
      JOIN order_details od 
      ON od.invoice_id_main = rd.sales_invoice_id
      JOIN customer_data cd
      on cd.customer_id = od.customer_id
      where MONTH(rd.return_created_date) =? and cd.org_id = ${orgId} 
      `,
      [
        month,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  searchQuarter: (orgId, start, end, callback) => {
    getPool().query(
      `SELECT * FROM return_details rd
      JOIN order_details od 
      ON od.invoice_id_main = rd.sales_invoice_id
      JOIN customer_data cd
      on cd.customer_id = od.customer_id
      where MONTH(rd.return_created_date)>=? and MONTH(rd.return_created_date)<=? and cd.org_id = ${orgId} 
      `,
      [
        start,
        end,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },
  searchYear: (orgId, year, callback) => {
    getPool().query(
      `SELECT * FROM return_details rd
      JOIN order_details od 
      ON od.invoice_id_main = rd.sales_invoice_id
      JOIN customer_data cd
      on cd.customer_id = od.customer_id
      where YEAR(rd.return_created_date)=? and cd.org_id = ${orgId} 
      order by MONTH(rd.return_created_date) DESC
      `,
      [
        year,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  getOrderinInvoice: (id, callback) => {
    getPool().query(
      `select * from  return_details rd
        join cart_item ci
        on ci.return_invoice_id = rd.return_invoice_id 
        join order_details od 
        on od.invoice_id_main = rd.sales_invoice_id
        Join customer_data cd
        on cd.customer_id = od.customer_id
        
        JOIN sample spl 
        on ci.product_id = spl.sample_id
        JOIN inventory inv
        on inv.product_id = ci.product_id
        JOIN batch bth
        on ci.saled_batch_id = bth.batch_id
        
        where rd.return_id=?`,
      [
        id,
      ],
      (error, results) => {
        if (error) return callback(error);

        return callback(null, results);
      },
    );
  },

};
