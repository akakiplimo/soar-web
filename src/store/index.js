import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import transactionsReducer from './slices/transactionsSlice';
import balanceReducer from './slices/balanceHistorySlice';
import cardsReducer from './slices/cardsSlice';
import weeklyActivityReducer from './slices/weeklyActivitySlice';
import expenseStatsReducer from './slices/expenseStatsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    balances: balanceReducer,
    cards: cardsReducer,
    weeklyActivity: weeklyActivityReducer,
    expenseStats: expenseStatsReducer,
  },
});

export default store;
