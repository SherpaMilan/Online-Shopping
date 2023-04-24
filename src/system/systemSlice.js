import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};
const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
  },
});

export const { setShowModal } = systemSlice.actions;
export default systemSlice.reducer;
