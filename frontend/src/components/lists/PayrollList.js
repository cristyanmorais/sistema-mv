import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../utils/Functions";

const PayrollList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    const [payrolls, setPayrolls] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/payroll`)
        .then(response => setPayrolls(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/payroll/edit/${id}`);
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
                            {payrolls.map((payroll, index) => (
                                <tr key={payroll.id} onClick={() => handleRowClick(payroll.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{payroll.id}</td>
                                    <td>{payroll.description}</td>
                                    <td>{payroll.amount}</td>
                                    <td>{payroll.date ? getFormattedDate(payroll.date) : null}</td>
                                    <td>{payroll.num_installments}</td>
                                    <td>{payroll.paid === true ? "Fechado" : "Aberto"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default PayrollList;