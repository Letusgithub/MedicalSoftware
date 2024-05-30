module.exports = {
  createDebitNoteItem: async (connection, data, debitInvoiceNo) => {
    const [results] = await connection.query(
      'insert into debit_note_cart_details(debit_invoice_id,product_id,batch_id_debit,pri_unit_debit,sec_unit_debit,total_debit) value(?,?,?,?,?,?)',
      [debitInvoiceNo,
        data.productId,
        data.batchId,
        data.debitPriQty,
        data.debitSecQty,
        data.totalDebit],
    );
    return results.insertId;
  },
};
