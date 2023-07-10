/* eslint-disable no-unused-vars */
/*eslint-disable camelcase */

const {getPool} = require('../config/database');
const csvParser = require('csv-parser');
const fs = require('fs')
const path = require('path')
const multer = require('multer');
const { nextTick } = require('process');


module.exports = {
    StoreFile: (req,res,next) => {
        const storage = multer.diskStorage({
            destination: (req,file,cb)=> {
              cb(null,'file_upload')
            },
            filename: (req,file,cb)=>{
              console.log(file)
              cb(null, Date.now() + path.extname(file.originalname))
            }
              
          });
          const upload = multer({storage: storage}).single('file');
          upload(req, res, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error uploading file');
            }
            next();
            
          });
        

    },
    
    Upload_Inventory: (req,res,next)=>{
        const csvFilePath = req.file.path;
        const results = [];
        fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => {
          const productId = data.product_id;
          const OrgId = data.org_id;
          const Hsn = data.hsn;
          const Gst = data.gst;
          const PrimaryUnit = data.primary_unit;
          const SecondaryUnit = data.secondary_unit;
          const Threshold = data.threshold;
          results.push({productId,OrgId,PrimaryUnit,SecondaryUnit,Hsn,Gst,Threshold});
        })
          
        .on('end', () => {
      
      const query = `insert into inventory(product_id, org_id, primary_unit, secondary_unit, hsn, gst, threshold) values (?)`;
      const values = results.map(({productId,OrgId,PrimaryUnit,SecondaryUnit,Hsn,Gst,Threshold}) => [productId,OrgId,PrimaryUnit,SecondaryUnit,Hsn,Gst,Threshold]);
      getPool().query(query, values, (error, results, fields) => {
      if (error) {
          console.log('Error inserting data into MySQL:', error);
          return res.status(500).send('Error inserting data into MySQL');
        }
      next();
    });
    });
    console.log('Data inserted into MySQL successfully');
},
Upload_batch: (req,res,next)=>{
  const csvFilePath = req.file.path;
  const results = [];
  fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (data) => {
    const productId = data.product_id;
    const OrgId = data.org_id;
    const BatchName = data.batch_name;
    const ExpDate = data.exp_date;
    const Conversion = data.conversion;
    const BatchQty = data.batch_qty;
    const PurchaseRate = data.purchase_rate;
    const Mrp = data.mrp;
    const ShelfLabel = data.shelf_label;
    results.push({productId,OrgId,BatchName,ExpDate,Conversion,BatchQty,PurchaseRate,Mrp,ShelfLabel});
  })
    
  .on('end', () => {

const query = `insert into batch(product_id,org_id,batch_name,exp_date,conversion,batch_qty,purchase_rate,mrp,shelf_label) values(?)`;
const values = results.map(({productId,OrgId,BatchName,ExpDate,Conversion,BatchQty,PurchaseRate,Mrp,ShelfLabel}) => [productId,OrgId,BatchName,ExpDate,Conversion,BatchQty,PurchaseRate,Mrp,ShelfLabel]);
getPool().query(query, values, (error, results, fields) => {
if (error) {
    console.log('Error inserting data into MySQL:', error);
    return res.status(500).send('Error inserting data into MySQL');
  }
  next(); 
  
});

});
console.log('Data inserted into MySQL successfully');
return res.status(200).send('<h3>File Uploaded Sucessfully</h3>');

},
Download_Template: (req,res) => {
  const file = fs.readFileSync('CSV_Template/DataUpload.csv');
  res.setHeader('Content-Disposition', 'attachment; filename="CSVTemplate.csv"');
  res.setHeader('Content-Type', 'text/csv');
  res.send(file);
  
 }};





