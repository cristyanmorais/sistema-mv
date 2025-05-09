import express from 'express';
import salesRoutes from './salesRoutes';
import worksRoutes from './worksRoutes';
import companiesRoutes from './companiesRoutes';
import clientsRoutes from './clientsRoutes';
import providedServicesRoutes from './providedServicesRoutes';
import employeesRoutes from './employeesRoutes';
import contractedServicesRoutes from './contractedServicesRoutes';
import payrollRoutes from './payrollRoutes';
import taxesRoutes from './taxesRoutes';
import taxesTypeRoutes from './taxesTypeRoutes';
import installmentsRoutes from './installmentsRoutes';
import cashRegisterRoutes from './cashRegisterRoutes';
import addressesRoutes from './addressesRoutes';
import citiesRoutes from './citiesRoutes';
import districtsRoutes from './districtsRoutes';

const router = express.Router();

// Definindo as rotas
router.use('/sales', salesRoutes);
router.use('/works', worksRoutes);
router.use('/companies', companiesRoutes);
router.use('/clients', clientsRoutes);
router.use('/provided-services', providedServicesRoutes);
router.use('/employees', employeesRoutes);
router.use('/contracted-services', contractedServicesRoutes);
router.use('/payroll', payrollRoutes);
router.use('/taxes', taxesRoutes);
router.use('/taxes-type', taxesTypeRoutes);
router.use('/installments', installmentsRoutes);
router.use('/cash-register', cashRegisterRoutes);
router.use('/addresses', addressesRoutes);
router.use('/cities', citiesRoutes);
router.use('/districts', districtsRoutes);

export default router;