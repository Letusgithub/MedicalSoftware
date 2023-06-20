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
  getBatch: (id, callback) => {
    getPool().query(
      `select * from batch 
      JOIN inventory inv
      ON batch.product_id =  inv.product_id
      where batch.product_id =?`,
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
};
