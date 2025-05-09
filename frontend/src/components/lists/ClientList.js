import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/clients`)
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/clients/edit/${id}`);
    }

    return (
        <Layout>
            <div className="body">
                <div>
                    <table className="table">
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
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default ClientList;