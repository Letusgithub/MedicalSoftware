/* eslint-disable no-unused-vars */
const service = require('../services/grn.service');

exports.createGRN = (req, res) => {
  const data = req.body;

  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);

  const returnDate = day + month + year;

  service.getTotalGRN((totalError, totalResults) => {
    const GRNInvoiceId = `${req.body.pharmacyId}GRN${returnDate}${totalResults + 1}`;
    service.createGRN(data, GRNInvoiceId, (returnError, returnResults) => {
      if (returnError) {
        console.log('return error', returnError);
        return res.status(500).json({
          success: 0,
          message: 'Db error',
        });
      }
      return res.status(200).json({
        status: 'success',
        grn_invoice_no: GRNInvoiceId,
      });
    });
  });
};

exports.createGRNcarts = (req, res) => {
  const data = req.body;
  console.log('in cart items', data);
  service.createGRNcarts(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: 'Db error',
      });
    }
    console.log('new data', data);
    res.send({ results });
  });
};
