import { useSelector } from 'react-redux';

export const useLoadingStates = () => {
  const userInfoStatus = useSelector((state) => state.user.status);
  const cardsStatus = useSelector((state) => state.cards.status);
  const transactionsStatus = useSelector((state) => state.transactions.status);
  const activitiesStatus = useSelector((state) => state.weeklyActivity.status);
  const expenseStatsStatus = useSelector((state) => state.expenseStats.status);
  const balanceHistoryStatus = useSelector((state) => state.balances.status);

  return {
    userLoading: userInfoStatus === 'loading',
    cardsLoading: cardsStatus === 'loading',
    transactionsLoading: transactionsStatus === 'loading',
    activityLoading: activitiesStatus === 'loading',
    expenseStatsLoading: expenseStatsStatus === 'loading',
    balanceHistoryLoading: balanceHistoryStatus === 'loading',
    isAnyLoading:
      cardsStatus === 'loading' ||
      transactionsStatus === 'loading' ||
      activitiesStatus === 'loading' ||
      expenseStatsStatus === 'loading' ||
      balanceHistoryStatus === 'loading',
  };
};
