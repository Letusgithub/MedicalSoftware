/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');
const inventoryModel = require('../v2models/inventoryModel');

module.exports = {
  createBatch: async (batchData) => {
    return executeTransaction(async (connection) => {
      return batchModel.createBatch(connection, batchData);
    });
  },

  deleteBatch: async (batchId) => {
    return executeTransaction(async (connection) => {
      return batchModel.deleteBatch(connection, batchId);
    });
  },

  getProductInventory: async (orgId, productId) => {
    return executeTransaction(async (connection) => {
      const results = await inventoryModel.getProductInventoryByOrgId(connection, productId, orgId);

      if (results.length === 0) {
        throw new Error('Product inventory not found');
      }
      // eslint-disable-next-line max-len
      const batches = await batchModel.getBatchesByInventoryId(connection, results[0].inventory_id);
      return {
        ...results[0],
        batches,
      };
    });
  },
};
