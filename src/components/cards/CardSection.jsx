import styled from 'styled-components';
import CreditCard from './CreditCard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCards } from '../../store/slices/cardsSlice';

const CardsSectionContainer = styled.div`
  display: flex;
  flex-wrap: ${({ $isMobile }) => ($isMobile ? 'nowrap' : 'wrap')};
  overflow-x: ${({ $isMobile }) => ($isMobile ? 'auto' : 'visible')};
  scroll-snap-type: ${({ $isMobile }) => ($isMobile ? 'x mandatory' : 'none')};
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

const Container = styled.div`
  display: flex;
  gap: ${({ $isMobile }) => ($isMobile ? '15px' : '20px')};
  ${({ $variant }) =>
    $variant === 'wrapped'
      ? `
    flex-wrap: wrap;
  `
      : `
    overflow-x: auto;
    padding-bottom: 16px;
  `}
`;

const CardSection = ({ isMobile, showAll = false, variant = 'scroll' }) => {
  const dispatch = useAppDispatch();
  const {
    data: cards,
    status,
    error,
  } = useAppSelector(
    (state) =>
      state.cards || {
        data: null,
        status: 'idle',
        error: null,
      }
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!cards || cards.length === 0)
    return <CardsSectionContainer>No Card Data found</CardsSectionContainer>;

  return (
    <Container $isMobile={isMobile} $variant={variant}>
      {cards.slice(0, showAll ? undefined : 2).map((card) => (
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
    </Container>
  );
};

export default CardSection;
