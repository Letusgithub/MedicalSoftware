/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable max-len */
const {
  create, getBatch, getAllBatchesById, updateBatchWhenSale, getTotalSumfromPurchase, getRemQtyafterSales, getPrevSaledQty, updateBatchQtyAfterSales,
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

  getRemQtyafterSales: (req, res) => {
    const orgId = req.query.org;
    const prodId = req.query.pro;
    getRemQtyafterSales(orgId, prodId, (err, results) => {
      if (err) console.log(err);
      return res.status(200).json({
        status: 'success',
        results,
      });
    });
  },

  updateBatchQtyAfterSales: (req, res) => {
    const data = req.body;
    getPrevSaledQty(data, (error, results) => {
      if (error) console.log(error);
      const saledPriQty = results[0].saled_pri_qty === null ? 0 : parseInt(results[0].saled_pri_qty);
      const saledSecQty = results[0].saled_sec_qty === null ? 0 : parseInt(results[0].saled_sec_qty);
      const conversion = results[0].conversion === null ? 0 : parseInt(results[0].conversion);
      const saled_pri_qty = parseInt(data.saled_pri_qty);
      const saled_sec_qty = parseInt(data.saled_sec_qty);

      const updateSecQty = (saledSecQty + saled_sec_qty) >= conversion
        ? (saledSecQty + saled_sec_qty) % (conversion) : (saledSecQty + saled_sec_qty);

      const updatePriQty = (saledPriQty + saled_pri_qty) + (saledSecQty + saled_sec_qty) / (conversion);

      updateBatchQtyAfterSales(updatePriQty, updateSecQty, data.batch_id, (updateErr, updateRes) => {
        if (updateErr) console.log(updateErr);
        return res.status(200).json({
          status: 'success',
          updateRes,
        });
      });
    });
  },

};
