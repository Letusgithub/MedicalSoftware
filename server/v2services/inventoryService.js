/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');
const inventoryModel = require('../v2models/inventoryModel');
const expiryInventoryRepository = require('../v2repositories/expiryInventoryRepository');

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

  updateInventory: async (data, productId, orgId) => {
    return executeTransaction(async (connection) => {
      return inventoryModel.updateInventory(connection, data, productId, orgId);
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

  getInventory: async (orgId) => {
    return executeTransaction(async (connection) => {
      const results = await inventoryModel.getInventoryByOrgId(connection, orgId);
      return results;
    });
  },

  getNearExpiryProducts: async (orgId, filter) => {
    return executeTransaction(async (connection) => {
      let fromDate;
      let toDate;

      if (filter === 'next3Month') {
        fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() + 1);
        fromDate.setDate(1);

        toDate = new Date();
        toDate.setMonth(fromDate.getMonth() + 3);
        toDate.setDate(1);
        toDate.setDate(toDate.getDate() - 1);
      } else if (filter === 'last3Month') {
        fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3);
        fromDate.setDate(1);

        toDate = new Date();
        toDate.setMonth(toDate.getMonth() - 1);
        toDate.setDate(1);
        toDate.setDate(toDate.getDate() - 1);
      } else if (filter === 'thisMonth') {
        fromDate = new Date();
        fromDate.setDate(1);

        toDate = new Date();
        toDate.setMonth(fromDate.getMonth() + 1);
        toDate.setDate(1);
        toDate.setDate(toDate.getDate() - 1);
      }

      // eslint-disable-next-line max-len
      const results = await expiryInventoryRepository.getNearExpiryProducts(connection, orgId, fromDate, toDate);
      return results;
    });
  },
};
