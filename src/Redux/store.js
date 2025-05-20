import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import wishlistReducer from './WishlistSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
  }
});

export default store;
