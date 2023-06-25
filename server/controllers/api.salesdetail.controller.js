/* eslint-disable max-len */
const {
  create, getAllOrders, getInvoiceOrder, getRevenue, searchDates, createNewMonth, updateMonthCount, getMonthCount, autoComplete, allSamples, invoiceSales, mainId, searchTotalSales, getTotalSumfromSales,
} = require('../services/salesdetail.service');

module.exports = {
  createOrder: (req, res) => {
    const body = req.body;
    console.log('body insales', body);

    const now = new Date();
    const monthName = now.toLocaleString('default', { month: 'long' });
    const currentYear = (now.getFullYear()) % 100;
    const monthNumber = now.getMonth() + 1;

    let monthNumberString = '';
    if (monthNumber < 10) {
      monthNumberString = `0${monthNumber.toString()}`;
    } else {
      monthNumberString = monthNumber.toString();
    }

    let getCount;
    getMonthCount(monthName, currentYear, (getError, getResults) => {
      if (getError) console.log('error in get', getError);
      console.log('getResults', getResults);
      if (getResults.length === 0) {
        createNewMonth(monthName, currentYear, 0, (createError, createResults) => {
          if (createError) console.log('error', createError);
          console.log(createResults);
        });
        getCount = 0;
      } else {
        getCount = getResults[0].count;
      }

      const invoiceId = `${req.body.pharmacyId}S${monthNumberString}${currentYear}${getCount + 1}`;
      console.log('invoiceId', invoiceId);

      create(body, invoiceId, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: 'Db error',
          });
        }

        updateMonthCount(monthName, currentYear, getCount + 1);
        res.status(200).json({
          success: 1,
          result: results,
        });
      });
    });
  },

  createSalesOrder: (req, res) => {
    const body = req.body;
    const orgId = req.body.org_id;
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);

    const returnDate = day + month + year;
    searchTotalSales(orgId, month, year, (totalError, totalResults) => {
      if (totalError) console.log(totalError);
      const total = totalResults;
      const invoiceId = `${req.body.pharmacyId}SA${returnDate}${total + 1}`;
      console.log('invoice', invoiceId);
      create(body, invoiceId, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: 'Db error',
          });
        }
        res.status(200).json({
          success: 1,
          result: results,
          invoiceId,
        });
      });
    });
  },

  getAllOrders: (req, res) => {
    const id = req.params.id;
    getAllOrders(id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'No Orders Found',
        });
      }
      // console.log(results);
      res.status(200).json({
        success: 'nice',
        result: results,
      });
    });
  },

  mainId: (req, res) => {
    const id = req.params.id;
    mainId(id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'No Orders Found',
        });
      }
      // console.log(results);
      res.status(200).json({
        success: 'nice',
        result: results,
      });
    });
  },

  allSamples: (req, res) => {
    const id = req.params.id;
    allSamples((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'No Orders Found',
        });
      }
      // console.log(results);
      res.status(200).json({
        result: results,
      });
    });
  },

  getInvoiceOrder: (req, res) => {
    const salesId = req.query.invoiceid;
    const orgId = req.query.org;
    getInvoiceOrder(salesId, orgId, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'No Orders Found',
        });
      }
      // console.log(results);
      res.status(200).json({
        success: 'here',
        result: results,
      });
    });
  },
  invoiceSales: (req, res) => {
    const salesId = req.query.invoiceid;
    const orgId = req.query.org;
    invoiceSales(salesId, orgId, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'No Orders Found',
        });
      }
      // console.log(results);
      res.status(200).json({
        success: 'here',
        result: results,
      });
    });
  },

  getRevenue: (req, res) => {
    const orgId = req.query.org;
    console.log(orgId);
    getRevenue(orgId, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  searchDates: (req, res) => {
    const orgId = req.query.org;
    const from = req.query.from;
    const to = req.query.to;
    searchDates(orgId, from, to, (error, results) => {
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
  },

  autoComplete: (req, res) => {
    const input = req.query.med;
    autoComplete(input, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: error,
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getTotalSumfromSales: (req, res) => {
    const orgId = req.query.org;
    getTotalSumfromSales(orgId, (err, results) => {
      if (err) console.log(err);
      return res.status(200).json({
        status: 'success',
        results,
      });
    });
  },

};
