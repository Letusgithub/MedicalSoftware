/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');
const inventoryModel = require('../v2models/inventoryModel');
const organisationModel = require('../v2models/organisationModel');
const productMasterModel = require('../v2models/productMasterModel');
const purchaseEntryItemModel = require('../v2models/purchaseEntryItemModel');
const purchaseEntryModel = require('../v2models/purchaseEntryModel');

module.exports = {
  purchaseEntry: async (data) => {
    return executeTransaction(async (connection) => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      const returnDate = day + month + year;

      // Create purchase entry --> grnInvoiceNo
      const pharmacyId = await organisationModel.getPharmacyId(connection, data.orgId);
      const totalResults = await purchaseEntryModel.getPurchaseEntryCount(connection);
      const grnInvoiceNo = `${pharmacyId[0].org_id_main}GRN${returnDate}${totalResults[0].total_rows + 1}`;

      // Create purchase entry
      await purchaseEntryModel.createPurchaseEntry(connection, data, grnInvoiceNo);

      // Create purchase entry items
      const purchaseItems = data.purchaseItems;

      Promise.all(
        purchaseItems.map(async (item) => {
          const productData = {
            productId: item.productId,
            medName: item.medName,
            mfdMkt: item.mfdMkt,
            salt: item.salt,
          };
          const inventoryData = {
            inventoryId: item.inventoryId,
            categoryId: item.categoryId,
            primaryUnit: item.primaryUnit,
            secondaryUnit: item.secondaryUnit,
            hsn: item.hsn,
            gst: item.gst,
            threshold: item.threshold,
          };
          const batchData = {
            grnId: grnInvoiceNo,
            vendorId: data.vendorId,
            batchName: item.batchName,
            expDate: item.expDate,
            conversion: item.conversion,
            shelfLabel: item.shelfLabel,
            mrp: item.mrp,
            ptr: item.ptr,
            quantity: item.quantity,
            free: item.free,
            bulkDiscount: item.bulkDiscount,
            basePrice: item.basePrice,
          };

          if (!productData.productId) {
            // eslint-disable-next-line max-len
            const productId = await productMasterModel.createProductMYSQL(connection, productData, data.orgId);
            await productMasterModel.createProductES(productData, productId, data.orgId);
            productData.productId = productId;
          }

          if (!inventoryData.inventoryId) {
            // eslint-disable-next-line max-len
            const inventoryId = await inventoryModel.createInventory(connection, inventoryData, productData.productId, data.orgId);
            inventoryData.inventoryId = inventoryId;
          }

          await Promise.all([
            // eslint-disable-next-line max-len
            batchModel.createBatch(connection, batchData, productData.productId, inventoryData.inventoryId, data.orgId),
            // eslint-disable-next-line max-len
            purchaseEntryItemModel.createPurchaseEntryItem(connection, item, productData.productId, grnInvoiceNo),
          ]);
        }),
      );

      return grnInvoiceNo;
    });
  },
};
