const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController');

router.get('/', purchasesController.getAllPurchases);
router.get('/:id', purchasesController.getPurchaseById);
router.post('/', purchasesController.createPurchase);
router.put('/:id', purchasesController.updatePurchase);
router.put('/:id/paid', purchasesController.updatePurchasePaid);

module.exports = router;