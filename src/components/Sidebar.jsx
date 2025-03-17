// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHome,
  FaExchangeAlt,
  FaUser,
  FaChartLine,
  FaCreditCard,
  FaMoneyBillWave,
  FaCogs,
  FaTools,
  FaCrown,
} from 'react-icons/fa';
import logo from '../assets/logo.svg';

const SidebarContainer = styled.div`
  width: 210px;
  background-color: white;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
`;

const Logo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #f0f0f0; */
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #777;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #f6f9ff;
    color: #000;
  }

  &.active {
    position: relative;
    color: #000;
    background-color: #f6f9ff;
    padding-left: 20px;
  }

  &.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background-color: #000;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome /> },
    { path: '/transactions', name: 'Transactions', icon: <FaExchangeAlt /> },
    { path: '/accounts', name: 'Accounts', icon: <FaUser /> },
    { path: '/investments', name: 'Investments', icon: <FaChartLine /> },
    { path: '/credit-cards', name: 'Credit Cards', icon: <FaCreditCard /> },
    { path: '/loans', name: 'Loans', icon: <FaMoneyBillWave /> },
    { path: '/services', name: 'Services', icon: <FaTools /> },
    { path: '/privileges', name: 'My Privileges', icon: <FaCrown /> },
    { path: '/settings', name: 'Setting', icon: <FaCogs /> },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <img
          src={logo}
          alt="Soar Task"
          className="w-full h-full object-cover"
        />
      </Logo>
      <nav>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IconWrapper>{item.icon}</IconWrapper>
            <span>{item.name}</span>
          </NavItem>
        ))}
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
