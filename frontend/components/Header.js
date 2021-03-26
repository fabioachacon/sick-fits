import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';
import Cart from './Cart';

const Logo = styled.h1`
  background-color: red;
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

/* eslint-disable prettier/prettier */
const Header = () => (
  <HeaderStyles>
    <div className="bar">
       <Logo>
           <Link href='/'>Sick Fits</Link>
       </Logo>
       <Nav />
    </div>
    <div className="sub-bar">
        <p>Search</p>
    </div>
    <Cart />
  </HeaderStyles>
);

export default Header;
