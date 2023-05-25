const router = require("express").Router();
const controller = require('./emp.controller');

router.post('/', controller.createEmp);
router.patch('/', controller.updateEmp);
router.delete('/', controller.deleteEmp);
router.get('/:id',controller.getEmpById);
router.get('/all/:id', controller.getAllEmpsById);


module.exports = router;