import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import { Clients, Companies, Employees, Works } from "../register/Steady";

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

const Register = () => {
    const [selectedType, setSelectedType] = useState('');

    // useEffect(() => {
    //   console.log(selectedType);
    // }, [selectedType])

    const renderComponent = () => {
        switch (selectedType) {
            case "clients":
                return <Clients />;
            case "companies":
                return <Companies />;
            case "employees":
                return <Employees />;
            case "works":
                return <Works />;
            default:
                return null;
        }
    }

    return (
        <Layout>
            <Body>
                <TransactionType>
                    <label>Cadastro:</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value={0}>Selecione um</option>
                        <option value="clients">Clientes</option>
                        <option value="companies">Empresas</option>
                        <option value="employees">Funcionários</option>
                        <option value="works">Obras</option>
                    </select>
                </TransactionType>

                {renderComponent()}
            </Body>
        </Layout>
    );
}

export default Register;