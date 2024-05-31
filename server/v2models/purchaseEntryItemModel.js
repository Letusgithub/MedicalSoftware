module.exports = {
  createPurchaseEntryItem: async (connection, data, productId, grnInvoiceNo) => {
    const [results] = await connection.query(
      `insert into grn_cart_details(grn_id, product_id, gst, hsn, punit, sunit, moq, batch_name, exp_Date, conversion, shelf_label, mrp, purchase, qty, free, bulk_discount, base_price)
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        grnInvoiceNo,
        productId,
        data.gst,
        data.hsn,
        data.primaryUnit,
        data.secondaryUnit,
        data.threshold,
        data.batchName,
        data.expDate,
        data.conversion,
        data.shelfLabel,
        data.mrp,
        data.ptr,
        data.quantity,
        data.free,
        data.bulkDiscount,
        data.basePrice,
      ],
    );
    return results.insertId;
  },
};
