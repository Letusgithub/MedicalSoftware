/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const ExcelJS = require('exceljs');
const service = require('../services/inventory.service');
const mailer = require('../utils/mailer.util');

exports.createInventory = (req, res) => {
  const data = req.body;
  console.log(data);
  // Check if product already exists in Inventory
  service.checkById(data.product_id, data.org_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length > 0) {
      console.log('product already exists');
      return res.status(200).json({
        success: 0,
        message: 'Product already exists in Inventory',
      });
    }
    service.create(data, (createErr, createResults) => {
      if (createErr) {
        console.log(createErr);
        return res.status(500).json({
          success: 0,
          message: 'Database connection error',
        });
      }

      return res.status(200).json({
        success: 1,
        data: createResults,
      });
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
};
exports.checkById = (req, res) => {
  const productId = req.query.product;
  const orgId = req.query.org;
  service.checkById(productId, orgId, (err, results) => {
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

exports.createNearExpiryReportById = (req, res) => {
  const orgId = req.params.id;
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 90);

  service.getNearExpiryProducts(orgId, currentDate, futureDate, (err, results) => {
    if (err) {
      console.log(err);
    }

    return res.json({
      success: 1,
      data: results,
    });
  });
};

exports.createAllNearExpiryReports = () => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 3);

  service.getAllOrgEmailOrgId((orgErr, orgResults) => {
    if (orgErr) {
      console.log(orgErr);
    }
    orgResults.forEach((org) => {
      const orgId = org.org_id;
      service.getNearExpiryForNotification(orgId, currentDate, futureDate, (err, results) => {
        if (err) {
          console.log(err);
        }
        const orgEmail = org.org_email;

        if (results.length > 0) {
          // Create workbook and worksheet
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Near Expiry Products');

          // Add headers
          const headers = Object.keys(results[0]);
          worksheet.addRow(headers);

          // Add data rows
          results.forEach((row) => {
            worksheet.addRow(Object.values(row));
          });

          // Generate Excel file
          const excelFileName = 'near_expiry_products.xlsx';
          workbook.xlsx.writeFile(excelFileName)
            .then(() => {
              // Send email with attachment
              mailer.sendAttachmentEmail(orgEmail, excelFileName);
            });
        }
      });
    });
  });
};
