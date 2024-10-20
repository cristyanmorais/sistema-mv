import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import './layout.css';
import { NavLink } from 'react-router-dom';

const Div = styled.div`
  display: flex;
`

const Header = () => {
  return(
    <header>
      <img src={logo}/>
    </header>
  );
}

const Menu = () => {
  return (
    <div className='menu'>
      <div className="menu-title">MENU</div>
        <div className='div-link'>
            <NavLink to="/" className="link">HOME</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/transaction" className="link">TRANSAÇÕES</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/installments" className="link">PARCELAS</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/register" className="link">CADASTRO</NavLink>
        </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Div className="container">
        <Menu />
        {children}
      </Div>
    </div>
  );
};

export default Layout;