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

const EmployeeList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/employees`)
        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-employee/${id}`);
    }

    return (
        <Layout>
            <Body>
                <Div>
                    <Table className="table">
                        <thead>
                            <tr className="title-row">
                                <th>ID</th>
                                <th>NOME</th>
                                <th>TELEFONE</th>
                                <th>EMAIL</th>
                                <th>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee.id} onClick={() => handleRowClick(employee.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.cpf}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
            </Body>
        </Layout>
    );
}

export default EmployeeList;