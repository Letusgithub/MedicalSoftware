module.exports = {
  createCreditNote: async (connection, data, creditInvoiceNo) => {
    const [results] = await connection.query(
      `insert into credit_note(
                credit_invoice_id,
                vendor_id,
                org_id,
                credit_amt,
                less_discount)
                value(?,?,?,?,?)`,
      [
        creditInvoiceNo,
        data.vendorId,
        data.orgId,
        data.creditAmt,
        data.lessDiscount,
      ],
    );
    return results.affectedRows;
  },

  getCreditCount: async (connection) => {
    const [results] = await connection.query(
      'SELECT COUNT(*) as total_rows FROM credit_note',
    );
    return results;
  },
};
