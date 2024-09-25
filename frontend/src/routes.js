import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';
import InstallmentsPage from './components/pages/InstallmentsPage';
import Installments from './components/transactions/Installment';
import NewTransaction from './components/transactions/NewTransaction';
import Register from './components/pages/RegisterPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/transaction' Component={TransactionPage} />
                <Route path='/new-transaction' Component={NewTransaction} />
                {/* <Route path='/transaction-details' Component={} /> */}
                <Route path='/installments' Component={InstallmentsPage} />
                <Route path='/installment-details' Component={Installments} />
                <Route path='/register' Component={Register} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;