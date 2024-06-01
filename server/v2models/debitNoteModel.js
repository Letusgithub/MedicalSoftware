module.exports = {
  createDebitNote: async (connection, data, debitInvoiceNo) => {
    const [results] = await connection.query(
      'insert into debit_note(debit_invoice_id,vendor_id,org_id, debit_amt, less_discount) value(?,?,?,?,?)',
      [debitInvoiceNo,
        data.vendorId,
        data.orgId,
        data.debitAmt,
        data.lessDiscount],
    );
    return results.affectedRows;
  },

  getDebitNoteCount: async (connection) => {
    const [results] = await connection.query(
      'SELECT COUNT(*) as total_rows FROM debit_note',
    );
    return results;
  },
};
