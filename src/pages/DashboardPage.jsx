import { useState } from 'react';
import styled from 'styled-components';
import WeeklyActivityChart from '../components/charts/WeeklyActivityChart';
import ExpenseStatisticsChart from '../components/charts/ExpenseStatisticsChart';
import BalanceHistoryChart from '../components/charts/BalanceHistoryChart';
import QuickTransfer from '../components/transfers/QuickTransfer';
import CardSection from '../components/cards/CardSection';

const PageContainer = styled.div`
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const DashboardPage = () => {
  const [hover, setHover] = useState(false);
  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <SectionTitle>My Cards</SectionTitle>
            <a
              style={{ color: hover ? '#000' : '#6c6c6c', cursor: 'pointer' }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              See All
            </a>
          </div>
          <div>
            <CardSection />
          </div>
        </div>
        <div>
          <SectionTitle>Recent Transaction</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Weekly activity chart will go here */}
            <div className="text-center p-12">
              Recent Transactions placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle>Weekly Activity</SectionTitle>
          <WeeklyActivityChart />
        </div>
        <div>
          <SectionTitle>Expense Statistics</SectionTitle>
          <ExpenseStatisticsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle>Quick Transfer</SectionTitle>
          <QuickTransfer />
        </div>
        <div>
          <SectionTitle>Balance History</SectionTitle>
          <BalanceHistoryChart />
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
