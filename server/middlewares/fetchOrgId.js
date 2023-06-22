/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');

exports.fetchOrgId = async (req, res, next) => {
  const org_telephone = req.org_telephone;
  getPool().query(
    'select org_id, org_name, owner_name from organisation where org_telephone = ?',
    [org_telephone],
    (error, results) => {
      if (error) {
        console.error('Error querying the database: ', error);
        return res.status(500).json({
          status: 'error',
          error: 'Internal Server Error',
        });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Store the user ID in the request object //
      req.org_id = results[0].org_id;
      req.org_name = results[0].org_name;
      req.owner_name = results[0].owner_name;

      // return results[0].org_id;

      // console.log(results[0].org_id);

      // Proceed to the next middleware or route handler //
      next();
    },
  );
};
