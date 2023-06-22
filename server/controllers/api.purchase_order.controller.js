const service = require('../services/purchase_order.service');

exports.createPO = (req, res) => {
  const body = req.body;
  console.log(body.pharmacyId);
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);

  const PODate = day + month + year;
  service.searchTotalPO(month, year, (totalError, totalResults) => {
    if (totalError) console.log(totalError);
    const total = totalResults;
    const POId = `${req.body.pharmacyId}PO${PODate}${total + 1}`;
    console.log('POid', POId);
    service.create(body, POId, (error, results) => {
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
        POId,
      });
    });
  });
};

exports.createPOCarts = (req, res) => {
  const data = req.body;
  console.log('in po cart items', data);
  service.createPOCarts(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: 'Db error',
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

exports.updateOwner = (req, res) => {
  const data = req.body;
  service.update(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: 'Record Not Found',
      });
    }

    return res.status(200).json({
      success: 1,
      message: 'Updated successfully',
    });
  });
};

exports.deleteOwner = (req, res) => {
  const data = req.body;
  service.delete(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        ssuccess: 0,
        message: 'Record Not Found',
      });
    }

    return res.status(200).json({
      success: 1,
      message: 'Deleted successfully',
    });
  });
};
