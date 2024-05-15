import React from "react";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Layout from '../Layout'

const HomePage = () => {

    const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
    `

    return (
        <Layout>
            <Body>
                <p>homepage</p>
                <NavLink to="/transaction">go to transactions</NavLink>
            </Body>
        </Layout>
    );
}

export default HomePage;