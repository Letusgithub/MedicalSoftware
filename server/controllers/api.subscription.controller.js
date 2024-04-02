const service = require('../services/subscription.service');

module.exports = {
  subscribeToPlan: (req, res) => {
    const planId = req.query.planId;
    const orgId = req.query.orgId;
    service.fetchPlanById(planId, (planErr, planResults) => {
      if (planErr) {
        return res.json({
          success: 0,
          message: 'Error fetching plan',
        });
      }
      const duration = parseFloat(planResults[0].duration);
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + duration);
      console.log(start, end);
      service.subscribeToPlan(orgId, planId, start, end, (error) => {
        if (error) {
          return res.json({
            success: 0,
            message: 'Error subscribing to plan',
          });
        }
        return res.json({
          success: 1,
          message: 'Successfully subscribed to plan',
        });
      });
    });
  },

  fetchAllPlans: (req, res) => {
    service.fetchAllPlans((error, results) => {
      if (error) {
        return res.json({
          success: 0,
          message: 'Error fetching plans',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getCurrentPlanDetails: (req, res) => {
    const orgId = req.params.id;
    service.getCurrentPlanDetails(orgId, (error, results) => {
      if (error) {
        return res.json({
          success: 0,
          message: 'Error fetching current plan details',
        });
      }
      console.log(results);
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
