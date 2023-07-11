// const { getPool } = require('../config/database');
// const {authMiddleware} = require('../middlewares');
const controller = require('../controllers/api.credit.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/getinvdetailsincreditnote', controller.getINVDetailsinCreditNote);
  app.get('/api/getcreditnoteininvoice', controller.getCreditNoteInInvoice);

  app.post('/api/createcreditnote', controller.createCreditNote);
  app.post('/api/creditnotecartdetails/', controller.createCreditNoteCarts);
};
