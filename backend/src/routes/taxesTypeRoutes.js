const express = require('express');
const router = express.Router();
const taxesTypeController = require('../controllers/taxesTypeController');

router.get('/', taxesTypeController.getAllTaxesTypes);
router.get('/:id', taxesTypeController.getTaxesTypeById);

module.exports = router;