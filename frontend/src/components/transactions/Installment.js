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
    const transactionId = location.state?.id;

    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        console.log("fetchTransaction");
        axios.get(`http://localhost:3000/api/installments/${transactionId}`)
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch(error => console.error('Error: ', error));
    },[]);

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
                    <p>Valor: {transaction.amount}</p>
                    {/* <p>Data: {isSale ? `${transaction.sale_date.substring(0, 10)}` : `${transaction.purchase_date.substring(0, 10)}`}</p> */}
                </div>
            </Body>
        </Layout>
    );
}

export default Installment;