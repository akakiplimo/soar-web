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
  width: ${(props) => (props.isMobile ? '100%' : '210px')};
  height: ${(props) => (props.isMobile ? '100%' : '100vh')};
  background-color: white;
  border-right: 1px solid #e0e0e0;
  position: ${(props) => (props.isMobile ? 'fixed' : 'relative')};
  z-index: ${(props) => (props.isMobile ? '1000' : '1')};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isMobile ? 'space-between' : 'flex-start'};
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

const CloseButton = styled.button`
  display: ${(props) => (props.isMobile ? 'flex' : 'none')};
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #777;
`;

const Sidebar = (props) => {
  const { isMobile, onClose } = props;
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
    <SidebarContainer isMobile={isMobile}>
      <Logo isMobile={isMobile}>
        <img
          src={logo}
          alt="Soar Task"
          className="w-full h-full object-cover"
          style={{ width: isMobile ? '10rem' : '' }}
        />
        <CloseButton isMobile={isMobile} onClick={onClose}>
          &times;
        </CloseButton>
      </Logo>
      <nav>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={isMobile ? onClose : undefined}
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
