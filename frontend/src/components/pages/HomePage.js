import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import axios from "axios";

const Body = styled.div`
    
`

const HomePage = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = () => {
        axios.get('http://localhost:3000/api/cash-register')
        .then(response => setBalance(response.data[0].balance))
        .catch(error => console.error('Error: ', error));
    }

    return (
        <Layout>
            <Body>
                <p>homepage</p>
                <p>Saldo: {balance}</p>
            </Body>
        </Layout>
    );
}

export default HomePage;