import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';
import InstallmentsPage from './components/pages/InstallmentsPage';
import Installments from './components/transactions/Installment';
import NewTransaction from './components/transactions/NewTransaction';
import Register from './components/pages/RegisterPage'
import TransactionDetails from './components/transactions/TransactionDetails';
import ClientList from './components/pages/list/ClientList';
import ClientDetails from './components/pages/list/details/ClientDetails';
import CityList from './components/pages/list/CityList';
import CityDetails from './components/pages/list/details/CityDetails';
import CompanyList from './components/pages/list/CompanyList';
import EmployeeList from './components/pages/list/EmployeeList';
import WorkList from './components/pages/list/WorkList';
import CompanyDetails from './components/pages/list/details/CompanyDetails';
import EmployeeDetails from './components/pages/list/details/EmployeeDetails';
import WorkDetails from './components/pages/list/details/WorkDetails';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/transaction' Component={TransactionPage} />
                <Route path='/new-transaction' Component={NewTransaction} />
                <Route path='/transaction-details' Component={TransactionDetails} />
                <Route path='/installments' Component={InstallmentsPage} />
                <Route path='/installment-details' Component={Installments} />
                <Route path='/register' Component={Register} />

                <Route path='/clients' Component={ClientList} />
                <Route path="/edit-client/:id" element={<ClientDetails isEditing={true} />} />
                <Route path='/cities' Component={CityList} />
                <Route path="/edit-city/:id" element={<CityDetails isEditing={true} />} />
                <Route path='/companies' Component={CompanyList} />
                <Route path="/edit-company/:id" element={<CompanyDetails isEditing={true} />} />
                <Route path='/employees' Component={EmployeeList} />
                <Route path="/edit-employee/:id" element={<EmployeeDetails isEditing={true} />} />
                <Route path='/works' Component={WorkList} />
                <Route path="/edit-work/:id" element={<WorkDetails isEditing={true} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;