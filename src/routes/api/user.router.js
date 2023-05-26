const router = require("express").Router();

const {createOwner, updateOwner, deleteOwner, getOwnerById} = require('../../controllers/owner.controller');
const { createEmp, updateEmp, deleteEmp, getEmpById, getAllEmpsById } = require('../../controllers/emp.controller');
const {createRefer} = require('../../controllers/refer.controller');
const {updateOrg, deleteOrg, getOrgById} = require('../../controllers/org.controller')


//Organisation routes
router.patch('/', updateOrg);
router.delete('/', deleteOrg); 
router.get('/:id', getOrgById);


// Owner routes
router.post('/', createOwner)
router.patch('/', updateOwner)
router.delete('/', deleteOwner)
router.get('/:id', getOwnerById)


// Employee routes
router.post('/', createEmp);
router.patch('/', updateEmp);
router.delete('/', deleteEmp);
router.get('/:id', getEmpById);
router.get('/all/:id', getAllEmpsById);

// Reference routes
router.post('/', createRefer);




module.exports = router;