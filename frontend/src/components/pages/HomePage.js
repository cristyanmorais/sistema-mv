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

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const DateInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`

const Button = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`

const HomePage = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const [balance, setBalance] = useState(0);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [nextInstallment, setNextInstallment] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    const handleMonthlyReport = () => {
        setShowModal(true);
    }

    const handleGenerateReport = async () => {
        if (!startDate || !endDate) {
            alert('Por favor, selecione as datas de início e fim');
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/reports/monthly`, {
                params: {
                    startDate,
                    endDate
                },
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `relatorio_${startDate}_${endDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            alert('Erro ao gerar o relatório');
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
                <button className="reportButton" onClick={handleMonthlyReport}>Gerar Relatório</button>
                </div>
            </div>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h2>Selecione o Período</h2>
                        <div>
                            <label>Data Inicial:</label>
                            <DateInput 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Data Final:</label>
                            <DateInput 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button onClick={handleGenerateReport}>Gerar</Button>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </Layout>
    );
}

export default HomePage;