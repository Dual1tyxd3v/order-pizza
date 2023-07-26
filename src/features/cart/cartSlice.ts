import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../types';
import { StoreType } from '../../store';

const initialState: CartState = {
  cart: [
    /* {
      pizzaId: 214124124,
      name: 'qweqwe',
      quantity: 4,
      unitPrice: 13,
      totalPrice: 52,
    }, */
  ],
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
