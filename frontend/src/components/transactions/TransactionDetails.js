import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './installment.css';
import Layout from '../Layout'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { getFormattedDate } from "../Functions";
import { getTransactionTypeLabel } from "../Functions";

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
        padding-left: 200px
    `;

const TransactionDetails = () => {
    const location = useLocation();
    const transactionId = location.state?.id;
    const selectedType = location.state?.type;
    const [transaction, setTransaction] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://192.168.1.246:3000/api/${selectedType}/${transactionId}`)
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch(error => console.error('Error: ', error));
    },[]);

    const sendCashRegisterData = (cashRegisterData) => {
        return axios.post('http://192.168.1.246:3000/api/cash-register', cashRegisterData)
        .then(response => {
            console.log("sendCashRegisterData: ", cashRegisterData)
        })
        .catch(error => {
            console.error("Error while sending Cash Register: ", error);
        });;
    };

    const handlePayClick = () => {
        const TransactionData = {
            paid: true
        }

        axios.put(`http://192.168.1.246:3000/api/${selectedType}/${transactionId}/paid`, TransactionData)
            .then(response => {
                console.log('Installment updated successfully:', response.data);

                const cashRegisterData = {
                    transaction_type: selectedType,
                    transaction_id: transaction.id,
                    transaction_date: transaction.date,
                    amount: Number(transaction.amount)
                }

                sendCashRegisterData(cashRegisterData);
            })
            .catch(error => console.error('Error updating installment:', error));

        navigate('/transaction');
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
                    <p>{transaction.amount}</p>
                </div>
                <div>
                    <h1>Data:</h1>
                    <p>{transaction.date ? getFormattedDate(transaction.date) : null}</p>
                </div>
                <div>
                    <h1>Tipo:</h1>
                    <p>{selectedType ? getTransactionTypeLabel(selectedType) : null}</p>
                </div>
                <div>
                    <h1>Status:</h1>
                    <p>{transaction.paid === true ? "Fechado" : "Aberto"}</p>
                </div>

                {transaction.paid === false ? <button className="pagar-btn" onClick={handlePayClick}>PAGAR</button> : null}
            </Body>
        </Layout>
    );
}

export default TransactionDetails;