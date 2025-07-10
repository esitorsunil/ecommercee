// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    user: null,
    isLoading: true,
  },
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.authToken = token;
      state.user = user;
      state.isLoading = false;
    },
    logout: (state) => {
      state.authToken = null;
      state.user = null;
      state.isLoading = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { login, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;
