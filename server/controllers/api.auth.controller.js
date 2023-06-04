/* eslint-disable camelcase */
const {
  getByTel, register, verify,
} = require('../services/auth.service');
const { createJwtToken } = require('../utils/token.util');
const { generateOtp } = require('../actions/generateOtp.action');

exports.verifyOtp = async (req, res) => {
  const otp_value = req.body.otp_value;
  //   const OTPtoken = req.body.OTPtoken;
  const OTPtoken = await req.query.OTPtoken;
  const org_telephone = req.query.phoneNumber;
  try {
    verify(OTPtoken, otp_value, org_telephone, (otpErr, otpResult) => {
      if (otpErr) {
        console.error('Failed to verify OTP:', otpErr);
        return res.status(500).json({ error: 'Failed to register' });
      }
      if (otpResult.fieldCount === 0) {
        console.log(otpResult);
        return res.status(401).json({ error: 'Invalid OTP' });
      }
      // Generate JWT token after successful otp verification
      const token = createJwtToken(org_telephone);

      // Set the JWT token as a cookie
      res.cookie('token', token, { httpOnly: true });

      return res.redirect('/');
      // res.status(200).json({
      //   status: 'success',
      //   message: 'User verified sucessfully',
      // });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

exports.registerOrg = (req, res) => {
  const data = req.body;
  try {
    // Check if telephone exists
    getByTel(data, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      if (results) {
        if (results.is_verified) {
          return res.status(500).json({
            status: 'error',
            error: 'User already registered',
          });
        }
        if (!results.is_verified) {
          // call otp gen action >> send otp and gen otp-token
          const otpStatus = await generateOtp(data.org_telephone);
          if (otpStatus.status === 'success') {
            // save OTPtoken in cookie
            // res.cookie('OTPtoken', otpStatus.token, { httpOnly: true });

            return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);

            // return res.status(200).json({
            //   status: 'success',
            //   body: { OTPtoken: otpStatus.token },
            // });
          }
          res.status(500).json({
            status: 'error',
            error: 'Error in sending otp',
          });
        }
      }
      // Registration process
      register(data, async (regErr) => {
        if (regErr) {
          console.log(regErr);
          return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
          });
        }
        // call otp gen action >> send otp and gen otp-token
        const otpStatus = await generateOtp(data.org_telephone);
        if (otpStatus.status === 'success') {
          // save OTPtoken in cookie
          // res.cookie('OTPtoken', otpStatus.token, { httpOnly: true });

          return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);

          // return res.status(200).json({
          //   status: 'success',
          //   body: { token: otpStatus.token },
          // });
        }
        res.status(500).json({
          status: 'error',
          error: 'Error in sending otp',
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginOrg = (req, res) => {
  const data = req.body;
  try {
    // Check if telephone exists
    getByTel(data, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          error: 'Internal server error',
        });
      }
      if (!results) {
        return res.status(404).json({
          status: 'success',
          message: 'User does not exists',
        });
      }
      // call otp gen action >> send otp and gen otp-token
      const otpStatus = await generateOtp(data.org_telephone);
      if (otpStatus.status === 'success') {
        // save OTPtoken in cookie
        // res.cookie('OTPtoken', otpStatus.token, { httpOnly: true });

        return res.redirect(`/verify_otp?phoneNumber=${data.org_telephone}&OTPtoken=${otpStatus.token}`);
        // return res.json({
        //   status: 'success',
        //   body: { token: otpStatus.token },
        // });
      }
      res.status(500).json({
        status: 'error',
        error: 'Error in sending otp',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login user' });
  }
};
