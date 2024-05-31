module.exports = {
  createPurchaseOrderItem: async (connection, data, purchaseOrderNo) => {
    const [results] = await connection.query(
      `insert into po_items(po_id_main, product_id, quantity, unit, ptr, amount, mrp)
        values(?,?,?,?,?,?,?)`,
      [
        purchaseOrderNo,
        data.productId,
        data.quantity,
        data.unit,
        data.ptr,
        data.amount,
        data.mrp,
      ],
    );
    return results.affectedRows;
  },
};
