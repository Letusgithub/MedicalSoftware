module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // Login Page
  // app.get('/login', (req, res) => {
  //   res.render('Auth/login');
  // });

  // Login Page 2
  app.get('/login', (req, res) => {
    res.render('Auth/login-2');
  });

  // Register Login
  app.get('/register', (req, res) => {
    const mobileNumber = req.query.mobileNumber;
    res.render('Auth/register', { mobileNumber });
  });
};
