const router = require("express").Router();
const controller = require('./owner.controller');

router.post('/', controller.createOwner)
router.patch('/', controller.updateOwner)
router.delete('/', controller.deleteOwner)
router.get('/:id', controller.getOwnerById)


module.exports = router