import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'balances/fetchExpenses',
  async () => {
    const response = await api.fetchExpenses();
    return response;
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const expenseStatsSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    resetExpenseStatsState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expense cases
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetExpenseStatsState } = expenseStatsSlice.actions;

export default expenseStatsSlice.reducer;
