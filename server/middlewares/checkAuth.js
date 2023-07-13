/* eslint-disable camelcase */
const { verifyJwtToken } = require('../utils/token.util');

exports.checkAuth = async (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;
  console.log('token in authcheck', token);

  // Check if the token exists
  // if (req.cookies.token === undefined) {
  //   return res.redirect('/login');
  // }

  try {
    // Verify the token
    const org_telephone = verifyJwtToken(token);

    // Attach the org_telephone request for future use
    req.org_telephone = org_telephone;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed, redirect to login
    console.log(err)
    // return res.redirect('/login');
  }
};
