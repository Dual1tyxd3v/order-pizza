import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../types';
import { StoreType } from '../../store';

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalQuantity = (state: StoreType) =>
  state.cart.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

export const getTotalPrice = (state: StoreType) =>
  state.cart.cart.reduce((sum, val) => sum + (val.totalPrice || 0), 0);

export const getCart = (state: StoreType) => state.cart.cart;

export const getCurrentQuantityById = (id: number) => (state: StoreType) =>
  state.cart.cart.find((cart) => cart.pizzaId === id)?.quantity ?? 0;
