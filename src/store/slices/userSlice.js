import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../mocks/api';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const response = await api.fetchUserProfile();
    return response;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (data) => {
    const response = await api.updateUserProfile(data);
    return response;
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update user profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
