import React, { useEffect, useState } from "react";

import './style/list.css';
import Layout from '../Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CityList = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    const handleRowClick = (id) => {
        navigate(`/cities/edit/${id}`);
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
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default CityList;