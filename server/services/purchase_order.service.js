const { getPool } = require('../config/database');

module.exports = {
  create: (data, poId, callBack) => {
    getPool().query(
      `insert into purchase_order(
                po_id_main,
                vendor_id,
                org_id
                )
                values(?,?,?)`,
      [
        poId,
        data.vendor_id,
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

  createPOCarts: (data, callback) => {
    getPool().query(
      `insert into po_items(po_id_main, product_id, quantity, unit)
        values(?,?,?,?)`,
      [
        data.po_id_main,
        data.product_id,
        data.quantity,
        data.unit,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  searchTotalPO: (month, year, callback) => {
    getPool().query(
      `SELECT COUNT(*) as total_rows FROM purchase_order WHERE SUBSTRING(po_id_main, 20, 4) = ${month}${year}`,
      [],
      (error, results) => {
        if (error) return callback(error);
        const totalCount = JSON.parse(results[0].total_rows);
        console.log(results);
        return callback(null, totalCount);
      },
    );
  },
  // Update vendor
 


  update: (id, data, callBack) => {
    getPool().query(
      `update vendor set
            company = ?,
            vendor_name= ?,
            vendor_address= ?,
            vendor_contact = ?,
            vendor_gstin = ?
            where vendor_id = ?`,
      [
        data.company,
        data.vendor_name,
        data.vendor_address,
        data.vendor_contact,
        data.vendor_gstin,
        id,
      ],

      (error, results) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results[0]);
      },
    );
  },

  // Delete vendor
  delete: (data, callBack) => {
    getPool().query(
      'delete from vendor where vendor_id = ?',

      [data],

      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Get All Vendors by Org ID
  getAllById: (data, callBack) => {
    getPool().query(
      'select * from vendor where org_id = ?',
      [data.org_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },

    );
  },

  // Get Vendor by vendor ID
  getById: (vendorId, callBack) => {
    getPool().query(
      'select * from vendor where vendor_id = ?',
      [vendorId],

      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
};
