import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './transactionPage.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, getTransactionTypeLabel } from "../Functions";


const Body = styled.div`
        // background-color: lightblue;
        width: 80%;
        // height: 900px;

        display: flex;
        flex-direction: column;

        margin: 0 auto;

        align-items: center;
    `;
    
    const TransactionType = styled.div`
        // background-color: lightblue;
        width: 100%;
        height: 100px;
        justify-content: space-around;
        margin-top: 20px;

        display: flex;
        flex-direction: column;

        text-align: center;

        label {
            font-size: 30px;
            font-weight: bold;
        }

        select {
            font-size: 20px;
            width: 30%;
            margin: auto;
            height: 40px;
            text-align: center;
            border-radius: 30px;
        }
    `;

    const Table = styled.table`
        tr:not(.title-row) {
            cursor: pointer;
        }

        th {
            border-bottom: 2px solid #212139;
        }

        .odd {
            background-color: lightgrey;
        }
    `;

const TransactionPage = () => {
    const [selectedType, setSelectedType] = useState('');
    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://192.168.1.246:3000/api/${selectedType}`)
        .then(response => {setTransactions(response.data); console.log(response.data)})
        .catch(error => console.error('Error: ', error));
    }, [selectedType])

    const handleRowClick = (id, type) => {
        navigate('/transaction-details', {state: { id, type }});
    }

    return (
        <Layout>
            <Body>
                <TransactionType>
                    <label>Tipo de Transação:</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value={0}>Selecione uma transação</option>
                        <option value="sales">Venda</option>
                        <option value="purchases">Compra</option>
                        <option value="taxes">Imposto</option>
                        <option value="payroll">Folha de Pagamento</option>
                        <option value="provided-services">Serviço Prestado</option>
                        <option value="contracted-services">Serviço Contratado</option>
                    </select>
                </TransactionType>

                <Table className="transaction-table">
                        <thead>
                            <tr className="title-row">
                                <th>ID</th>
                                <th>DESCRIÇÃO</th>
                                <th>VALOR</th>
                                <th>VENCIMENTO</th>
                                <th>PARCELAS</th>
                                <th>PAGO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={transaction.id} onClick={() => handleRowClick(transaction.id, selectedType)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.date ? getFormattedDate(transaction.date) : null}</td>
                                    <td>{transaction.num_installments}</td>
                                    <td>{transaction.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <button className="registro-btn" onClick={() => navigate('/new-transaction')}>
                        +
                    </button>
                
            </Body>
        </Layout>
    );
}

export default TransactionPage;