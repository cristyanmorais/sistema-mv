import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';
import InstallmentsPage from './components/pages/InstallmentsPage';
import Installments from './components/transactions/Installment';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/transaction' Component={TransactionPage} />
                <Route path='/installments' Component={InstallmentsPage} />
                <Route path='/installment-details' Component={Installments} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;