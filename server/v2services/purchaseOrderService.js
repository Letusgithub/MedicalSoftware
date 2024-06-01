/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const organisationModel = require('../v2models/organisationModel');
const purchaseOrderItemModel = require('../v2models/purchaseOrderItemModel');
const purchaseOrderModel = require('../v2models/purchaseOrderModel');

module.exports = {
  createPurchaseOrder: async (data) => {
    return executeTransaction(async (connection) => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      const purchaseOrderDate = day + month + year;

      // Generate purchase order number
      const pharmacyId = await organisationModel.getPharmacyId(connection, data.orgId);
      const totalResults = await purchaseOrderModel.getPurchaseOrderCount(connection);
      const purchaseOrderNo = `${pharmacyId[0].org_id_main}PO${purchaseOrderDate}${totalResults[0].total_rows + 1}`;

      // Create purchase order
      await purchaseOrderModel.createPurchaseOrder(connection, data, purchaseOrderNo);

      // Create purchase order items
      const purchaseOrderItems = data.purchaseOrderItems;

      await Promise.all(
        purchaseOrderItems.map(async (item) => {
          purchaseOrderItemModel.createPurchaseOrderItem(connection, item, purchaseOrderNo);
        }),
      );

      return purchaseOrderNo;
    });
  },
};
