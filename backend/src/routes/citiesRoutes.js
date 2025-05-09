import express from 'express';
import * as citiesController from '../controllers/citiesController';

const router = express.Router();

router.get('/', citiesController.getAllCities);
router.get('/:id', citiesController.getCityById);
router.post('/', citiesController.createCity);
router.put('/:id', citiesController.updateCity);
router.delete('/:id', citiesController.deleteCity);

export default router;