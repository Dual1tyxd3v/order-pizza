import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice
  }
});

export default store;

export type StoreType = ReturnType<typeof store.getState>;
