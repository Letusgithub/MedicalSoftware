const router = require("express").Router();
const controller = require('./refer.controller');

router.post('/', controller.createRefer);
router.patch('/', controller.updateRefer);
router.delete('/', controller.deleteRefer);
router.get('/:id',controller.getReferById);
router.get('/all/:id', controller.getAllRefersById);


module.exports = router;