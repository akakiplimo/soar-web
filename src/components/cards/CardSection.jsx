import styled from 'styled-components';
import CreditCard from './CreditCard';

const CardsSectionContainer = styled.div`
  display: flex;
  overflow-x: ${(props) => (props.isMobile ? 'auto' : 'visible')};
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
  // Sample cards data
  const cards = [
    {
      id: 1,
      type: 'dark',
      balance: '$5,756',
      cardHolder: 'Eddy Cusuma',
      cardNumber: '3778 **** **** 1234',
      validThru: '12/22',
      network: 'mastercard',
    },
    {
      id: 2,
      type: 'light',
      balance: '$5,756',
      cardHolder: 'Eddy Cusuma',
      cardNumber: '3778 **** **** 1234',
      validThru: '12/22',
      network: 'visa',
    },
  ];

  return (
    <CardsSectionContainer $isMobile={isMobile}>
      {cards.map((card) => (
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
