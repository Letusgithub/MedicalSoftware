/* eslint-disable camelcase */
const service = require('../services/vendor.service');

exports.createVendor = (req, res) => {
  const data = req.body;
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
      results,
      message: 'Created successfully',
    });
  });
};

exports.updateVendor = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  service.update(id, data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Database connection error',
      });
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

exports.deleteVendor = (req, res) => {
  const data = req.params.id;
  service.delete(data, (err, results) => {
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

    res.redirect('/vendor_list');
    // return res.status(200).json({
    //   success: 1,
    //   message: 'Deleted successfully',
    // });
  });
};

exports.getVendorById = (req, res) => {
  const vendorId = req.params.id;
  service.getById(vendorId, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

exports.getAllVendorsById = (req, res) => {
  const org_id = req.query.org;
  service.getAllById(org_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: 'Records Not Found',
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};
