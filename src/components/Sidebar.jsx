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
  FaTimes,
} from 'react-icons/fa';
import logo from '../assets/logo.svg';
import { createPortal } from 'react-dom';

const SidebarContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '280px' : '210px')};
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  position: ${({ $isMobile }) => ($isMobile ? 'fixed' : 'relative')};
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-y: auto;
  transform: translateX(
    ${({ $isMobile, $isOpen }) => ($isMobile ? ($isOpen ? '0' : '-100%') : '0')}
  );
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
`;

const Logo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'none')};
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;
`;

const Sidebar = (props) => {
  const { isMobile, onClose, isOpen = true } = props;
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

  const sidebarContent = (
    <SidebarContainer $isMobile={isMobile} $isOpen={isOpen}>
      <Logo $isMobile={isMobile}>
        <CloseButton $isMobile={isMobile} onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <img
          src={logo}
          alt="Soar Task"
          className="w-full h-full object-cover"
          style={{ width: isMobile ? '10rem' : '' }}
        />
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

  if (isMobile) {
    return createPortal(sidebarContent, document.body);
  }

  return sidebarContent;
};

export default Sidebar;
