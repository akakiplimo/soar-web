import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await api.fetchCards();
  return response;
});

export const addCard = createAsyncThunk('cards/addCard', async (data) => {
  const response = await api.addCard(data);
  return response;
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetCardsState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cards cases
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update cards cases
      .addCase(addCard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetCardsState } = cardsSlice.actions;

export default cardsSlice.reducer;
