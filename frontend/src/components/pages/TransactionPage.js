import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import Sales from "../transactions/Sales";
import Purchases from "../transactions/Purchases";
import Payroll from "../transactions/Payroll";
import ProvidedServices from "../transactions/ProvidedServices";
import ContractedServices from "../transactions/ContractedServices";
import Taxes from "../transactions/Taxes";

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