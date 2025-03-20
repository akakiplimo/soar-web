import { useState } from 'react';
import styled from 'styled-components';
import WeeklyActivityChart from '../components/charts/WeeklyActivityChart';
import ExpenseStatisticsChart from '../components/charts/ExpenseStatisticsChart';
import BalanceHistoryChart from '../components/charts/BalanceHistoryChart';
import QuickTransfer from '../components/transfers/QuickTransfer';
import CardSection from '../components/cards/CardSection';
import { useEffect } from 'react';
import RecentTransactions from '../components/transactions/RecentTransactions';
import { COLORS } from '../utils/colors';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${COLORS.titlePrimary ? COLORS.titlePrimary : '#333'};
`;

const DashboardPage = () => {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreditCardsNavigate = () => {
    navigate('/credit-cards');
  };

  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <SectionTitle>My Cards</SectionTitle>
            <a
              style={{
                color: hover ? '#6c6c6c' : COLORS.titlePrimary,
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={handleCreditCardsNavigate}
            >
              See All
            </a>
          </div>
          <div>
            <CardSection isMobile={isMobile} />
          </div>
        </div>
        <div className="mb-6">
          <SectionTitle>Recent Transaction</SectionTitle>
          <RecentTransactions isMobile={isMobile} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mb-6">
          <SectionTitle>Weekly Activity</SectionTitle>
          <WeeklyActivityChart />
        </div>
        <div className="mb-6">
          <SectionTitle>Expense Statistics</SectionTitle>
          <ExpenseStatisticsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mb-6">
          <SectionTitle>Quick Transfer</SectionTitle>
          <QuickTransfer />
        </div>
        <div className="mb-6">
          <SectionTitle>Balance History</SectionTitle>
          <BalanceHistoryChart />
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
