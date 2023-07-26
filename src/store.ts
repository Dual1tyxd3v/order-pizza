import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import cartSlice from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

export default store;

export type StoreType = ReturnType<typeof store.getState>;
