import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo-dark.png'

const Header = () => {

    const Header = styled.header`
        height: 100px;
        background-color: #dbdada;

        display: flex;
        align-items: center;
    `;

    const Img = styled.img`
        height: 75px;
        margin-left: 15px;
    `;

    return(
        <Header>
            <Img src={logo}/>
            
        </Header>
    );
}

export default Header;