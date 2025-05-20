// redux/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.find((item) => item.id === product.id);
      if (exists) {
        return state.filter((item) => item.id !== product.id);
      } else {
        state.push(product);
      }
    },
    removeFromWishlist(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    clearWishlist: () => [],
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
