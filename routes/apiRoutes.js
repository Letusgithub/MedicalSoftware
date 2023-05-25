const express = require("express");
const router = express.Router();

const orgRouter = require('../api/users/organisation/org.router');
const ownerRouter = require('../api/users/owner/owner.router');
const empRouter = require('../api/users/employee/emp.router');
const referRouter = require ('../api/users/reference/refer.router');




router.use('/org', orgRouter)
router.use('/owner', ownerRouter)
router.use('/emp', empRouter)
router.use('/refer', referRouter)







module.exports = router;