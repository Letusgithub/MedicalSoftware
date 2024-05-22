const { getPool } = require('../config/database');

module.exports = {
  getSalesReceipt: async (orderId) => {
    const pool = getPool().promise();
    const transactions = [];

    const [salesDetails] = await pool.query(
      `SELECT * FROM order_details
        WHERE order_id = ?`,
      [orderId],
    );

    if (salesDetails.length === 0) {
      throw new Error('Sales details not found');
    }

    const [orgDetails] = await pool.query(
      `SELECT * FROM organisation
        WHERE org_id = ?`,
      [salesDetails[0].org_id],
    );

    const [customerDetails] = await pool.query(
      `SELECT * FROM customer_data
        WHERE customer_id = ?`,
      [salesDetails[0].customer_id],
    );

    const [items] = await pool.query(
      `SELECT * FROM cart_item 
            WHERE order_id = ?`,
      [orderId],
    );

    const addDiscPercent = (salesDetails[0].total_dist / salesDetails[0].subtotal) * 100;

    items.forEach((item) => {
      // eslint-disable-next-line max-len
      const grossValue = ((item.saled_pri_qty_cart * item.unit_mrp + item.saled_sec_qty_cart * (item.unit_mrp / item.conversion)) * (1 - (item.unit_discount / 100))) / (1 + (item.gst / 100));
      const transaction = {
        grossAmount: grossValue * (1 - (addDiscPercent / 100)),
        gstRate: item.gst,
      };

      transactions.push(transaction);
    });

    const totals = {
      0: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
      5: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
      12: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
      18: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
      total: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
      grandTotal: {
        taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
      },
    };

    // Calculate totals
    transactions.forEach((transaction) => {
      // If this GST rate hasn't been seen before, add it to totals
      if (!(transaction.gstRate in totals)) {
        totals[transaction.gstRate] = {
          taxAmt: 0, cgst: 0, sgst: 0, totalGst: 0,
        };
      }

      const gstAmount = transaction.grossAmount * (transaction.gstRate / 100);
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      totals[transaction.gstRate].taxAmt += transaction.grossAmount;
      totals[transaction.gstRate].cgst += cgst;
      totals[transaction.gstRate].sgst += sgst;
      totals[transaction.gstRate].totalGst += gstAmount;

      totals.total.taxAmt += transaction.grossAmount;
      totals.total.cgst += cgst;
      totals.total.sgst += sgst;
      totals.total.totalGst += gstAmount;

      totals.grandTotal.taxAmt += transaction.grossAmount;
      totals.grandTotal.cgst += cgst;
      totals.grandTotal.sgst += sgst;
      totals.grandTotal.totalGst += gstAmount;
    });

    return {
      orgDetails: orgDetails[0],
      salesDetails: salesDetails[0],
      customerDetails: customerDetails[0],
      salesCartItems: items,
      gstBreakup: totals,
    };
  },

  getReturnReceipt: async (returnId) => {
    const pool = getPool().promise();

    const [returnDetails] = await pool.query(
      `SELECT * FROM return_details rd
      JOIN order_details od 
      ON od.invoice_id_main = rd.sales_invoice_id
      WHERE rd.return_id = ?`,
      [returnId],
    );

    if (returnDetails.length === 0) {
      throw new Error('Return details not found');
    }

    const [orgDetails] = await pool.query(
      `SELECT * FROM organisation
        WHERE org_id = ?`,
      [returnDetails[0].org_id],
    );

    const [customerDetails] = await pool.query(
      `SELECT * FROM customer_data
      WHERE customer_id = ?`,
      [returnDetails[0].customer_id],
    );

    const [items] = await pool.query(
      `SELECT * FROM return_cart_item
      WHERE return_id = ?`,
      [returnId],
    );

    return {
      orgDetails: orgDetails[0],
      returnDetails: returnDetails[0],
      customerDetails: customerDetails[0],
      returnCartItems: items,
    };
  },
};
