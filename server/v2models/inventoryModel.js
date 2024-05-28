module.exports = {
  getProductInventoryByOrgId: async (connection, productId, orgId) => {
    const [results] = await connection.query(
      `select * from inventory inv
            JOIN sample spl ON spl.product_id = inv.product_id
            LEFT JOIN category cat on cat.category_id = inv.category_id
            where spl.product_id = ? and inv.org_id = ? `,
      [productId, orgId],
    );
    return results;
  },
};
