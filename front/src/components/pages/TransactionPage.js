import React from "react";
import styled from 'styled-components';

import Layout from '../Layout'

const TransactionPage = () => {

    const Body = styled.div`
        // background-color: darkred;
        // height: 900px;
    `

    return (
        <Layout>
            <Body>
                transactionpage
            </Body>
        </Layout>
    );
}

export default TransactionPage;