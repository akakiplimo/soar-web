import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await api.fetchTransactions();
    return response;
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (data) => {
    const response = await api.addTransaction(data);
    return response;
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions cases
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update transactions cases
      .addCase(addTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;

export default transactionSlice.reducer;
