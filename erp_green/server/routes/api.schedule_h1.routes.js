const controller = require("../controllers/api.product.controller");
const { checkAuth } = require("../middlewares/checkAuth");
const { fetchOrgId } = require("../middlewares/fetchOrgId");
const service = require("../services/schedule_h1.service");

module.exports = async (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/schedule_h1", checkAuth, fetchOrgId, (req, res) => {
    res.render("Inventory/schedule_h1_report", {
      orgId: req.org_id,
      orgName: req.org_name,
      ownerName: req.owner_name,
    });
  });

  app.get("/api/schedule_h1", checkAuth, fetchOrgId, service.scheduleH1);
};
