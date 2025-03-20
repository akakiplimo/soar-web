import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const MobileNavToggle = styled.button`
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'none')};
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4a6cf7;
  color: #fff;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  border: none;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
`;

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileNav(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowMobileNav(false);
    }
  };

  return (
    <LayoutContainer $isMobile={isMobile}>
      {isMobile && (
        <Overlay $isOpen={showMobileNav} onClick={handleOverlayClick} />
      )}
      <Sidebar
        isMobile={isMobile}
        isOpen={isMobile ? showMobileNav : true}
        onClose={() => setShowMobileNav(false)}
      />
      <MainContent>
        <TopBar
          isMobile={isMobile}
          onMenuClick={() => setShowMobileNav(true)}
        />
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </MainContent>
      {isMobile && !showMobileNav && (
        <MobileNavToggle
          $isMobile={isMobile}
          onClick={() => setShowMobileNav(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MobileNavToggle>
      )}
    </LayoutContainer>
  );
};

export default DashboardLayout;
