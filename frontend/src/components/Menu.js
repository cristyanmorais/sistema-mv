import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
    background-color: #393960;
    width: 200px;
    height: calc(100vh - 110px);

    display: flex;
    flex-direction: column;

    padding-top: 10px;

    div {
        width: 100%;
        // background-color: red;
        text-align: center;
        // margin-bottom: 20px;
    }

    .link {
        text-decoration: none;
        color: #fff;
        font-size: 20px;
    }
`

const Linha = styled.hr`
    width: 80%;
`

const Menu = () => {
  return (
    <Div>
        <div>
            <NavLink to="/" className="link">HOME</NavLink>
        </div>
        <Linha />
        <div>
            <NavLink to="/transaction" className="link">TRANSAÇÕES</NavLink>
        </div>
        <Linha />
        <div>
            <NavLink to="/installments" className="link">PARCELAS</NavLink>
        </div>
    </Div>
  );
};

export default Menu;