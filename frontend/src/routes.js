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
            </Routes>
        </BrowserRouter>
    );
};

export default Router;