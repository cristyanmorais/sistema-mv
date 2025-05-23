import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";
import { getFormattedDate } from "../Functions";
import { Card, InstCard } from "../VisualComponents";
import { useNavigate } from "react-router-dom";

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const HomePage = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const [balance, setBalance] = useState(0);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [nextInstallment, setNextInstallment] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
        fetchNextInstallment();
    }, []);

    const fetchBalance = () => {
        axios.get(`${BASE_URL}/api/cash-register`)
        .then(response => setBalance(response.data[0].balance))
        .catch(error => console.error('Error: ', error));
    }

    const fetchTransactions = () => {
        axios.get(`${BASE_URL}/api/cash-register/transactions`)
        .then(response => {
            setPositive(response.data.positive);
            setNegative(response.data.negative);
        })
        .catch(error => console.error('Error: ', error));
    }

    const fetchNextInstallment = () => {
        axios.get(`${BASE_URL}/api/installments/next`)
        .then(response => {setNextInstallment(response.data); console.log(response.data)})
        .catch(error => console.error('Error: ', error));
    }

    const handleInstClick = (id) => {
        navigate('/installment-details', {state: { id }});
    }

    return (
        <Layout>
            <Body>
                <div style={{display: "flex", justifyContent: "space-around", width: "70%"}}>
                    <Card title="Saldo:" content={balance} />
                    <Card title="Entradas:" content={positive} />
                    <Card title="Saídas:" content={negative} />
                </div>
                {nextInstallment.due_date ? <InstCard onClick={() => handleInstClick(nextInstallment.id)} content={getFormattedDate(nextInstallment.due_date)} /> : null}
                {/* <p>Próxima Parcela: {nextInstallment.due_date ? getFormattedDate(nextInstallment.due_date) : null}</p> */}
            </Body>
        </Layout>
    );
}

export default HomePage;