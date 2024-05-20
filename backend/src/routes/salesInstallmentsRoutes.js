const express = require('express');
const router = express.Router();
const salesInstallmentsController = require('../controllers/salesInstallmentsController');

router.get('/', salesInstallmentsController.getAllSalesInstallments);
router.get('/:id', salesInstallmentsController.getSalesInstallmentById);
router.post('/', salesInstallmentsController.createSalesInstallment);
router.put('/:id', salesInstallmentsController.updateSalesInstallment);

module.exports = router;