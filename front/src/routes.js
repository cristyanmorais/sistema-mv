import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/transaction' Component={TransactionPage} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;