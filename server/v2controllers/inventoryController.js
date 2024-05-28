/* eslint-disable max-len */
const inventoryService = require('../v2services/inventoryService');

module.exports = {
  createBatch: async (req, res) => {
    const batchData = req.body;
    try {
      await inventoryService.createBatch(batchData);
      res.status(201).json({
        success: true,
        message: 'Batch created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  deleteBatch: async (req, res) => {
    const batchId = req.params.batchId;
    try {
      const affectedRows = await inventoryService.deleteBatch(batchId);
      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Batch not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Batch deleted successfully',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  updateInventory: async (req, res) => {
    const orgId = req.query.orgId;
    const productId = req.query.productId;
    const data = req.body;
    try {
      const affectedRows = await inventoryService.updateInventory(data, productId, orgId);
      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Inventory not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Inventory updated successfully',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  deleteInventory: async (req, res) => {
    const inventoryId = req.params.inventoryId;
    try {
      const affectedRows = await inventoryService.deleteInventory(inventoryId);
      if (affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Inventory not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Inventory deleted successfully',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getProductInventory: async (req, res) => {
    const orgId = req.query.orgId;
    const productId = req.query.productId;
    try {
      const productInventory = await inventoryService.getProductInventory(orgId, productId);
      res.status(200).json({
        success: true,
        message: 'Product inventory retrieved successfully',
        data: productInventory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getInventory: async (req, res) => {
    const orgId = req.query.orgID;
    try {
      const inventoryData = await inventoryService.getInventory(orgId);
      res.status(200).json({
        success: true,
        data: inventoryData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getNearExpiryProducts: async (req, res) => {
    const orgId = req.params.id;
    const filter = req.params.filter;
    try {
      const nearExpiryProducts = await inventoryService.getNearExpiryProducts(orgId, filter);
      res.status(200).json({
        success: true,
        data: nearExpiryProducts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  onboardProductInventory: async (req, res) => {
    const orgId = req.query.orgId;
    const data = req.body;
    try {
      await inventoryService.onboardProductInventory(data, orgId);
      res.status(201).json({
        success: true,
        message: 'Product inventory onboarded successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
