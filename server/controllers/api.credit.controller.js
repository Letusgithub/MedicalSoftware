/* eslint-disable no-unused-vars */
const service = require('../services/credit.service');

exports.createCreditNote = (req, res) => {
  const data = req.body;

  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);

  const returnDate = day + month + year;

  service.getTotalCreditNotes((totalError, totalResults) => {
    const creditInvoiceId = `${req.body.pharmacyId}CR${returnDate}${totalResults + 1}`;
    service.createCreditNote(data, creditInvoiceId, (returnError, returnResults) => {
      if (returnError) {
        console.log('return error', returnError);
        return res.status(500).json({
          success: 0,
          message: 'Db error',
        });
      }
      return res.status(200).json({
        status: 'success',
        credit_invoice_no: creditInvoiceId,
      });
    });
  });
};

exports.createCreditNoteCarts = (req, res) => {
  const data = req.body;
  service.createCreditNoteCarts(data, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Database connection error',
      });
    }
    return res.status(200).json({
      success: 1,
      message: 'Created successfully',
    });
  });
};

exports.getINVDetailsinCreditNote = (req, res) => {
  const orgId = req.query.org;
  service.getINVDetailsinCreditNote(orgId, (allError, allResult) => {
    if (allError) {
      console.log(allError);
    }
    return res.status(200).json({
      status: 'success',
      data: allResult,
    });
  });
};

exports.getCreditNoteInInvoice = (req, res) => {
  const id = req.query.id;
  service.getCreditNoteinInvoice(id, (allError, allResult) => {
    if (allError) {
      console.log(allError);
    }
    return res.status(200).json({
      status: 'success',
      data: allResult,
    });
  });
};
