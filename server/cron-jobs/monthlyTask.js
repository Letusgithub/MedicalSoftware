// eslint-disable-next-line import/no-extraneous-dependencies
const cron = require('node-cron');
const controller = require('../controllers/api.inventory.controller');

module.exports = () => {
  cron.schedule('0 0 1 * *', () => {
    console.log('Running a task every month');
    controller.createNearExpiryReport();
  });
};
