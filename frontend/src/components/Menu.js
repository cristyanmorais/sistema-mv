import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
    background-color: #393960;
    width: 200px;
    height: calc(100vh - 100px);

    display: flex;
    flex-direction: column;

    .link {
        text-decoration: none;
        color: #fff;
    }
`

const Menu = () => {
  return (
    <Div>
        <div>
            <NavLink to="/" className="link">home</NavLink>
        </div>
        <div>
            <NavLink to="/transaction" className="link">transactions</NavLink>
        </div>
        <div>
            <NavLink to="/installments" className="link">parcelas</NavLink>
        </div>
    </Div>
  );
};

export default Menu;