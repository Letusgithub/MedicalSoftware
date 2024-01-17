const { getPool } = require('../config/database');

module.exports = {

  // Create product
  create: (data, callBack) => {
    getPool().query(
      `insert into sample(
                med_name,
                mfd_mkt,
                salt_composition,
                conversion,
                added_by)
                values(?,?,?,?,?)`,
      [
        data.med_name,
        data.mfd_mkt,
        data.salt,
        data.conversion,
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
            mfd_mkt = ?,
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
      'select * from product where product_id = ? and added_by = ?',
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
