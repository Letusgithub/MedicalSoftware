/* eslint-disable no-unused-vars */
const service = require('../services/debit.service');

exports.createDebitNote = (req, res) => {
  const data = req.body;

  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);

  const returnDate = day + month + year;

  service.getTotalDebitNotes((totalError, totalResults) => {
    const debitInvoiceId = `${req.body.pharmacyId}DB${returnDate}${totalResults + 1}`;
    service.createDebitNote(data, debitInvoiceId, (returnError, returnResults) => {
      if (returnError) {
        console.log('return error', returnError);
        return res.status(500).json({
          success: 0,
          message: 'Db error',
        });
      }
      return res.status(200).json({
        status: 'success',
        debit_invoice_no: debitInvoiceId,
      });
    });
  });
};

exports.createDebitNoteCarts = (req, res) => {
  const data = req.body;
  service.createDebitNoteCart(data, (err) => {
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

exports.getINVDetailsinDebitNote = (req, res) => {
  const orgId = req.query.org;
  service.getINVDetailsinDebitNote(orgId, (allError, allResult) => {
    if (allError) {
      console.log(allError);
    }
    return res.status(200).json({
      status: 'success',
      data: allResult,
    });
  });
};

exports.getDebitNoteInInvoice = (req, res) => {
  const id = req.query.id;
  service.getDebitNoteinInvoice(id, (allError, allResult) => {
    if (allError) {
      console.log(allError);
    }
    return res.status(200).json({
      status: 'success',
      data: allResult,
    });
  });
};
