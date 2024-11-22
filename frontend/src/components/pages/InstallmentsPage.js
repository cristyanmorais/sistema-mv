import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './installmentsPage.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getFormattedDate } from "../Functions";
import { getTransactionTypeLabel } from "../Functions";

const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: 100%;
    `;

    const Div = styled.div`
        // width: 500px;
        display: flex;
        flex-direction: column;
        text-align: center;
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

const InstallmentsPage = () => {
    const [filterTerm, setFilterTerm] = useState({
        transactionType: '',
        paid: ''
    });
    const [installments, setInstallments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://192.168.1.246:3000/api/installments', {
            params: filterTerm
        })
        .then(response => setInstallments(response.data))
        .catch(error => console.error('Error: ', error));
    }, [filterTerm]);

    const handleFilterChange = (key, value) => {
        setFilterTerm(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleRowClick = (id) => {
        navigate('/installment-details', {state: { id }});
    }

    return (
        <Layout>
            <Body>
            <div className="filters-container">
                    <label>
                        Tipo de Transação:
                        <select value={filterTerm.transactionType} onChange={e => handleFilterChange('transactionType', e.target.value)}>
                            <option value="">Todos</option>
                            <option value="purchases">Compra</option>
                            <option value="sales">Venda</option>
                            <option value="taxes">Imposto</option>
                            <option value="payroll">Folha de Pagamento</option>
                            <option value="provided-services">Serviços Prestados</option>
                            <option value="contracted-services">Serviços Contratados</option>
                        </select>
                    </label>
                    <label>
                        Pago:
                        <select value={filterTerm.paid} onChange={e => handleFilterChange('paid', e.target.value)}>
                            <option value="">Todos</option>
                            <option value="true">Fechado</option>
                            <option value="false">Aberto</option>
                        </select>
                    </label>
                </div>
                <Div>
                    <Table className="installments-table">
                        <thead>
                            <tr className="title-row">
                                <th>ID</th>
                                <th>VALOR</th>
                                <th>VENCIMENTO</th>
                                <th>TIPO</th>
                                <th>PAGO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installments.map((installment, index) => (
                                <tr key={installment.id} onClick={() => handleRowClick(installment.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{installment.id}</td>
                                    <td>{installment.installment_amount}</td>
                                    <td>{getFormattedDate(installment.due_date)}</td>
                                    <td>{getTransactionTypeLabel(installment.transaction_type)}</td>
                                    <td>{installment.paid === true ? "Fechado" : "Aberto"}</td>
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