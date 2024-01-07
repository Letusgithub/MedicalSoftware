const { getPool } = require('../config/database');

// Middleware to store last activity time in MySQL
exports.lastVisit = (req, res, next) => {
  const userId = req.org_id;

  getPool().query(
    'insert into user_activity(activity_time, user_id) values(NOW(), ?)',
    [userId],
    (error) => {
      if (error) {
        console.error('Error updating last activity:', error);
      }
      next();
    },
  );
};
