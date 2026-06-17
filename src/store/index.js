import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import wishlistReducer from './slices/wishlistSlice';
import checkoutReducer from './slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
  },
});
