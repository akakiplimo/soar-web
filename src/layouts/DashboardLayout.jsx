// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const DashboardLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <TopBar />
        <div className="p-6">
          <Outlet />
        </div>
      </MainContent>
    </LayoutContainer>
  );
};

export default DashboardLayout;
