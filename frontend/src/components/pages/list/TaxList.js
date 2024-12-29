import React, { useEffect, useState } from "react";

import './list.css';
import Layout from '../../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../Functions";

const TaxList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [taxes, setTaxes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/taxes`)
        .then(response => setTaxes(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-tax/${id}`);
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
                            {taxes.map((tax, index) => (
                                <tr key={tax.id} onClick={() => handleRowClick(tax.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{tax.id}</td>
                                    <td>{tax.description}</td>
                                    <td>{tax.amount}</td>
                                    <td>{tax.date ? getFormattedDate(tax.date) : null}</td>
                                    <td>{tax.num_installments}</td>
                                    <td>{tax.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default TaxList;