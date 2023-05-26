// const { getPool } = require('../config/database');
// const {authMiddleware} = require('../middlewares');
const controller = require('../controllers/api.emp.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/emp/', controller.createEmp);
  app.patch('/api/emp/', controller.updateEmp);
  app.delete('/api/emp/', controller.deleteEmp);
  app.get('/api/emp/:id', controller.getEmpById);
  app.get('/api/emp/all/:id', controller.getAllEmpsById);
};
