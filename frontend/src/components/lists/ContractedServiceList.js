import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../utils/Functions";

const ContractedServiceList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [contractedServices, setContractedServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/contracted-services`)
        .then(response => setContractedServices(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/contracted-services/edit/${id}`);
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
                            {contractedServices.map((contractedService, index) => (
                                <tr key={contractedService.id} onClick={() => handleRowClick(contractedService.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{contractedService.id}</td>
                                    <td>{contractedService.description}</td>
                                    <td>{contractedService.amount}</td>
                                    <td>{contractedService.date ? getFormattedDate(contractedService.date) : null}</td>
                                    <td>{contractedService.num_installments}</td>
                                    <td>{contractedService.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default ContractedServiceList;