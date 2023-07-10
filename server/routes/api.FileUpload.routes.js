const {StoreFile,Upload_Inventory, Upload_batch, Download_Template} = require('../services/FileUpload.service');

module.exports = (app) => {
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
      );
      next();
    });

app.get("/add_product/download",Download_Template);
app.post("/add_product",StoreFile, Upload_Inventory, Upload_batch);
};


