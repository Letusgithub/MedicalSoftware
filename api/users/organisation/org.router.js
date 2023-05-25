const router = require("express").Router();
const controller = require('./org.controller');

router.post('/', controller.createOrg);
router.patch('/', controller.updateOrg);
router.delete('/', controller.deleteOrg); 
router.get('/', controller.getAllOrgs);
router.get('/:id', controller.getOrgById);



module.exports = router;