import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: {
    fullName: '',
    phone: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
  },
  lastOrderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },
    clearAddress: state => {
      state.address = initialState.address;
    },
    setLastOrderId: (state, action) => {
      state.lastOrderId = action.payload;
    },
    resetCheckout: state => {
      state.address = initialState.address;
      state.lastOrderId = null;
    },
  },
});

export const { setAddress, clearAddress, setLastOrderId, resetCheckout } =
  checkoutSlice.actions;

export const selectAddress = state => state.checkout.address;

export const selectFormattedAddress = state => {
  const { addressLine, city, state: userState, pincode } = state.checkout.address;

  if (!addressLine) {
    return 'Add delivery address';
  }

  return `${addressLine}, ${city}, ${userState} - ${pincode}`;
};

export default checkoutSlice.reducer;
