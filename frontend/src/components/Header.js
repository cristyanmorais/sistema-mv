import React from 'react';
import styled from 'styled-components';

import logodark from '../assets/logo-dark.png';
import logo from '../assets/logo.png';

const Header = () => {

    const Header = styled.header`
        height: 100px;
        background-color: #212139;

        display: flex;
        align-items: center;
        justify-content: center;
        // margin-bottom: 50px;
    `;

    const Img = styled.img`
        height: 75px;
        // margin-left: 15px;
    `;

    return(
        <Header>
            <Img src={logo}/>
            
        </Header>
    );
}

export default Header;