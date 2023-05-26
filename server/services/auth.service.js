const { getPool } = require('../config/database');

module.exports = {

  // Check if organisation exists
  getByTel: (org_telephone, callBack) => {
    getPool().query(
      'select * from organisation where org_telephone = ?',
      [org_telephone],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  // Register Organisation
  register: (data, callBack) => {
    getPool().query(
      `insert into organisation(
                org_name,
                org_gstin,
                org_telephone,
                org_alt_telephone,
                org_email,
                org_city,
                org_state,
                org_address,
                org_lat,
                org_long)
                values(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.org_name,
        data.org_gstin,
        data.org_telephone,
        data.org_alt_telephone,
        data.org_email,
        data.org_city,
        data.org_state,
        data.org_address,
        data.org_lat,
        data.org_long,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },
};
