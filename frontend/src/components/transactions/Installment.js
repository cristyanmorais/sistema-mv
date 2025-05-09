import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './style/installment.css';
import Layout from '../Layout'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { getFormattedDate, getTransactionTypeLabel } from "../utils/Functions";

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
        padding-left: 200px
    `;

const Installment = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const location = useLocation();
    const installmentId = location.state?.id;
    const [amount, setAmount] = useState(0);
    const [transaction, setTransaction] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/installments/${installmentId}`)
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
            fetchAmount(response.data.transaction_id, response.data.transaction_type.replace(/-/g, '_'));
        })
        .catch(error => console.error('Error: ', error));
    },[]);

    const fetchAmount = (id, type) => {
        axios.get(`${BASE_URL}/api/installments/amount/a?transaction_type=${type}&transaction_id=${id}`)
        .then(response => {
            setAmount(response.data.amount);
        })
        .catch(error => console.error('Error: ', error));
    };

    const sendCashRegisterData = (cashRegisterData) => {
        return axios.post(`${BASE_URL}/api/cash-register`, cashRegisterData)
        .then(response => {
            console.log("sendCashRegisterData: ", cashRegisterData)
        })
        .catch(error => {
            console.error("Error while sending Cash Register: ", error);
        });;
    };

    const handlePayClick = () => {
        const InstallmentData = {
            transaction_id: transaction.transaction_id,
            transaction_type: transaction.transaction_type,
            installment_amount: transaction.installment_amount,
            due_date: transaction.due_date,
            paid: true
        }

        axios.put(`${BASE_URL}/api/installments/${installmentId}`, InstallmentData)
            .then(response => {
                console.log('Installment updated successfully:', response.data);

                const cashRegisterData = {
                    transaction_type: transaction.transaction_type,
                    transaction_id: transaction.transaction_id,
                    transaction_date: transaction.due_date,
                    amount: Number(transaction.installment_amount)
                }

                sendCashRegisterData(cashRegisterData);
            })
            .catch(error => console.error('Error updating installment:', error));

        navigate('/installments');
    };

    return (
        <Layout>
            <Body className="inst-body">
                <div>
                    <h1>ID:</h1>
                    <p>{transaction.id}</p>
                </div>
                <div>
                    <h1>Valor:</h1>
                    <p>{transaction.installment_amount}</p>
                </div>
                <div>
                    <h1>Vencimento:</h1>
                    <p>{transaction.due_date ? getFormattedDate(transaction.due_date) : null}</p>
                </div>
                <div>
                    <h1>Tipo:</h1>
                    <p>{transaction.transaction_type ? getTransactionTypeLabel(transaction.transaction_type) : null}</p>
                </div>
                <div>
                    <h1>Status:</h1>
                    <p>{transaction.paid === true ? "Fechado" : "Aberto"}</p>
                </div>
                <div>
                    <h1>Dados da Transação:</h1>
                    <p>ID: {transaction.transaction_id}</p>
                    <p>Valor: {amount}</p>
                </div>

                {transaction.paid === false ? <button className="pagar-btn" onClick={handlePayClick}>PAGAR</button> : null}
            </Body>
        </Layout>
    );
}

export default Installment;