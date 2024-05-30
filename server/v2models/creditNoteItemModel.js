module.exports = {
  createCreditNoteItem: async (connection, data, creditInvoiceNo) => {
    const [results] = await connection.query(
      `insert into credit_note_cart_details(       
            credit_invoice_id,
            product_id,
            batch_id_credit,
            pri_unit_credit,
            sec_unit_credit,
            total_credit)
            value(?,?,?,?,?,?)`,
      [creditInvoiceNo,
        data.productId,
        data.batchId,
        data.creditPriQty,
        data.creditSecQty,
        data.totalCredit],
    );
    return results.insertId;
  },
};
