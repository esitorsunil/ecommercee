// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './productSlice';
import wishlistReducer from './WishlistSlice';
import authReducer from './authSlice';

import editModeReducer from './editmodeSlice';
import profileReducer from './profileSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authToken', 'user'],
  version: 1,
};

const profilePersistConfig = {
  key: 'profile',
  storage,
  version: 1,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);

const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    auth: persistedAuthReducer,
    profile: persistedProfileReducer,
    editMode: editModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
