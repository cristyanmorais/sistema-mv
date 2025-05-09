import express from 'express';
import * as cashRegisterController from '../controllers/cashRegisterController';

const router = express.Router();

router.get('/', cashRegisterController.getAllCashRegisters);
router.get('/transactions', cashRegisterController.getCashRegisterTransactions);
router.get('/:id', cashRegisterController.getCashRegisterById);
router.post('/', cashRegisterController.createCashRegister);
router.put('/:id', cashRegisterController.updateCashRegister);

export default router;