/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const distributorMasterModel = require('../v2models/distributorMasterModel');

module.exports = {
  createDistributor: async (data) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.createDistributor(connection, data);
    });
  },

  updateDistributor: async (data, distributorId) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.updateDistributor(connection, data, distributorId);
    });
  },

  deleteDistributor: async (distributorId) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.deleteDistributor(connection, distributorId);
    });
  },

  getAllDistributorsById: async (orgId) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.getAllDistributorsById(connection, orgId);
    });
  },

  getDistributorById: async (distributorId) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.getDistributorById(connection, distributorId);
    });
  },

  checkGstinByOrgId: async (orgId, gstin) => {
    return executeTransaction(async (connection) => {
      return distributorMasterModel.checkGstinByOrgId(connection, orgId, gstin);
    });
  },
};
