const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);

module.exports = router;