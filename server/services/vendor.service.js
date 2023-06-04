const { getPool } = require('../config/database');

module.exports = {

  // Create vendor
  create: (data, callBack) => {
    getPool().query(
      `insert into vendor(
                company,
                vendor_name,
                vendor_address,
                vendor_contact,
                vendor_gstin,
                email)
                values(?,?,?,?,?,?)`,
      [
        data.company,
        data.vendor_name,
        data.vendor_address,
        data.vendor_contact,
        data.vendor_gstin,
        data.email,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Update vendor
  update: (id, data, results) => {
    getPool().query(
      `update vendor set
            vendor_name= ?,
            vendor_address= ?,
            vendor_contact = ?,
            vendor_gstin = ?,
            where vendor_id = ?`,
      [
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
  getById: (vendor_id, callBack) => {
    getPool().query(
      'select * from vendor where vendor_id = ?',
      [data.vendor_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
};
