const express = require('express');
const router = express.Router();
const installmentsController = require('../controllers/installmentsController');

router.get('/', installmentsController.getAllInstallments);
router.get('/next', installmentsController.getNextInstallment);
router.get('/:id', installmentsController.getInstallmentById);
router.get('/amount/a', installmentsController.getTransactionValue);
router.post('/', installmentsController.createInstallment);
router.put('/:id', installmentsController.updateInstallment);

module.exports = router;