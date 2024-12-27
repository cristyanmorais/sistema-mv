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

const CityList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-city/${id}`);
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
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map((city, index) => (
                                <tr key={city.id} onClick={() => handleRowClick(city.id)} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{city.id}</td>
                                    <td>{city.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Div>
            </Body>
        </Layout>
    );
}

export default CityList;