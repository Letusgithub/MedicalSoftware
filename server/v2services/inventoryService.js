const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');

module.exports = {
  createBatch: async (batchData) => {
    await executeTransaction(async (connection) => {
      await batchModel.createBatch(connection, batchData);
    });
  },

  deleteBatch: async (batchId) => {
    await executeTransaction(async (connection) => {
      await batchModel.deleteBatch(connection, batchId);
    });
  },

};
