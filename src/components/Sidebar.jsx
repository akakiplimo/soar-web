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
import { useEffect } from 'react';
import { useRef } from 'react';

const SidebarContainer = styled.aside`
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

const Logo = styled.header`
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ $isOpen, $isMobile }) =>
    $isOpen && $isMobile ? 'block' : 'none'};
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Sidebar = (props) => {
  const { isMobile, onClose, isOpen = true } = props;
  const sidebarRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isMobile) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      // Store current focus before opening sidebar
      previousFocusRef.current = document.activeElement;

      // Focus the first focusable element in the sidebar
      setTimeout(() => {
        const closeButton = sidebarRef.current?.querySelector('button');
        if (closeButton) closeButton.focus();
      }, 100);

      // Add keydown event listener
      document.addEventListener('keydown', handleKeyDown);

      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    } else if (previousFocusRef.current) {
      // Return focus to the element that had it before opening
      previousFocusRef.current.focus();
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen, onClose]);

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
    <>
      {isMobile && (
        <Overlay $isOpen={isOpen} $isMobile={isMobile} onClick={onClose} />
      )}
      <SidebarContainer $isMobile={isMobile} $isOpen={isOpen} ref={sidebarRef}>
        <Logo $isMobile={isMobile}>
          <CloseButton
            $isMobile={isMobile}
            onClick={onClose}
            title="Close navigation menu"
          >
            <FaTimes aria-hidden="true" />
            <ScreenReaderOnly>Close navigation menu</ScreenReaderOnly>
          </CloseButton>
          <img
            src={logo}
            alt="Soar Task"
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ width: isMobile ? '10rem' : '' }}
          />
        </Logo>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavItem
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={isMobile ? onClose : undefined}
                >
                  <IconWrapper aria-hidden="true">{item.icon}</IconWrapper>
                  <span>{item.name}</span>
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </SidebarContainer>
    </>
  );

  if (isMobile) {
    return createPortal(sidebarContent, document.body);
  }

  return sidebarContent;
};

export default Sidebar;
