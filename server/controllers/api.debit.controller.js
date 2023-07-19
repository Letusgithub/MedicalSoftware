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

exports.searchDates = (req,res) => {
    const orgId = req.query.org;
    const from = req.query.from;
    const to = req.query.to;
    service.searchDates(orgId, from, to, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'some error',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: results,
      });
    });

};

exports.searchMonth = (req,res) => {
    const orgId = req.query.org;
    const month = req.query.month;
    service.searchMonth(orgId, month, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'some error',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: results,
      });
    });

};

exports.searchYear = (req,res) => {
    const orgId = req.query.org;
    const year = req.query.year;
    service.searchYear(orgId, year, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'some error',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: results,
      });
    });

};

exports.searchQuarter = (req,res) => {
    const orgId = req.query.org;
    const quarter = req.query.quarter;
    let start; let
      end;
    if (quarter == 1) {
      start = 4;
      end = 6;
    } else if (quarter == 2) {
      start = 7;
      end = 9;
    } else if (quarter == 3) {
      start = 10;
      end = 12;
    } else if (quarter == 4) {
      start = 1;
      end = 3;
    }
    service.searchQuarter(orgId, start, end, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'some error',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: results,
      });
    });

};