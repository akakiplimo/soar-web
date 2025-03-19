import { handlers } from './handlers';

const api = {
  //user endpoints
  fetchUserProfile: () => handlers.getUserProfile(),
  updateUserProfile: (updatedData) => handlers.updateUserProfile(updatedData),

  // transactions endpoints
  fetchTransactions: () => handlers.getTransactions(),
  addTransaction: (newTransaction) => handlers.addTransaction(newTransaction),

  // balance history endpoints
  fetchBalanceHistory: () => handlers.getBalanceHistory(),

  // cards endpoints
  fetchCards: () => handlers.getCards(),
  addCard: (newCard) => handlers.addCard(newCard),

  // expense endpoints
  fetchExpenses: () => handlers.getExpenseStats(),

  // weekly activity endpoints
  fetchWeeklyActivity: () => handlers.getWeeklyActivity(),
};

export default api;
