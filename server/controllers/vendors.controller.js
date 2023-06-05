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

    res.redirect('/vendor_list');
    // return res.status(200).json({
    //   success: 1,
    //   data: results,
    // });
  });
};

exports.updateVendor = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  service.update(id, data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/vendor_list');
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
  const data = req.params.id;
  service.getById(vendor_id, (err, results) => {
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
      data: results,
    });
  });
};

exports.getAllVendorsById = (req, res) => {
  const org_id = req.params.id;
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
