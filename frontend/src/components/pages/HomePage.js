import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './homePage.css';
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

    const handleMonthlyReport = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/reports/monthly`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `relatorio_mensal_${new Date().toLocaleDateString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            alert('Erro ao gerar o relatório mensal');
        }
    }

    return (
        <Layout>
            <div className="homePage">
                <div className="cards">
                    <Card title="Saldo:" content={balance} />
                    <Card title="Entradas:" content={positive.toFixed(2)} />
                    <Card title="Saídas:" content={negative.toFixed(2)} />
                </div>
                <div className="clickables">
                {nextInstallment.due_date ? <InstCard onClick={() => handleInstClick(nextInstallment.id)} date={getFormattedDate(nextInstallment.due_date)} content={nextInstallment.transaction_type} /> : null}
                <button className="reportButton" onClick={handleMonthlyReport}>Gerar Relatório Mensal</button>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;