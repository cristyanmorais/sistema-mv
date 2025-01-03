const express = require('express');
const router = express.Router();

// Importação e definindo o path das rotas
const salesRoutes = require('./salesRoutes');
router.use('/sales', salesRoutes);

const worksRoutes = require('./worksRoutes');
router.use('/works', worksRoutes);

const companiesRoutes = require('./companiesRoutes');
router.use('/companies', companiesRoutes);

const purchasesRoutes = require('./purchasesRoutes');
router.use('/purchases', purchasesRoutes);

const clientsRoutes = require('./clientsRoutes');
router.use('/clients', clientsRoutes);

const providedServicesRoutes = require('./providedServicesRoutes');
router.use('/provided-services', providedServicesRoutes);

const employeesRoutes = require('./employeesRoutes');
router.use('/employees', employeesRoutes);

const contractedServicesRoutes = require('./contractedServicesRoutes');
router.use('/contracted-services', contractedServicesRoutes);

const payrollRoutes = require('./payrollRoutes');
router.use('/payroll', payrollRoutes);

const taxesRoutes = require('./taxesRoutes');
router.use('/taxes', taxesRoutes);

const taxesTypeRoutes = require('./taxesTypeRoutes');
router.use('/taxes-type', taxesTypeRoutes);

const installmentsRoutes = require('./installmentsRoutes');
router.use('/installments', installmentsRoutes);

const cashRegisterRoutes = require('./cashRegisterRoutes');
router.use('/cash-register', cashRegisterRoutes);

const addressesRoutes = require('./addressesRoutes');
router.use('/addresses', addressesRoutes);

const citiesRoutes = require('./citiesRoutes');
router.use('/cities', citiesRoutes);

const districtsRoutes = require('./districtsRoutes');
router.use('/districts', districtsRoutes);

module.exports = router;