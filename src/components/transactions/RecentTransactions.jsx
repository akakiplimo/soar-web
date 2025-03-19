import React from 'react';
import styled from 'styled-components';
import cardIcon from '../../assets/icon_money.svg';
import paypalIcon from '../../assets/icon_paypal.svg';
import dollarIcon from '../../assets/icon_dollar.svg';

const TransactionsContainer = styled.div`
  background-color: ${(props) => (props.dark ? '#343a40' : 'white')};
  color: ${(props) => (props.dark ? 'white' : 'black')};
  border-radius: 12px;
  padding: 20px;
  min-width: ${($isMobile) => ($isMobile ? '85%' : 'auto')};
  scroll-snap-align: start;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor }) => $bgColor || '#f0f0f0'};
`;

const TransactionInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const transactions = [
  {
    type: 'card',
    icon: cardIcon,
    iconBg: '#fff5d9',
    text: 'Deposit from my Card',
    date: '28 January 2021',
    amount: '-$850',
    color: 'text-red-500',
  },
  {
    type: 'paypal',
    icon: paypalIcon,
    iconBg: '#e7edff',
    text: 'Deposit Paypal',
    date: '25 January 2021',
    amount: '+$2,500',
    color: 'text-green-500',
  },
  {
    type: 'user',
    icon: dollarIcon,
    iconBg: '#dcfaf8',
    text: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    color: 'text-green-500',
  },
];

const RecentTransactions = ({ isMobile }) => {
  return (
    <TransactionsContainer $isMobile={isMobile}>
      {transactions.map((transaction, index) => (
        <TransactionItem key={index}>
          <div className="flex items-center">
            <TransactionIcon $bgColor={transaction.iconBg}>
              <img src={transaction.icon} alt={transaction.type} />
            </TransactionIcon>
            <TransactionInfo>
              <div className="font-medium">{transaction.text}</div>
              <div className="text-sm text-gray-500">{transaction.date}</div>
            </TransactionInfo>
          </div>
          <div className={transaction.color}>{transaction.amount}</div>
        </TransactionItem>
      ))}
    </TransactionsContainer>
  );
};

export default RecentTransactions;
