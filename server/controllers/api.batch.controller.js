const {
  create, getBatch, getAllBatchesById,
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
    const id = req.params.id;
    getBatch(id, (err, results) => {
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

};
