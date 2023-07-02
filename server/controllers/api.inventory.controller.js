/* eslint-disable camelcase */
const service = require('../services/inventory.service');

exports.createInventory = (req, res) => {
  const data = req.body;
  console.log(data);
  service.create(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Database connection error',
      });
    }

    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

exports.updateInventory = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  service.update(data, id, (err, results) => {
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

exports.deleteInventory = (req, res) => {
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

exports.getInventoryById = (req, res) => {
  const productId = req.params.id;
  service.getById(productId, (err, results) => {
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
      data: results,
    });
  });
};

exports.getAllInventorysById = (req, res) => {
  const org_id = req.params.id;
  service.getAllById(org_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        ssuccess: 0,
        message: 'Records Not Found',
      });
    }

    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

exports.getAllInventory = (req, res) => {
  const orgID = req.query.orgID;
  console.log('orgID', orgID);
  service.getAllInventory(orgID, (allError, allResult) => {
    if (allError) {
      console.log(allError);
    }
    return res.status(200).json({
      status: 'success',
      data: allResult,
    });
  });

  // exports.getTotalStock = (req, res) => {
  //   const orgID = req.query.orgID;
  //   console.log('orgID', orgID);
  //   service.getAllInventory(orgID, (allError, allResult) => {
  //     if (allError) {
  //       console.log(allError);
  //     }
  //     return res.status(200).json({
  //       status: 'success',
  //       data: allResult,
  //     });
  //   });
};
