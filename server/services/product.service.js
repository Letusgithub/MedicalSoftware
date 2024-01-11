const { getPool } = require('../config/database');

module.exports = {

  // Create product
  create: (data, callBack) => {
    getPool().query(
      `insert into product(
                product_name,
                mfd/mkt,
                salt,
                addedBy)
                values(?,?,?,?)`,
      [
        data.product_name,
        data.pack_size,
        data.brand,
        data.salt,
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

  // Update product
  update: (id, data, callBack) => {
    getPool().query(
      `update product set
            product_name = ?,
            pack_size = ?,
            conversion = ?,
            mfd/mkt = ?,
            salt = ?,
            hsn = ?,
            gst = ?,
            primary_unit = ?,
            secondary_unit = ?,
            addedBy = ?,
            verified = ?
            where product_id = ?`,
      [
        data.product_name,
        data.pack_size,
        data.conversion,
        data.brand,
        data.salt,
        data.type,
        data.gst,
        data.hsn,
        data.primary_unit,
        data.secondary_unit,
        data.verfied,
        id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  // Delete product
  delete: (data, callBack) => {
    getPool().query(
      'delete from product where product_id = ?',
      [data],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Get product by product ID
  getById: (data, callBack) => {
    getPool().query(
      'select * from product where product_id = ? and addedBy = ?',
      [
        data.product_id,
        data.org_id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
};
