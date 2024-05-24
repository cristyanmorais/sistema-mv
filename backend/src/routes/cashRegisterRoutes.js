const express = require('express');
const router = express.Router();
const cashRegisterController = require('../controllers/cashRegisterController');

router.get('/', cashRegisterController.getAllCashRegisters);
router.get('/:id', cashRegisterController.getCashRegisterById);
router.post('/', cashRegisterController.createCashRegister);
router.put('/:id', cashRegisterController.updateCashRegister);

module.exports = router;