const service = require('../services/product.service');

exports.createProduct = (req, res) => {
  const data = req.body;
  service.create(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: 'Database connection error',
      });
    }

    res.redirect('/product_stock');
  });
};

exports.updateProduct = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  service.update(id, data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/product_stock');
  });
};

exports.deleteProduct = (req, res) => {
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

    res.redirect('/product_stock');
  });
};

exports.getProductById = (req, res) => {
  const product_id = req.params.id;
  service.getById(product_id, (err, results) => {
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

exports.getAllProductsById = (req, res) => {
  const product_id = req.params.id;
  service.getAllById(product_id, (err, results) => {
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
