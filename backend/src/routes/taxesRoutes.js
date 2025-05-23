const express = require('express');
const router = express.Router();
const taxesController = require('../controllers/taxesController');

router.get('/', taxesController.getAllTaxes);
router.get('/:id', taxesController.getTaxById);
router.post('/', taxesController.createTax);
router.put('/:id', taxesController.updateTax);
router.put('/:id/paid', taxesController.updateTaxPaid);

module.exports = router;