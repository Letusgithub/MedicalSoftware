const {
  create, getBatch, getAllBatchesById, updateBatchWhenSale, getTotalSumfromPurchase,
} = require('../services/batch.service');

module.exports = {
  create: (req, res) => {
    const data = req.body;
    create(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'Db error',
        });
      }
      console.log('new data', data);
      return res.status(200).json({
        status: 'success',
      });
    });
  },

  getBatch: (req, res) => {
    const id = req.query.id;
    const orgId = req.query.org;
    getBatch(id, orgId, (err, results) => {
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

  getAllBatchesById: (req, res) => {
    const id = req.query.id;
    const orgId = req.query.org;

    getAllBatchesById(orgId, id, (err, results) => {
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

  updateBatchWhenSale: (req, res) => {
    const data = req.body;
    updateBatchWhenSale(data, (updateError, updateResults) => {
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

  getTotalSumfromPurchase: (req, res) => {
    const orgId = req.query.org;
    getTotalSumfromPurchase(orgId, (err, results) => {
      if (err) console.log(err);
      return res.status(200).json({
        status: 'success',
        results,
      });
    });
  },

};
