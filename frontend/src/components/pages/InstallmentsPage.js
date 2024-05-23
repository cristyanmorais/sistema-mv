import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Formatar as Datas

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
        display: flex;
        justify-content: space-around;
    `;

    const Div = styled.div`
        width: 500px;
        display: flex;
        flex-direction: column;
        text-align: center;
    `;

    const Table = styled.table`
        tr:not(.title) {
            cursor: pointer;
        }

        th {
            border-bottom: 2px solid #212139;
        }

        .odd {
            background-color: lightgrey;
        }
    `;

const InstallmentsPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/purchases-installments')
        .then(response => setPurchases(response.data))
        .catch(error => console.error('Error: ', error));

        axios.get('http://localhost:3000/api/sales-installments')
        .then(response => setSales(response.data))
        .catch(error => console.error('Error: ', error));
    }, [])

    const handleRowClick = (id, isSale, transactionId) => {
        navigate('/installment-details', {state: { id, isSale, transactionId }});
    }

    // useEffect(() => {
    //     console.log("purchases: " + purchases[0] + "\nsales: " + sales[0]);
    // }, [purchases, sales])


    return (
        <Layout>
            <Body>
                <Div>
                    <h1>Compras:</h1>
                    <Table>
                        <thead>
                            <tr className="title">
                                <th>ID</th>
                                <th>VALOR</th>
                                <th>VENCIMENTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, index) => (
                                <tr key={purchase.id} onClick={() => handleRowClick(purchase.id, false, purchase.purchase_id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{purchase.id}</td>
                                    <td>{purchase.installment_amount}</td>
                                    <td>{purchase.due_date.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
                <Div>
                    <h1>Vendas:</h1>
                    <Table>
                        <thead>
                            <tr className="title">
                                <th>ID</th>
                                <th>VALOR</th>
                                <th>VENCIMENTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale, index) => (
                                <tr key={sale.id} onClick={() => handleRowClick(sale.id, true, sale.sale_id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{sale.id}</td>
                                    <td>{sale.installment_amount}</td>
                                    <td>{sale.due_date.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
            </Body>
        </Layout>
    );
}

export default InstallmentsPage;