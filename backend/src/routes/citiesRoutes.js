const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

router.get('/', citiesController.getAllCities);
router.get('/:id', citiesController.getCityById);
router.post('/', citiesController.createCity);
router.put('/:id', citiesController.updateCity);
router.put('/:id/delete', citiesController.deleteCity);

module.exports = router;