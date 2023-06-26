const { getPool } = require('../config/database');

module.exports = {
  create: (data, callback) => {
    getPool().query(
      `insert into batch(batch_name, product_id, vendor_id, org_id, exp_date, batch_qty, purchase_rate, mrp, shelf_label, conversion) 
                                      values(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.batch_name,
        data.product_id,
        data.vendor_id,
        data.org_id,
        data.exp_date,
        data.batch_qty,
        data.purchase_rate,
        data.mrp,
        data.shelf_label,
        data.conversion,
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
  getBatchfromBatchId: (id, callback) => {
    getPool().query(
      'select * from batch where batch_id =?',
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

  getRemQtyafterSales: (orgId, prodId, callBack) => {
    getPool().query(
      `
      SELECT bth.batch_id, bth.batch_qty, bth.conversion, bth.batch_name, bth.shelf_label,  bth.exp_date, bth.mrp,
      coalesce(sum(cart.saled_pri_qty),0) as pri, 
        coalesce(sum(cart.saled_sec_qty),0) as sec,
        inv.primary_unit as punit,
        inv.secondary_unit as sunit
        from newdata.cart_item cart

        RIGHT JOIN newdata.batch bth
        ON bth.batch_id = cart.saled_batch_id
        LEFT JOIN
            newdata.inventory inv ON inv.product_id = bth.product_id AND inv.org_id = bth.org_id
        where bth.org_id = ${orgId} and bth.product_id = ${prodId}
        group by bth.batch_id, punit,sunit ;
      `,
      [],
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

  getPrevSaledQty: (data, callBack) => {
    getPool().query(
      'select saled_pri_qty, saled_sec_qty, conversion from batch where batch_id =? and org_id =?',
      [
        data.batch_id,
        data.org_id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  updateBatchQtyAfterSales: (priQty, secQty, batchId, callBack) => {
    getPool().query(
      `update batch set
            saled_pri_qty =?,
            saled_sec_qty=? 
            where batch_id = ?`,
      [
        priQty,
        secQty,
        batchId,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },
  updateBatchQtyAfterReturn: (priQty, secQty, batchId, callBack) => {
    getPool().query(
      `update batch set
            saled_pri_qty =?,
            saled_sec_qty=? 
            where batch_id = ?`,
      [
        priQty,
        secQty,
        batchId,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  getTotalPurchaseQty: (orgId, callback) => {
    getPool().query(
      `select COUNT(*) as row_count, coalesce(sum(bth.batch_qty * bth.purchase_rate),0) as total from batch as bth 
      where org_id =${orgId}`,
      [],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },
};
