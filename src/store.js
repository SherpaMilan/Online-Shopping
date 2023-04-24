import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySilce";
import systemReducer from "./system/systemSlice";
export default configureStore({
  reducer: { cat: catReducer, system: systemReducer },
});
