/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {

  // Check if organisation exists
  getByTel: (data, callBack) => {
    getPool().query(
      'select * from organisation where org_telephone = ?',
      [data.org_telephone],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  // verify OTP
  verify: (OTPtoken, otp_value, org_telephone, callBack) => {
    getPool().query(
      'select * from otps where otp_value = ? and token = ?', // carry out query for last 24h entries only
      [
        otp_value,
        OTPtoken,
      ],
      (error, results) => {
        if (results.length === 0) {
      (error, results) => {
        console.log('results of verification', results);
        if (results.length == 0) {
          console.log('object in service', error);
          return callBack(error);
        }
        // Change is_verified status to true
        getPool().query(
          'update organisation set is_verified = true where org_telephone = ?',
          [org_telephone],
          (statusError, statusResult) => {
            if (statusError) {
              return callBack(statusError);
            }
            return callBack('no error'statusResult);
          },
        );
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
                owner_name,
                is_verified)
                values(?,?,?,?,false)`,
      [
        data.org_name,
        data.org_gstin,
        data.org_telephone,
        data.owner_name,
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
