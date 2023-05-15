import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProd: {},
};
const productlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, { payload }) => {
      if (!state.products.length && !payload.length) return;

      state.products = payload;
    },
    setSelectedCat: (state, { payload }) => {
      state.selectedProd = payload;
    },
  },
});

export const { setProduct, setSelectedCat } = productlice.actions;
export default productlice.reducer;
