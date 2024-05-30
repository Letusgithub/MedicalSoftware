module.exports = {
  createBatch: async (connection, data, productId, inventoryId, orgId) => {
    const [results] = await connection.query(
      `INSERT INTO batch(batch_name, product_id, vendor_id, org_id, inventory_id, exp_date, batch_qty, purchase_rate, mrp, free, bulk_discount, base_price, shelf_label, conversion, grn_id) 
                                      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.batch_name,
        productId,
        data.vendor_id,
        orgId,
        inventoryId,
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
  },

  updateBatchAfterSale: async (connection, data) => {
    const [results] = await connection.query(
      `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty + ?,
            saled_sec_qty = saled_sec_qty + ?
            WHERE batch_id = ?`,
      [
        data.saledPriQty,
        data.saledSecQty,
        data.batchId,
      ],
    );
    return results.affectedRows;
  },

  updateBatchAfterReturn: async (connection, data) => {
    const [results] = await connection.query(
      `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty - ?,
            saled_sec_qty = saled_sec_qty - ?
            WHERE batch_id = ?`,
      [
        data.returnPriQty,
        data.returnSecQty,
        data.batchId,
      ],
    );
    return results.affectedRows;
  },

  updateBatchAfterDebitEntry: async (connection, data) => {
    const [results] = await connection.query(
      `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty + ?,
            saled_sec_qty = saled_sec_qty + ?
            WHERE batch_id = ?`,
      [
        data.debitPriQty,
        data.debitSecQty,
        data.batchId,
      ],
    );
    return results.affectedRows;
  },

  updateBatchAfterCreditEntry: async (connection, data) => {
    const [results] = await connection.query(
      `UPDATE batch SET 
            saled_pri_qty = saled_pri_qty + ?,
            saled_sec_qty = saled_sec_qty + ?
            WHERE batch_id = ?`,
      [
        data.creditPriQty,
        data.creditSecQty,
        data.batchId,
      ],
    );
    return results.affectedRows;
  },

  retrieveBatchOnSaleCancel: async (connection, data) => {
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
  },

  returnBatchOnReturnCancel: async (connection, data) => {
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
  },

  retrieveBatchOnPurchaseCancel: async (connection, data) => {
    const [results] = await connection.query(
      'DELETE FROM batch WHERE grn_id = ?',
      [data.grnId],
    );
    return results.affectedRows;
  },

  retrieveBatchOnCreditCancel: async (connection, data) => {
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
  },

  retrieveBatchOnDebitCancel: async (connection, data) => {
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
  },

  deleteBatch: async (connection, batchId) => {
    const [results] = await connection.query(
      'delete from batch where batch_id =?',
      [batchId],
    );
    return results.affectedRows;
  },

  getBatchByBatchId: async (connection, batchId) => {
    const [results] = await connection.query(
      'select * from batch where batch_id = ?',
      [batchId],
    );
    return results;
  },

  getBatchesByInventoryId: async (connection, inventoryId) => {
    const [results] = await connection.query(
      `SELECT * FROM batch 
      JOIN inventory inv ON batch.inventory_id =  inv.inventory_id
      WHERE batch.inventory_id = ? ORDER BY exp_date ASC;`,
      [inventoryId],
    );
    return results;
  },

  getSaledQty: async (connection, batchId) => {
    const [results] = await connection.query(
      'select saled_pri_qty, saled_sec_qty, conversion from batch where batch_id = ?',
      [batchId],
    );
    return results;
  },

  getTotalPurchaseAmt: async (connection, orgId) => {
    const [results] = await connection.query(
      `select coalesce(sum(bth.batch_qty * bth.purchase_rate),0) as total from batch as bth 
      where org_id = ? and grn_id is not null`,
      [orgId],
    );
    return results;
  },

  getBatchesByProductId: async (connection, orgId, productId) => {
    const [results] = await connection.query(
      'select * from batch where org_id = ? and product_id = ?',
      [orgId, productId],
    );
    return results;
  },

  getTotalSumfromPurchase: async (connection, orgId) => {
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
  },
};
