const express = require("express");
const router = express.Router();

const orgRouter = require('./api/user.router');
const ownerRouter = require('./api/user.router');
const empRouter = require('./api/user.router');
const referRouter = require ('./api/user.router');




router.use('/org', orgRouter)
router.use('/owner', ownerRouter)
router.use('/emp', empRouter)
router.use('/refer', referRouter)





module.exports = router;