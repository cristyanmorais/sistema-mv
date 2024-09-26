import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";
import { useLocation } from "react-router-dom";

import { getFormattedDate } from "../Functions";
import { getTransactionTypeLabel } from "../Functions";

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
    `;

const Installment = () => {
    const location = useLocation();
    const installmentId = location.state?.id;
    const [amount, setAmount] = useState(0);
    const [transaction, setTransaction] = useState({});
    const [transactionId, setTransactionId] = useState(0);
    const [transactionType, setTransactionType] = useState('');

    useEffect(() => {
        // console.log("fetchTransaction");
        axios.get(`http://localhost:3000/api/installments/${installmentId}`)
        .then(response => {
            setTransaction(response.data);
            fetchAmount(response.data.transaction_id, response.data.transaction_type.replace(/-/g, '_'));
        })
        .catch(error => console.error('Error: ', error));
    },[]);

    const fetchAmount = (id, type) => {
        axios.get(`http://localhost:3000/api/installments/amount/a?transaction_type=${type}&transaction_id=${id}`)
        .then(response => {
            setAmount(response.data.amount);
        })
        .catch(error => console.error('Error: ', error));
    };    

    return (
        <Layout>
            <Body>
                <div>
                    <h1>Valor:</h1>
                    <p>{transaction.installment_amount}</p>
                </div>
                <div>
                    <h1>Data de vencimento:</h1>
                    <p>{transaction.due_date ? getFormattedDate(transaction.due_date) : null}</p>
                </div>
                <div>
                    <h1>Tipo de Transação:</h1>
                    <p>{transaction.transaction_type ? getTransactionTypeLabel(transaction.transaction_type) : null}</p>
                </div>
                <div>
                    <h1>Dados da Transação:</h1>
                    <p>ID: {transaction.id}</p>
                    <p>Valor: {amount}</p>
                </div>
            </Body>
        </Layout>
    );
}

export default Installment;