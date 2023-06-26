const {
  create, getOrdersById, getOrders, updateOrders,
} = require('../services/cartitem.service');

module.exports = {
  create: (req, res) => {
    const data = req.body;
    console.log('in cart items', data);
    create(data, (error, results) => {
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
  },
  getOrdersById: (req, res) => {
    const id = req.params.id;
    getOrdersById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 'gotorders',
        data: results,
      });
    });
  },
  getOrders: (req, res) => {
    const id = req.params.id;
    getOrders(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 'gotorders',
        data: results,
      });
    });
  },
  updateOrders: (req, res) => {
    const salesInvoiceId = req.query.sales_invoice_id;
    const productId = req.query.product_id;
    const batchId = req.query.batch;

    updateOrders(req.body, salesInvoiceId, batchId, productId, (updateError, updateResults) => {
      if (updateError) {
        console.log(updateError);
        return;
      }
      return res.status(200).json({
        success: 'Updated',
        data: updateResults,
      });
    });
  },
};
