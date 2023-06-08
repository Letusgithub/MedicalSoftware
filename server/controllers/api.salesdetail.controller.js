const {
  create, getAllOrders, getInvoiceOrder, getRevenue,
} = require('../services/salesdetail.service');

module.exports = {
  createOrder: (req, res) => {
    const body = req.body;
    create(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'Db error',
        });
      }
      // console.log(results);
      res.status(200).json({
        success: 1,
        result: results,
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

  getRevenue: (req, res) => {
    getRevenue((error, results) => {
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

};
