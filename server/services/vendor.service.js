const { getPool } = require('../config/database');

module.exports = {

  // Create vendor
  create: (data, callBack) => {
    getPool().query(
      `insert into vendor(
                org_id,
                vendor_name,
                vendor_address,
                vendor_contact,
                vendor_email,
                vendor_gstin,
                vendor_dl_no
                )
                values(?,?,?,?,?,?,?)`,
      [
        data.org_id,
        data.vendor_name,
        data.vendor_address,
        data.vendor_contact,
        data.vendor_email,
        data.vendor_gstin,
        data.vendor_dl_no,
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
  update: (id, data, callBack) => {
    getPool().query(
      `update vendor set
            vendor_name= ?,
            vendor_address= ?,
            vendor_contact = ?,
            vendor_email = ?,
            vendor_gstin = ?,
            vendor_dl_no = ?
            where vendor_id = ?`,
      [
        data.vendor_name,
        data.vendor_address,
        data.vendor_contact,
        data.vendor_email,
        data.vendor_gstin,
        data.vendor_dl_no,
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
