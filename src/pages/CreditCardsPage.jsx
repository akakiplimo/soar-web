import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardSection from '../components/cards/CardSection';
import { COLORS } from '../utils/colors';

const PageContainer = styled.div`
  margin-top: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: ${COLORS.buttonPrimary};
  transition: background-color 0.2s;
  color: white;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    background-color: #396aff;
  }
`;

const CreditCardsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageContainer>
      <Header>
        <AddButton>Add New Card</AddButton>
      </Header>
      <CardSection isMobile={isMobile} showAll={true} variant="wrapped" />
    </PageContainer>
  );
};

export default CreditCardsPage;
