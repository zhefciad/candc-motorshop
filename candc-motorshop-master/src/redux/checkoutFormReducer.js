import { createSlice } from '@reduxjs/toolkit';

export const checkoutFormSlice = createSlice({
  name: 'checkoutForm',
  initialState: {
    values: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.values = action.payload;

      console.log(action.payload)
    },
    clearFormData: (state) => {
      state.values = {};
    },
  },
});

export const { setFormData, clearFormData } = checkoutFormSlice.actions;

export default checkoutFormSlice.reducer;
