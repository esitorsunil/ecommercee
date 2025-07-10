// src/store/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: {}, // key: user.email, value: profileData
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
  const { email, data } = action.payload;
  if (email) {
    state.profiles[email] = data;
  }
}
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
