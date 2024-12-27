import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './list.css';
import Layout from '../../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const CompanyList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/companies`)
        .then(response => setCompanies(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-company/${id}`);
    }

    return (
        <Layout>
            <Body>
                <Div>
                    <Table className="table">
                        <thead>
                            <tr className="title-row">
                                <th>ID</th>
                                <th>NOME FANTASIA</th>
                                <th>TELEFONE</th>
                                <th>EMAIL</th>
                                <th>CNPJ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => (
                                <tr key={company.id} onClick={() => handleRowClick(company.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{company.id}</td>
                                    <td>{company.fantasy_name}</td>
                                    <td>{company.phone}</td>
                                    <td>{company.email}</td>
                                    <td>{company.cnpj}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
            </Body>
        </Layout>
    );
}

export default CompanyList;