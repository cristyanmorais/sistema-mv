const express = require('express');
const router = express.Router();
const contractedServicesController = require('../controllers/contractedServicesController');

router.get('/', contractedServicesController.getAllContractedServices);
router.get('/:id', contractedServicesController.getContractedServiceById);
router.post('/', contractedServicesController.createContractedService);
router.put('/:id', contractedServicesController.updateContractedService);

module.exports = router;