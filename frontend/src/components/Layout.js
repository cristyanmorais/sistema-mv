import React, { useState } from 'react';
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
      <p>header</p>
    </header>
  );
}

const Menu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='menu'>
      <div className="menu-title">MENU</div>
        <div className='div-link'>
            <NavLink to="/" className="link">Dashboard</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/transaction" className="link">Transações</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/installments" className="link">Parcelas</NavLink>
        </div>
        <hr className='linha' />
        <div className='div-link'>
            <NavLink to="/register" className="link">Cadastro</NavLink>
        </div>
        <hr className='linha' />
        <div className="div-link">
        <p className="fixed">
          Listagem
        </p>
          <div className="droplist">
          <NavLink to="/cities" className="link droplist-item">Cidades</NavLink>
            <NavLink to="/clients" className="link droplist-item">Clientes</NavLink>
            <NavLink to="/companies" className="link droplist-item">Empresas</NavLink>
            <NavLink to="/employees" className="link droplist-item">Funcionários</NavLink>
            <NavLink to="/works" className="link droplist-item">Obras</NavLink>
          </div>
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