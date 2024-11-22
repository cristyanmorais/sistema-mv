const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.getAllPayrolls);
router.get('/:id', payrollController.getPayrollById);
router.post('/', payrollController.createPayroll);
router.put('/:id', payrollController.updatePayroll);
router.put('/:id/paid', payrollController.updatePayrollPaid);

module.exports = router;