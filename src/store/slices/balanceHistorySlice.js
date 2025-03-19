import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchBalances = createAsyncThunk(
  'balances/fetchBalances',
  async () => {
    const response = await api.fetchBalanceHistory();
    return response;
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const balanceSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    resetBalanceState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch balances cases
      .addCase(fetchBalances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetBalanceState } = balanceSlice.actions;

export default balanceSlice.reducer;
