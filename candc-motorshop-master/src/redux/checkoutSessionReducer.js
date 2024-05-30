import { createSlice } from '@reduxjs/toolkit';

export const checkoutSessionReducer = createSlice({
  name: 'checkoutSession',
  initialState: {
    sessionId: {},
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      console.log(action.payload, "session added")
    },
  },
});

export const { setSessionId } = checkoutSessionReducer.actions;

export default checkoutSessionReducer.reducer;
