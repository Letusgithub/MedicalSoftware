module.exports = {
  createPurchaseEntry: async (connection, data, grnInvoiceNo) => {
    const [results] = await connection.query(
      `insert into grn(
                grn_id,
                vendor_id,
                vendor_invoice,
                total,
                invoice_date,
                credit_period,
                less_discount,
                credit_debit,
                payment_method,
                org_id)
                value(?,?,?,?,?,?,?,?,?,?)`,
      [
        grnInvoiceNo,
        data.vendorId,
        data.vendorInvoice,
        data.totalGross,
        data.invoiceDate,
        data.creditPeriod,
        data.lessDiscount,
        data.creditDebit,
        data.paymentMethod,
        data.orgId,
      ],
    );
    return results.insertId;
  },

  getPurchaseEntryCount: async (connection) => {
    const [results] = await connection.query(
      'SELECT COUNT(*) as total_rows FROM grn',
    );
    return results;
  },
};
