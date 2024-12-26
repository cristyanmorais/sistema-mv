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

const ClientList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/clients`)
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-client/${id}`);
    }

    return (
        <Layout>
            <Body>
                <Div>
                    <Table className="clients-table">
                        <thead>
                            <tr className="title-row">
                                <th>ID</th>
                                <th>NOME</th>
                                <th>TELEFONE</th>
                                <th>EMAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index) => (
                                <tr key={client.id} onClick={() => handleRowClick(client.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
            </Body>
        </Layout>
    );
}

export default ClientList;