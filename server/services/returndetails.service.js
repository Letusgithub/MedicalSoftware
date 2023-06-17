const { getPool } = require('../config/database');

module.exports = {
  createReturnOrder: (data, returnId, callback) => {
    getPool().query(
      `insert into return_details(return_invoice_id, sales_invoice_id, return_subtotal, new_return_discount, return_amount, reason) 
                                      values(?,?,?,?,?,?)`,
      [
        returnId,
        data.sales_invoice_id,
        data.return_subtotal,
        data.new_return_discount,
        data.return_amount,
        data.reason,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getTotalReturns: (callback) => {
    getPool().query(
      'SELECT COUNT(*) as total_rows FROM return_details',
      [],
      (error, results) => {
        if (error) return callback(error);
        const totalCount = JSON.parse(results[0].total_rows);
        return callback(null, totalCount);
      },
    );
  },
};
