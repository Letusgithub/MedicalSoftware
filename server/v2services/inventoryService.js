/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');

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

  getInventoryBatches: async (orgId, productId) => {
    await executeTransaction(async (connection) => {
      await batchModel.getInventoryBatches(connection, orgId, productId);
    });
  },
};
