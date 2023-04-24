import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cats: [],
  selectedCat: {},
};
const catSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCats: (state, { payload }) => {
      state.cats = payload;
    },
    setSelectedCat: (state, { payload }) => {
      state.selectedCat = state.cats.find((cat) => cat.slug === payload);
    },
  },
});

export const { setCats, setSelectedCat } = catSlice.actions;
export default catSlice.reducer;
