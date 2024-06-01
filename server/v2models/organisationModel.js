module.exports = {
  getPharmacyId: async (connection, orgId) => {
    const [results] = await connection.query(
      'SELECT org_id_main FROM organisation WHERE org_id = ?',
      [orgId],
    );
    return results;
  },
};
