/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
// Atharv Kurde
const { getPool } = require('../config/database');

module.exports = {

  // Check if organisation exists
  checkIfExists: (org_telephone, callBack) => {
    getPool().query(
      'select * from organisation where org_telephone = ?',
      [org_telephone],
      (error, results) => {
        // console.log('get by tel', results);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // verify OTP
  verify: (OTPtoken, otp_value, callBack) => {
    getPool().query(
      'select * from otps where otp_value = ? and token = ?', // carry out query for last 24h entries only
      [
        otp_value,
        OTPtoken,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Register Organisation
  register: (data, callBack) => {
    getPool().query(
      `insert into organisation(
                org_telephone,
                org_name,
                org_dl_no_1,
                org_dl_no_2,
                org_pincode,
                org_address,
                is_verified)
                values(?,?,?,?,?,?,true)`,
      [
        data.org_telephone,
        data.org_name,
        data.org_dl_no_1,
        data.org_dl_no_2,
        data.org_pincode,
        data.org_address,
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
