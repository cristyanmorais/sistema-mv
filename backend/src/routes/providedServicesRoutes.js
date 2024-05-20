const express = require('express');
const router = express.Router();
const providedServicesController = require('../controllers/providedServicesController');

router.get('/', providedServicesController.getAllProvidedServices);
router.get('/:id', providedServicesController.getProvidedServiceById);
router.post('/', providedServicesController.createProvidedService);
router.put('/:id', providedServicesController.updateProvidedService);

module.exports = router;