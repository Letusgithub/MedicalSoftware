const {
  create, getBatch
} = require('../controllers/api.batch.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post('/api/addbatch/', create);
  app.get('/api/getbatch/:id', getBatch);
};
