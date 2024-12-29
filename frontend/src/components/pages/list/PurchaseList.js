import React, { useEffect, useState } from "react";

import './list.css';
import Layout from '../../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../Functions";

const PurchaseList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/purchases`)
        .then(response => setPurchases(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-purchase/${id}`);
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
                            {purchases.map((purchase, index) => (
                                <tr key={purchase.id} onClick={() => handleRowClick(purchase.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{purchase.id}</td>
                                    <td>{purchase.description}</td>
                                    <td>{purchase.amount}</td>
                                    <td>{purchase.date ? getFormattedDate(purchase.date) : null}</td>
                                    <td>{purchase.num_installments}</td>
                                    <td>{purchase.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default PurchaseList;