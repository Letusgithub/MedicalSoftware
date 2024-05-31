module.exports = {
  createPurchaseOrder: async (connection, data, purchaseOrderNo) => {
    const [results] = await connection.query(
      `insert into purchase_order(
            po_id_main,
            vendor_id,
            org_id)
            values(?,?,?)`,
      [
        purchaseOrderNo,
        data.vendorId,
        data.orgId,
      ],
    );
    return results.insertId;
  },

  getPurchaseOrderCount: async (connection) => {
    const [results] = await connection.query(
      'SELECT COUNT(*) as total_rows FROM purchase_order',
    );
    return results;
  },
};
