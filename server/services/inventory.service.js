const { getPool } = require('../config/database');

module.exports = {

  // Create Inventory
  create: (data, callBack) => {
    getPool().query(
      `insert into inventory(
            product_id,
            org_id,
            primary_unit,
            secondary_unit,
            conversion,
            hsn,
            gst, 
            threshold
            )
            values(?,?,?,?,?,?,?,?)`,
      [
        data.product_id,
        data.org_id,
        data.primary_unit,
        data.secondary_unit,
        data.conversion,
        data.hsn,
        data.gst,
        data.threshold,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Update Inventory
  update: (error, results) => {
    getPool().query(
      `update inventory set
            org_id = ?,
            product_id = ?,
            vendor_id = ?,
            exp_date = ?,
            mfg_date = ?,
            qty_unit= ?,
            batch_qty = ?,
            entry_date = ?,
            shelf_label = ? 
            where batch_id = ?`
        [
          data.org_id,
          data.product_id,
          data.vendor_id,
          data.exp_date,
          data.mfg_date,
          data.qty_unit,
          data.batch_qty,
          data.entry_date,
          data.shelf_label,
          data.batch_id
        ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  // Delete Inventory
  delete: (data, callBack) => {
    getPool().query(
      'delete from inventory where batch_id = ?',
      [data.batch_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Get All Inventories by vendor ID
  getAllById: (data, callBack) => {
    getPool().query(
      'select * from inventory where vendor_id = ?',
      [data.vendor_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },

    );
  },

  // Get Inventory by batch ID
  getById: (productId, callBack) => {
    getPool().query(
      `select * from inventory inv
      JOIN sample 
      ON sample.sample_id = inv.product_id
      where product_id = ?`,
      [productId],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },

    );
  },

  getAllInventory: (orgID, callBack) => {
    getPool().query(
      `select * from inventory inv
        JOIN sample spl
        on spl.sample_id = inv.product_id
        LEFT JOIN batch
        ON batch.product_id = inv.product_id
        where org_id = ${orgID}
        `,
      [],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      },
    );
  },
};
