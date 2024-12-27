import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import './list.css';
import Layout from '../../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            <div className="body">
                <div>
                    <table className="table">
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
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default CompanyList;