const { getPool } = require('../config/database');

module.exports = {
  create: (data, callback) => {
    getPool().query(
      `insert into batch(product_id, vendor_id, org_id, exp_date, qty_unit, batch_qty, purchase_rate, mrp, shelf_label) 
                                      values(?,?,?,?,?,?,?,?,?)`,
      [
        data.product_id,
        data.vendor_id,
        data.org_id,
        data.exp_date,
        data.qty_unit,
        data.batch_qty,
        data.purchase_rate,
        data.mrp,
        data.shelf_label,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },
  getBatch: (id, orgId, callback) => {
    getPool().query(
      `select * from batch 
      JOIN inventory inv
      ON batch.product_id =  inv.product_id
      where batch.product_id =? and batch.org_id =${orgId}`,
      [id],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  getAllBatchesById: (orgId, id, callback) => {
    getPool().query(
      `select * from batch 
      where org_id =? and product_id =?`,
      [
        orgId,
        id,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  updateBatchWhenSale: (data, callBack) => {
    getPool().query(
      `update batch set
            sales_qty =? 
            where batch_id = ?`,
      [
        data.sales_qty,
        data.batch_id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  getTotalSumfromPurchase: (orgId, callBack) => {
    getPool().query(
      `
      SELECT
       CASE months.month
          WHEN 1 THEN 'Jan'
          WHEN 2 THEN 'Feb'
          WHEN 3 THEN 'Mar'
          WHEN 4 THEN 'Apr'
          WHEN 5 THEN 'May'
          WHEN 6 THEN 'Jun'
          WHEN 7 THEN 'Jul'
          WHEN 8 THEN 'Aug'
          WHEN 9 THEN 'Sept'
          WHEN 10 THEN 'Oct'
          WHEN 11 THEN 'Nov'
          WHEN 12 THEN 'Dec'
          END AS x,
          COALESCE(SUM(bth.batch_qty * bth.purchase_rate), 0) AS total
          FROM
              (SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
              UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
              UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS months
          LEFT JOIN
              batch bth ON MONTH(bth.created_date) = months.month 
          AND
              bth.org_id = ${orgId}
          GROUP BY
              months.month;
      `,
      [],
      (error, results) => {
        if (error) callBack(error);
        return callBack(null, results);
      },
    );
  },
};
