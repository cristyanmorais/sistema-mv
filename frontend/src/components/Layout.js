import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css'

const Header = () => {
  return (
    <header>
      <p>header</p>
    </header>
  );
};

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-title">MENU</div>

      <div className="div-link">
        <NavLink to="/" className="link" activeClassName="active">Dashboard</NavLink>
      </div>
      <div className='linha' />
      <div className="div-link">
        <NavLink to="/transaction" className="link" activeClassName="active">Transações</NavLink>
      </div>
      <div className='linha' />
      <div className="div-link">
        <NavLink to="/installments" className="link" activeClassName="active">Parcelas</NavLink>
      </div>
      <div className='linha' />
      <div className="div-link flyout-container">
        <p className="link fix">Cadastro</p>
        <div className="flyout-menu">
          <NavLink to="/create-city" className="link">Cidades</NavLink>
          <NavLink to="/create-client" className="link">Clientes</NavLink>
          <NavLink to="/create-company" className="link">Empresas</NavLink>
          <NavLink to="/create-employee" className="link">Funcionários</NavLink>
          <NavLink to="/create-work" className="link">Obras</NavLink>
        </div>
      </div>
      <div className='linha' />
      <div className="div-link flyout-container">
        <p className="link fix">Listagem</p>
        <div className="flyout-menu">
          <NavLink to="/cities" className="link">Cidades</NavLink>
          <NavLink to="/clients" className="link">Clientes</NavLink>
          <NavLink to="/companies" className="link">Empresas</NavLink>
          <NavLink to="/employees" className="link">Funcionários</NavLink>
          <NavLink to="/works" className="link">Obras</NavLink>
        </div>
      </div>

    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Menu />
        {children}
      </div>
    </div>
  );
};

export default Layout;
