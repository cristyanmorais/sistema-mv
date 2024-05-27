import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";
import { useLocation } from "react-router-dom";

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
    `;

const Installment = () => {
    const location = useLocation();

    const installmentId = location.state?.id;
    const transactionId = location.state?.transactionId;
    const isSale = location.state?.isSale;

    const [purchaseId, setPurchaseId] = useState(0);
    const [saleId, setSaleId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    const [transaction, setTransaction] = useState({
        id: 0,
        amount: 0,
        sale_date: '',
        purchase_date: ''
    });

    useEffect(() => {
        if (installmentId) {
            if (isSale === true) {
                fetchSaleInstallment(transactionId);
                fetchSale(transactionId);
            } else {
                fetchPurchaseInstallment(transactionId);
                fetchPurchase(transactionId);
            }
        }

        // console.log("id: " + installmentId + "\nisSale: " + isSale);
    },[installmentId]);

    const fetchSaleInstallment = () => {
        console.log("fetchSaleInstallment");
        axios.get(`http://localhost:3000/api/sales-installments/${installmentId}`)
        .then(response => {
            setSaleId(response.data.sale_id);
            setAmount(response.data.installment_amount);
            setDate(response.data.due_date);
        })
        .catch(error => console.error('Error: ', error));
    }

    const fetchPurchaseInstallment = () => {
        axios.get(`http://localhost:3000/api/purchases-installments/${installmentId}`)
        .then(response => {
            setPurchaseId(response.data.purchase_id);
            setAmount(response.data.installment_amount);
            setDate(response.data.due_date);
        })
        .catch(error => console.error('Error: ', error));

        // console.log("id: " + purchaseId + "\nisSale: " + amount + "\ndate: " + date);
    }

    const fetchSale = (id) => {
        console.log("fetchSale");
        axios.get(`http://localhost:3000/api/sales/${id}`)
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch(error => console.error('Error: ', error));
    }

    const fetchPurchase = (id) => {
        console.log("fetchPurchase");
        axios.get(`http://localhost:3000/api/purchases/${id}`)
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch(error => console.error('Error: ', error));
    }

    return (
        <Layout>
            <Body>
                <div>
                    <h1>Valor:</h1>
                    <p>{amount}</p>
                </div>
                <div>
                    <h1>Data de vencimento:</h1>
                    <p>{date.substring(0, 10)}</p>
                </div>
                <div>
                    <h1>Tipo de Transação:</h1>
                    <p>{isSale ? "Venda" : "Compra"}</p>
                </div>
                <div>
                    <h1>Dados da {isSale ? "Venda" : "Compra"}</h1>
                    <p>ID: {transaction.id}</p>
                    <p>Valor: {transaction.amount}</p>
                    <p>Data: {isSale ? `${transaction.sale_date.substring(0, 10)}` : `${transaction.purchase_date.substring(0, 10)}`}</p>
                </div>
            </Body>
        </Layout>
    );
}

export default Installment;