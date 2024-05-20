const express = require('express');
const router = express.Router();
const purchasesInstallmentsController = require('../controllers/purchasesInstallmentsController');

router.get('/', purchasesInstallmentsController.getAllPurchasesInstallments);
router.get('/:id', purchasesInstallmentsController.getPurchasesInstallmentById);
router.post('/', purchasesInstallmentsController.createPurchasesInstallment);
router.put('/:id', purchasesInstallmentsController.updatePurchasesInstallment);

module.exports = router;