/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */
// Atharv Kurde
const {
  getByTel, register, verify,
} = require('../services/auth.service');
const { createJwtToken } = require('../utils/token.util');
const { generateOtp } = require('../actions/generateOtp.action');

exports.verifyOtp = async (req, res) => {
  const otp_value = req.body.otp_value;
  const OTPtoken = req.body.OTPtoken;
  const org_telephone = req.body.phoneNumber;
  // console.log('otp_value', otp_value);
  // console.log('otptoken', OTPtoken);
  // console.log('otptelephone', org_telephone);

  try {
    verify(OTPtoken, otp_value, org_telephone, (otpErr, otpResult) => {
      // console.log('object result', otpResult);
      // console.log('object error', otpErr);
      if (otpErr == null) {
        console.error('Failed to verify OTP:', otpErr);
        return res.status(500).json({ error: 'Failed to register' });
      }
      if (otpResult) {
        // console.log('SUCCESS', otpResult);
        // Generate JWT token after successful otp verification //
        const token = createJwtToken(org_telephone);
        // Set the JWT token as a cookie //
        res.cookie('token', token, { httpOnly: true });
        // console.log("cookie", token);
        res.redirect('/');
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

exports.registerOrg = (req, res) => {
  const data = req.body;
  try {
    // Check if telephone exists //
    getByTel(data, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      if (results.length === 0) {
        // Registration process //
        register(data, async (regErr) => {
          if (regErr) {
            console.log(regErr);
            return res.status(500).json({
              status: 'error',
              error: 'Internal server error',
            });
          }
          // call otp gen action >> send otp and gen otp-token //
          const otpStatus = await generateOtp(data.org_telephone);
          console.log('inside results', otpStatus);
          if (otpStatus.status === 'success') {
            return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);
          }
          return res.status(500).json({
            status: 'error',
            error: 'Error in sending otp',

          });
        });
      } else if (results) {
        console.log('results', results);
        if (results[0].is_verified) {
          console.log('telephone number exists');
          return res.status(500).json({
            status: 'error',
            error: 'User already registered',
          });
        }
        if (!results[0].is_verified) {
          // call otp gen action >> send otp and gen otp-token //
          const otpStatus = await generateOtp(data.org_telephone);
          if (otpStatus.status === 'success') {
            return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);
          }
          res.status(500).json({
            status: 'error',
            error: 'Error in sending otp',
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginOrg = (req, res) => {
  const data = req.body;
  console.log('number', req.body.org_telephone);
  try {
    // Check if telephone exists //
    getByTel(data, async (err, results) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      if (results) {
        // console.log('results', results.length);
        // console.log('verified status', results[0].is_verified);
        if (results.length === 0) {
          return res.redirect('/register');
          // return res.status(404).json({
          //   status: 'error',
          //   error: 'User not found',
          // });
        }
        if (!results[0].is_verified) {
          return res.redirect('/register');
          // return res.status(404).json({
          //   status: 'error',
          //   error: 'User registration not completed',
          // });
        }
        if (results[0].is_verified) {
          // call otp gen action >> send otp and gen otp-token //
          const otpStatus = await generateOtp(data.org_telephone);
          console.log('inside login', otpStatus);
          if (otpStatus.status === 'success') {
            return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);
          }
          return res.status(500).json({
            status: 'error',
            error: 'Error in sending otp',
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login user' });
  }
};

exports.logoutOrg = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('gotalldata');
  res.redirect('/login');
};
