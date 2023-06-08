const { getPool } = require('../config/database.js');

module.exports = {

  // Update Organisation
  update: (data, callBack) => {
    getPool().query(
      `update organisation set 
            org_name = ?,
            owner_name = ?,
            org_gstin = ?,
            org_telephone = ?,
            org_alt_telephone = ?,
            org_email = ?,
            org_city = ?,
            org_state = ?,
            org_address = ?,
            org_lat = ?,
            org_long = ?,
            org_access = ?
            where org_id = ?`,
      [
        data.org_name,
        data.owner_name,
        data.org_gstin,
        data.org_telephone,
        data.org_alt_telephone,
        data.org_email,
        data.org_city,
        data.org_state,
        data.org_address,
        data.org_lat,
        data.org_long,
        data.org_access,
        data.org_id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  getOrgId: (id, callBack) => {
    getPool().query(
      'select * from organisation where org_id = ?',
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
  // Delete Organisation
  delete: (data, callBack) => {
    getPool().query(
      'delete from organisation where org_id = ?',
      [data.org_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Get Organisation by Id
  getById: (org_id, callBack) => {
    getPool().query(
      `select 
            org_id,
            org_name,
            org_gstin,
            org_telephone,
            org_alt_telephone,
            org_email,
            org_city,
            org_state,
            org_address,
            org_lat,
            org_long,
            org_access
            from organisation where org_id = ?`,
      [org_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },

    );
  },
};
