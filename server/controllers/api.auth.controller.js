/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */
// Atharv Kurde

const { createJwtToken } = require('../utils/token.util');
const { generateOtp } = require('../actions/generateOtp.action');
const { checkIfExists, verify, register } = require('../services/auth.service');

exports.loginOrg = async (req, res) => {
  // const data = req.body;
  console.log('number', req.body.org_telephone);
  try {
    // call otp gen action >> send otp and gen otp-token //
    const otpStatus = await generateOtp(req.body.org_telephone);
    console.log(otpStatus);

    if (otpStatus.status === 'success') {
      return res.status(200).json({
        status: 'success',
        OTPtoken: otpStatus.token,
      });
    }
    return res.status(500).json({
      status: 'error',
      error: 'Error in sending otp',

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login user' });
  }
};

exports.verifyOtp = async (req, res) => {
  const otp_value = req.body.otp_value;
  const OTPtoken = req.body.OTPtoken;
  const org_telephone = req.body.mobileNumber;

  try {
    verify(OTPtoken, otp_value, (otpErr, otpResult) => {
      if (otpErr) {
        console.error('Failed to verify OTP:', otpErr);
        return res.status(500).json({ message: 'Failed to verify' });
      }
      if (otpResult) {
        checkIfExists(org_telephone, (err, results) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              message: 'Internal server error',
            });
          }
          if (results[0] === undefined) {
            console.log('inside verify', org_telephone);
            return res.json({ success: 1, redirect: `/register?mobileNumber=${org_telephone}` });
          }
          if (results[0].is_verified === 0) {
            return res.json({ success: 1, redirect: `/register?mobileNumber=${org_telephone}` });
          }
          // Generate JWT token after successful otp verification //
          const token = createJwtToken(org_telephone);
          // Set the JWT token as a cookie //
          res.cookie('token', token, { httpOnly: true });

          return res.json({ success: 1, redirect: '/' });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to generate OTP' });
  }
};

exports.registerOrg = (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    register(data, (err) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      // Generate JWT token after successful otp verification //
      const token = createJwtToken(data.org_telephone);
      console.log(token);
      // Set the JWT token as a cookie //
      res.cookie('token', token, { httpOnly: true });

      return res.json({ redirect: '/' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to register' });
  }
};

exports.logoutOrg = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('gotalldata');
  res.redirect('/login');
};
