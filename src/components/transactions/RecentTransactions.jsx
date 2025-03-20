import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTransactions } from '../../store/slices/transactionsSlice';

const TransactionsContainer = styled.div`
  background-color: ${(props) => (props.dark ? '#343a40' : 'white')};
  color: ${(props) => (props.dark ? 'white' : 'black')};
  border-radius: 12px;
  padding: 20px;
  min-width: ${($isMobile) => ($isMobile ? '85%' : 'auto')};
  scroll-snap-align: start;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;

    &:hover {
      background: #bbb;
    }
  }
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

const RecentTransactions = ({ isMobile }) => {
  const [recentTransactions, setRecentTransactions] = useState([]);

  const dispatch = useAppDispatch();
  const transactionsState = useAppSelector((state) => state.transactions);
  const {
    data: transactions,
    status,
    error,
  } = transactionsState ?? { data: null, status: 'idle', error: null };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (transactions) {
      setRecentTransactions(transactions);
    }
  }, [transactions]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!recentTransactions || recentTransactions.length === 0)
    return <div>No transactions found</div>;

  return (
    <TransactionsContainer $isMobile={isMobile}>
      {recentTransactions.map((transaction, index) => (
        <TransactionItem key={index}>
          <div className="flex items-center">
            <TransactionIcon $bgColor={transaction.iconBg}>
              <img
                loading="lazy"
                src={transaction.icon}
                alt={transaction.type}
              />
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
