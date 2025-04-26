import React, { useEffect, useState } from "react";

import Layout from '../Layout'
import axios from "axios";
import { getFormattedDate, formatCurrency } from "../utils/Functions";
import { Card, InstCard } from "../visual-components/VisualComponents";
import { useNavigate } from "react-router-dom";
import './style/homePage.css';

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
            <div className="body">
                <div style={{display: "flex", justifyContent: "space-around", width: "70%"}}>
                    <Card title="Saldo:" content={formatCurrency(balance)} />
                    <Card title="Entradas:" content={formatCurrency(positive)} />
                    <Card title="Saídas:" content={formatCurrency(negative)} />
                </div>
                {nextInstallment.due_date ? <InstCard onClick={() => handleInstClick(nextInstallment.id)} content={getFormattedDate(nextInstallment.due_date)} /> : null}
                {/* <p>Próxima Parcela: {nextInstallment.due_date ? getFormattedDate(nextInstallment.due_date) : null}</p> */}
            </div>
        </Layout>
    );
}

export default HomePage;