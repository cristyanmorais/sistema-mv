import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import Sales from "../transactions/Sales";
import Purchases from "../transactions/Purchases";
import Payroll from "../transactions/Payroll";
import ProvidedServices from "../transactions/ProvidedServices";
import ContractedServices from "../transactions/ContractedServices";
import Taxes from "../transactions/Taxes";

const TransactionPage = () => {
    const [selectedType, setSelectedType] = useState('');

    // useEffect(() => {
    //   console.log(selectedType);
    // }, [selectedType])

    const renderComponent = () => {
        switch (selectedType) {
            case "sales":
                return <Sales />;
            case "purchases":
                return <Purchases />;
            case "payroll":
                return <Payroll />;
            case "provided_services":
                return <ProvidedServices />;
            case "contracted_services":
                return <ContractedServices />;
            case "taxes":
                return <Taxes />;
            default:
                return null;
        }
    }

    const Body = styled.div`
        // background-color: darkred;
        // height: 900px;

        display: flex;
        flex-direction: column;
    `;
    const TransactionType = styled.div`
        background-color: lightblue;
        width: 500px;
        margin: auto;

        display: flex;
        flex-direction: column;
    `;

    return (
        <Layout>
            <Body>
                <TransactionType>
                    <label>Tipo de Transação:</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value="null"></option>
                        <option value="sales">Venda</option>
                        <option value="purchases">Compra</option>
                        <option value="taxes">Imposto</option>
                        <option value="payroll">Folha de Pagamento</option>
                        <option value="provided_services">Serviço Prestado</option>
                        <option value="contracted_services">Serviço Contratado</option>
                    </select>
                </TransactionType>

                {renderComponent()}
            </Body>
        </Layout>
    );
}

export default TransactionPage;