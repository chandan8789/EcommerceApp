import { createSlice } from '@reduxjs/toolkit';
import { formatPrice } from '../../utils/price';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1, selected: true });
      }
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find(cartItem => cartItem.id === id);

      if (!item) {
        return;
      }

      if (type === 'plus') {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
      }

      state.items = state.items.filter(cartItem => cartItem.quantity > 0);
    },
    toggleSelect: (state, action) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload);

      if (item) {
        item.selected = !item.selected;
      }
    },
    selectAll: state => {
      state.items.forEach(item => {
        item.selected = true;
      });
    },
    deselectAll: state => {
      state.items.forEach(item => {
        item.selected = false;
      });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  toggleSelect,
  selectAll,
  deselectAll,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectSelectedItems = state =>
  state.cart.items.filter(item => item.selected);

export const selectTotalAmount = state =>
  selectSelectedItems(state).reduce(
    (total, item) => total + formatPrice(item.price) * item.quantity,
    0,
  );

export const selectTotalCartCount = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
