import styled from 'styled-components';
import CreditCard from './CreditCard';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCards } from '../../store/slices/cardsSlice';

const CardsSectionContainer = styled.div`
  display: flex;
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'auto' : 'visible')};
  scroll-snap-type: x mandatory;
  gap: ${({ $isMobile }) => ($isMobile ? '15px' : '20px')};
  padding-bottom: ${({ $isMobile }) => ($isMobile ? '10px' : '0')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

const CardSection = ({ isMobile }) => {
  const [cardsData, setCardsData] = useState([]);
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards);
  const {
    data: cards,
    status,
    error,
  } = cardsState ?? { data: null, status: 'idle', error: null };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (cards) {
      setCardsData(cards);
    }
  }, [cards]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!cardsData || cardsData.length === 0)
    return <CardsSectionContainer>No Card Data found</CardsSectionContainer>;

  return (
    <CardsSectionContainer $isMobile={isMobile}>
      {cardsData.slice(0, 2).map((card) => (
        <CreditCard
          key={card.id}
          type={card.type}
          balance={card.balance}
          cardHolder={card.cardHolder}
          cardNumber={card.cardNumber}
          validThru={card.validThru}
          network={card.network}
          isMobile={isMobile}
        />
      ))}
    </CardsSectionContainer>
  );
};

export default CardSection;
