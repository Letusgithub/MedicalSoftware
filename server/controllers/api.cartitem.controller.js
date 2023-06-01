const { create } = require('../services/cartitem.service');

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
      res.send({ results });
    });
  },
};
