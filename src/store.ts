import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import cartSlice from './features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

export default store;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type StoreType = ReturnType<typeof store.getState>;
