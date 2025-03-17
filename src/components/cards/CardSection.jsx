import styled from 'styled-components';
import CreditCard from './CreditCard';

const CardsSectionContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CardSection = () => {
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
    <CardsSectionContainer>
      {cards.map((card) => (
        <CreditCard
          key={card.id}
          type={card.type}
          balance={card.balance}
          cardHolder={card.cardHolder}
          cardNumber={card.cardNumber}
          validThru={card.validThru}
          network={card.network}
        />
      ))}
    </CardsSectionContainer>
  );
};

export default CardSection;
