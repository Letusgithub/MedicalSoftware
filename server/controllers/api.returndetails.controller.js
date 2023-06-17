const { createReturnOrder, getTotalReturns } = require('../services/returndetails.service');

module.exports = {
  createReturnOrder: (req, res) => {
    const body = req.body;
    const orgId = req.body.sales_invoice_id.slice(0, 16);

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);

    const returnDate = day + month + year;

    getTotalReturns((totalError, totalResults) => {
      console.log('err', totalError);
      console.log('res', totalResults);

      const returnInvoiceId = `${orgId}RE${returnDate}${totalResults}`;
      // console.log('invoiceId', returnInvoiceId);
      createReturnOrder(body, returnInvoiceId, (returnError, returnResults) => {
        if (returnError) {
          console.log('return error', returnError);
          return res.status(500).json({
            success: 0,
            message: 'Db error',
          });
        }
        return res.status(200).json({
          status: 'success',
          message: returnResults,
          return_invoice_id: returnInvoiceId,
        });
      });
    });
    // let getCount;
    // getMonthCount(monthName, currentYear, (getError, getResults) => {
    //   if (getError) console.log('error in get', getError);
    //   console.log('getResults', getResults);
    //   if (getResults.length === 0) {
    //     createNewMonth(monthName, currentYear, 0, (createError, createResults) => {
    //       if (createError) console.log('error', createError);
    //       console.log(createResults);
    //     });
    //     getCount = 0;
    //   } else {
    //     getCount = getResults[0].count;
    //   }
  },
};
