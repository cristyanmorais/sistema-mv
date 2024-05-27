import React from 'react';
import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
`

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