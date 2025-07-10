// src/store/editModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: { value: false },
  reducers: {
    toggleEditMode: (state) => {
      state.value = !state.value;
    },
    resetEditMode: (state) => {
      state.value = false;
    },
  },
});

export const { toggleEditMode, resetEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
