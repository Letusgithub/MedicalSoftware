module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // Login Page
  app.get('/login', (req, res) => {
    res.render('Auth/login');
  });

  // Register Login
  app.get('/register', (req, res) => {
    res.render('Auth/register');
  });

  // OTP Verification
  app.get('/verify_otp', (req, res) => {
    const number = req.query.phoneNumber;
    const token = req.query.OTPtoken;
    res.render('Auth/otp_verification', { number, token });
  });
};
