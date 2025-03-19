import { userData } from './data/userData';
import { transactions } from './data/transactions';
import { balanceHistory } from './data/balanceHistory';
import { cards } from './data/cards';
import { expenseStats } from './data/expenseStats';
import { weeklyActivity } from './data/weeklyActivity';

// simulate api delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = {
  // user data handlers
  getUserProfile: async () => {
    await delay(300);
    return { ...userData };
  },

  updateUserProfile: async (updatedData) => {
    await delay(500);

    // In a real app, you'd update the backend here
    // For mock, we'll just return the updated data
    return { ...userData, ...updatedData };
  },

  // transactions handlers
  getTransactions: async () => {
    await delay(400);
    return [...transactions];
  },

  addTransaction: async (newTransaction) => {
    await delay(500);

    // In a real app, you'd update the backend here
    // For mock, we'll just return the new transaction
    const transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...newTransaction,
    };

    return transaction;
  },

  // balance history handlers
  getBalanceHistory: async () => {
    await delay(300);
    return [...balanceHistory];
  },

  // cards handlers
  getCards: async () => {
    await delay(300);
    return [...cards];
  },

  addCard: async (newCard) => {
    await delay(500);

    // In a real app, you'd update the backend here
    // For mock, we'll just return the new card
    const card = {
      id: cards.length + 1,
      ...newCard,
    };

    return card;
  },

  // expense stats handlers
  getExpenseStats: async () => {
    await delay(400);
    return [...expenseStats];
  },

  // weekly activity handlers
  getWeeklyActivity: async () => {
    await delay(200);
    return [...weeklyActivity];
  },
};
