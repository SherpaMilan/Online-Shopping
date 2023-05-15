import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentOption: [],
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, { payload }) => {
      state.paymentOption = payload;
    },
  },
});

export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
