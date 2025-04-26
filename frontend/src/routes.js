import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Páginas principais
import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';
import InstallmentsPage from './components/pages/InstallmentsPage';
import Installments from './components/transactions/Installment';
import NewTransaction from './components/transactions/NewTransaction';
import TransactionDetails from './components/transactions/TransactionDetails';

// Listas
import ClientList from './components/lists/ClientList';
import CityList from './components/lists/CityList';
import CompanyList from './components/lists/CompanyList';
import EmployeeList from './components/lists/EmployeeList';
import WorkList from './components/lists/WorkList';
import ContractedServiceList from './components/lists/ContractedServiceList';
import PayrollList from './components/lists/PayrollList';
import ProvidedServiceList from './components/lists/ProvidedServiceList';
import PurchaseList from './components/lists/PurchaseList';
import SaleList from './components/lists/SaleList';
import TaxList from './components/lists/TaxList';

// Detalhes
import ClientCreate from './components/pages/ClientCreate';
import ClientEdit from './components/pages/ClientEdit';
import CityCreate from './components/pages/CityCreate';
import CityEdit from './components/pages/CityEdit';
import CompanyCreate from './components/pages/CompanyCreate';
import CompanyEdit from './components/pages/CompanyEdit';
import EmployeeCreate from './components/pages/EmployeeCreate';
import EmployeeEdit from './components/pages/EmployeeEdit';
import WorkCreate from './components/pages/WorkCreate';
import WorkEdit from './components/pages/WorkEdit';
import CreateContractedService from './components/pages/CreateContractedService';
import EditContractedService from './components/pages/EditContractedService';
import CreatePayroll from './components/pages/CreatePayroll';
import EditPayroll from './components/pages/EditPayroll';
import CreateProvidedService from './components/pages/CreateProvidedService';
import EditProvidedService from './components/pages/EditProvidedService';
import CreatePurchase from './components/pages/CreatePurchase';
import EditPurchase from './components/pages/EditPurchase';
import CreateSale from './components/pages/CreateSale';
import EditSale from './components/pages/EditSale';
import CreateTax from './components/pages/CreateTax';
import EditTax from './components/pages/EditTax';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas principais */}
                <Route path='/' Component={HomePage} />
                <Route path='/transaction' Component={TransactionPage} />
                <Route path='/new-transaction' Component={NewTransaction} />
                <Route path='/transaction-details' Component={TransactionDetails} />
                <Route path='/installments' Component={InstallmentsPage} />
                <Route path='/installment-details' Component={Installments} />

                {/* Rotas de CRUD para entidades fixas */}
                <Route path='/cities' Component={CityList} />
                <Route path='/cities/create' element={<CityCreate />} />
                <Route path='/cities/edit/:id' element={<CityEdit />} />

                <Route path='/clients' Component={ClientList} />
                <Route path='/clients/create' element={<ClientCreate />} />
                <Route path='/clients/edit/:id' element={<ClientEdit />} />

                <Route path='/companies' Component={CompanyList} />
                <Route path='/companies/create' element={<CompanyCreate />} />
                <Route path='/companies/edit/:id' element={<CompanyEdit />} />

                <Route path='/employees' Component={EmployeeList} />
                <Route path='/employees/create' element={<EmployeeCreate />} />
                <Route path='/employees/edit/:id' element={<EmployeeEdit />} />

                <Route path='/works' Component={WorkList} />
                <Route path='/works/create' element={<WorkCreate />} />
                <Route path='/works/edit/:id' element={<WorkEdit />} />

                {/* Rotas de CRUD para transações */}
                <Route path='/contracted-services' Component={ContractedServiceList} />
                <Route path='/contracted-services/create' element={<CreateContractedService />} />
                <Route path='/contracted-services/edit/:id' element={<EditContractedService />} />

                <Route path='/payroll' Component={PayrollList} />
                <Route path='/payroll/create' element={<CreatePayroll />} />
                <Route path='/payroll/edit/:id' element={<EditPayroll />} />

                <Route path='/provided-services' Component={ProvidedServiceList} />
                <Route path='/provided-services/create' element={<CreateProvidedService />} />
                <Route path='/provided-services/edit/:id' element={<EditProvidedService />} />

                <Route path='/purchases' Component={PurchaseList} />
                <Route path='/purchases/create' element={<CreatePurchase />} />
                <Route path='/purchases/edit/:id' element={<EditPurchase />} />

                <Route path='/sales' Component={SaleList} />
                <Route path='/sales/create' element={<CreateSale />} />
                <Route path='/sales/edit/:id' element={<EditSale />} />

                <Route path='/taxes' Component={TaxList} />
                <Route path='/taxes/create' element={<CreateTax />} />
                <Route path='/taxes/edit/:id' element={<EditTax />} />

            </Routes>
        </BrowserRouter>
    );
};

export default Router;