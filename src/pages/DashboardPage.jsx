import { useState } from 'react';
import styled from 'styled-components';

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="bg-gray-100 p-4 rounded-lg">
            {/* Card components will go here */}
            <div className="text-center p-12">Card components placeholder</div>
          </div>
        </div>
        <div>
          <SectionTitle>Recent Transaction</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Weekly activity chart will go here */}
            <div className="text-center p-12">
              Weekly activity chart placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle>Weekly Activity</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Weekly activity chart will go here */}
            <div className="text-center p-12">
              Weekly activity chart placeholder
            </div>
          </div>
        </div>
        <div>
          <SectionTitle>Expense Statistics</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Expense pie chart will go here */}
            <div className="text-center p-12">
              Expense statistics chart placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle>Quick Transfer</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Quick transfer component will go here */}
            <div className="text-center p-12">
              Quick transfer component placeholder
            </div>
          </div>
        </div>
        <div>
          <SectionTitle>Balance History</SectionTitle>
          <div className="bg-white p-4 rounded-lg">
            {/* Balance history chart will go here */}
            <div className="text-center p-12">
              Balance history chart placeholder
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
