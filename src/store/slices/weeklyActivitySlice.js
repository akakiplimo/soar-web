import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchWeeklyActivity = createAsyncThunk(
  'activity/fetchWeeklyActivity',
  async () => {
    const response = await api.fetchWeeklyActivity();
    return response;
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    resetActivityState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch weekly activity cases
      .addCase(fetchWeeklyActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklyActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeeklyActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetActivityState } = activitySlice.actions;

export default activitySlice.reducer;
