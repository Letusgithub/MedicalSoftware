/* eslint-disable no-undef */

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createJwtToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SEC, { expiresIn: '1d' });
  return token;
};

exports.verifyJwtToken = (token, next) => {
  try {
    const { payload } = jwt.verify(token, process.env.JWT_SEC);
    return payload;
  } catch (err) {
    next(err);
  }
};
