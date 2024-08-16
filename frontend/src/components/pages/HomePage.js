import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";
import { getFormattedDate } from "../Functions";

const Body = styled.div`
    
`

const HomePage = () => {
    const [balance, setBalance] = useState(0);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [nextInstallment, setNextInstallment] = useState([]);

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
        fetchNextInstallment();
    }, []);

    const fetchBalance = () => {
        axios.get('http://localhost:3000/api/cash-register')
        .then(response => setBalance(response.data[0].balance))
        .catch(error => console.error('Error: ', error));
    }

    const fetchTransactions = () => {
        axios.get('http://localhost:3000/api/cash-register/transactions')
        .then(response => {
            setPositive(response.data.positive);
            setNegative(response.data.negative);
        })
        .catch(error => console.error('Error: ', error));
    }

    const fetchNextInstallment = () => {
        axios.get('http://localhost:3000/api/installments/next')
        .then(response => setNextInstallment(response.data))
        .catch(error => console.error('Error: ', error));
    }

    return (
        <Layout>
            <Body>
                <p>homepage</p>
                <p>Saldo: {balance}</p>
                <p>Entradas: {positive}</p>
                <p>Saídas: {negative}</p>
                <p>Próxima Parcela: {nextInstallment.due_date ? getFormattedDate(nextInstallment.due_date) : null}</p>
            </Body>
        </Layout>
    );
}

export default HomePage;