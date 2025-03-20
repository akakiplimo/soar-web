import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Import your components
import WeeklyActivityChart from '../components/charts/WeeklyActivityChart';
import ExpenseStatisticsChart from '../components/charts/ExpenseStatisticsChart';
import BalanceHistoryChart from '../components/charts/BalanceHistoryChart';
import QuickTransfer from '../components/transfers/QuickTransfer';
import CardSection from '../components/cards/CardSection';
import RecentTransactions from '../components/transactions/RecentTransactions';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import TransactionsSkeleton from '../components/skeletons/TransactionsSkeleton';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

// Import your utilities and actions
import { COLORS } from '../utils/colors';
import { useLoadingStates } from '../utils/loadingStates';

// Import reset actions and async thunks
import { resetCardsState, fetchCards } from '../store/slices/cardsSlice';
import {
  resetTransactionState,
  fetchTransactions,
} from '../store/slices/transactionsSlice';
import {
  fetchWeeklyActivity,
  resetActivityState,
} from '../store/slices/weeklyActivitySlice';
import {
  resetExpenseStatsState,
  fetchExpenses,
} from '../store/slices/expenseStatsSlice';
import {
  resetBalanceState,
  fetchBalances,
} from '../store/slices/balanceHistorySlice';

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
  const dispatch = useDispatch();
  const {
    cardsLoading,
    transactionsLoading,
    activityLoading,
    expenseStatsLoading,
    balanceHistoryLoading,
  } = useLoadingStates();

  useEffect(() => {
    // First, reset all states to trigger loading state
    dispatch(resetCardsState());
    dispatch(resetTransactionState());
    dispatch(resetActivityState());
    dispatch(resetBalanceState());
    dispatch(resetExpenseStatsState());

    // Then fetch fresh data
    dispatch(fetchCards());
    dispatch(fetchTransactions());
    dispatch(fetchWeeklyActivity());
    dispatch(fetchExpenses());
    dispatch(fetchBalances());
  }, [dispatch]);

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
            {cardsLoading ? (
              <CardSkeleton />
            ) : (
              <CardSection isMobile={isMobile} />
            )}
          </div>
        </div>
        <div className="mb-6">
          <SectionTitle>Recent Transaction</SectionTitle>
          {transactionsLoading ? (
            <TransactionsSkeleton />
          ) : (
            <RecentTransactions isMobile={isMobile} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mb-6">
          <SectionTitle>Weekly Activity</SectionTitle>
          {activityLoading ? <ChartSkeleton /> : <WeeklyActivityChart />}
        </div>
        <div className="mb-6">
          <SectionTitle>Expense Statistics</SectionTitle>
          {expenseStatsLoading ? <ChartSkeleton /> : <ExpenseStatisticsChart />}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mb-6">
          <SectionTitle>Quick Transfer</SectionTitle>
          <QuickTransfer />
        </div>
        <div className="mb-6">
          <SectionTitle>Balance History</SectionTitle>
          {balanceHistoryLoading ? <ChartSkeleton /> : <BalanceHistoryChart />}
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
