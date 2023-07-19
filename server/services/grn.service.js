const { getPool } = require('../config/database');

module.exports = {
  // Create Credit Note
  createGRN: (data, GRN, callBack) => {
    getPool().query(
      `insert into grn(
                  grn_id,
                  vendor_id,
                  org_id)
                  value(?,?,?)`,
      [
        GRN,
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

  getTotalGRN: (callback) => {
    getPool().query(
      'SELECT COUNT(*) as total_rows FROM grn',
      [],
      (error, results) => {
        if (error) return callback(error);
        const totalCount = JSON.parse(results[0].total_rows);
        return callback(null, totalCount);
      },
    );
  },

  createGRNcarts: (data, callback) => {
    getPool().query(

      `insert into grn_cart_details(grn_id, product_id, gst, hsn, punit, sunit, moq, batch_name, exp_Date, conversion, shelf_label, mrp, purchase, qty)
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.grn_id,
        data.product_id,
        data.gst,
        data.hsn,
        data.punit,
        data.sunit,
        data.moq,
        data.batch_name,
        data.exp,
        data.conversion,
        data.shelf_label,
        data.mrp,
        data.purchase,
        data.qty


      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },



};
