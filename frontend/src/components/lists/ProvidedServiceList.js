import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../utils/Functions";

const ProvidedServiceList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    const [providedServices, setProvidedServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/provided-services`)
        .then(response => setProvidedServices(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/provided-services/edit/${id}`);
    }

    return (
        <Layout>
            <div className="body">
                <div>
                    <table className="table">
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
                            {providedServices.map((providedService, index) => (
                                <tr key={providedService.id} onClick={() => handleRowClick(providedService.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{providedService.id}</td>
                                    <td>{providedService.description}</td>
                                    <td>{providedService.amount}</td>
                                    <td>{providedService.date ? getFormattedDate(providedService.date) : null}</td>
                                    <td>{providedService.num_installments}</td>
                                    <td>{providedService.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default ProvidedServiceList;