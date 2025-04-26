import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../utils/Functions";

const SaleList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/sales`)
        .then(response => setSales(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/sales/edit/${id}`);
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
                            {sales.map((sale, index) => (
                                <tr key={sale.id} onClick={() => handleRowClick(sale.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{sale.id}</td>
                                    <td>{sale.description}</td>
                                    <td>{sale.amount}</td>
                                    <td>{sale.date ? getFormattedDate(sale.date) : null}</td>
                                    <td>{sale.num_installments}</td>
                                    <td>{sale.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default SaleList;