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
            hsn,
            gst, 
            threshold
            )
            values(?,?,?,?,?,?,?)`,
      [
        data.product_id,
        data.org_id,
        data.primary_unit,
        data.secondary_unit,
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
  update: (data, id, callBack) => {
    getPool().query(
      `update inventory set
            hsn =?,
            gst=?, 
            threshold=? 
            where product_id = ? and org_id =?`,
      [
        data.hsn,
        data.gst,
        data.threshold,
        id,
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
      ON sample.product_id = inv.product_id
      where product_id = ? `,
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
      `SELECT inv.product_id, inv.hsn, inv.primary_unit, inv.secondary_unit, inv.threshold, spl.*, COALESCE(SUM(bth.batch_qty-bth.saled_pri_qty), 0) AS batch_qty
      FROM inventory AS inv
      JOIN sample AS spl ON inv.product_id = spl.product_id
      LEFT JOIN batch AS bth ON inv.product_id = bth.product_id
      where inv.org_id=${orgID}
      GROUP BY inv.product_id, inv.hsn, inv.primary_unit, inv.secondary_unit, inv.threshold
      `,
      [],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      },
    );
  },

  // Check if product exists in Inventory
  checkById: (productId, orgId, callBack) => {
    getPool().query(
      `select * from inventory inv
      where product_id = ? and org_id =?`,
      [productId, orgId],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },

    );
  },
};
