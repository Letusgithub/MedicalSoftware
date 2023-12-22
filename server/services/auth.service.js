/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
// Atharv Kurde
const { getPool } = require('../config/database');

module.exports = {

  // Check if organisation exists
  checkIfOrgExists: (org_telephone, callBack) => {
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

  // Check if employee exists for organisation
  checkIfEmpValid: (emp_mobile, callBack) => {
    getPool().query(
      'select * from employee where emp_mobile = ?',
      [emp_mobile],
      (error, results) => {
        // console.log('get by mobile', results);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  // Fecth org_telephone from org_id
  getOrgTel: (org_id, callBack) => {
    getPool().query(
      'select org_telephone from organisation where org_id = ?',
      [org_id],
      (error, results) => {
        // console.log('get by mobile', results);
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
        console.log(results, 'service results');
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
                owner_name,
                org_dl_no_1,
                org_dl_no_2,
                org_pincode,
                org_address,
                org_city,
                org_state,
                org_lat,
                org_long,
                is_verified)
                values(?,?,?,?,?,?,?,?,?,?,?,true)`,
      [
        data.org_telephone,
        data.org_name,
        data.owner_name,
        data.org_dl_no_1,
        data.org_dl_no_2,
        data.org_pincode,
        data.org_address,
        data.org_city,
        data.org_state,
        data.org_lat,
        data.org_long,
      ],
      (error, results) => {
        if (error) {
          console.log('error in service', error);
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

};
