module.exports = {
  createBatch: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `INSERT INTO batch(batch_name, product_id, vendor_id, org_id, inventory_id, exp_date, batch_qty, purchase_rate, mrp, free, bulk_discount, base_price, shelf_label, conversion, grn_id) 
                                      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          data.batch_name,
          data.product_id,
          data.vendor_id,
          data.org_id,
          data.inventory_id,
          data.exp_date,
          data.batch_qty,
          data.purchase_rate,
          data.mrp,
          data.free,
          data.bulk_discount,
          data.base_price,
          data.shelf_label,
          data.conversion,
          data.grn_id,
        ],
      );
      return results.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateBatchAfterSale: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty - ?,
            saled_sec_qty = saled_sec_qty - ?
            WHERE batch_id = ?`,
        [
          data.saledPriQty,
          data.saledSecQty,
          data.batchId,
        ],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateBatchAfterReturn: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty + ?,
            saled_sec_qty = saled_sec_qty + ?
            WHERE batch_id = ?`,
        [data.returnPriQty,
          data.returnSecQty,
          data.batch_id],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  retrieveBatchOnSaleCancel: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET 
        saled_pri_qty = saled_pri_qty - ?, 
        saled_sec_qty = saled_sec_qty - ? 
        WHERE batch_id = ?`,
        [
          data.saledPriQty,
          data.saledSecQty,
          data.batchId,
        ],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  returnBatchOnReturnCancel: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET
            saled_pri_qty = saled_pri_qty + ?,
            saled_sec_qty = saled_sec_qty + ?
            WHERE batch_id = ?`,
        [
          data.returnPriQty,
          data.returnSecQty,
          data.batchId,
        ],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  retrieveBatchOnPurchaseCancel: async (connection, data) => {
    try {
      const [results] = await connection.query(
        'DELETE FROM batch WHERE grn_id = ?',
        [data.grnId],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  retrieveBatchOnCreditCancel: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET
       saled_pri_qty = saled_pri_qty - ?,
       saled_sec_qty = saled_sec_qty - ?
       WHERE batch_id = ?`,
        [
          data.creditPriQty,
          data.creditSecQty,
          data.batchId,
        ],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  retrieveBatchOnDebitCancel: async (connection, data) => {
    try {
      const [results] = await connection.query(
        `UPDATE batch SET
       saled_pri_qty = saled_pri_qty - ?,
       saled_sec_qty = saled_sec_qty - ?
       WHERE batch_id = ?`,
        [
          data.debitPriQty,
          data.debitSecQty,
          data.batchId,
        ],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteBatch: async (connection, batchId) => {
    try {
      const [results] = await connection.query(
        'delete from batch where batch_id =?',
        [batchId],
      );
      return results.affectedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getBatchByBatchId: async (connection, batchId) => {
    try {
      const [results] = await connection.query(
        'select * from batch where batch_id = ?',
        [batchId],
      );
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getSaledQty: async (connection, batchId) => {
    try {
      const [results] = await connection.query(
        'select saled_pri_qty, saled_sec_qty, conversion from batch where batch_id = ?',
        [batchId],
      );
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTotalPurchaseAmt: async (connection, orgId) => {
    try {
      const [results] = await connection.query(
        `select coalesce(sum(bth.batch_qty * bth.purchase_rate),0) as total from batch as bth 
        where org_id = ? and grn_id is not null`,
        [orgId],
      );
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getBatchesByProductId: async (connection, orgId, productId) => {
    try {
      const [results] = await connection.query(
        'select * from batch where org_id = ? and product_id = ?',
        [orgId, productId],
      );
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTotalSumfromPurchase: async (connection, orgId) => {
    try {
      const [results] = await connection.query(
        `SELECT
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
                bth.org_id = ?
            GROUP BY
                months.month;`,
        [orgId],
      );
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
