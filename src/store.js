import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySilce";
import systemReducer from "./system/systemSlice";
import userReducer from "./pages/user-state/userSlice";
import productReducer from "./pages/product/ProductSlice";
export default configureStore({
  reducer: {
    cat: catReducer,
    system: systemReducer,
    adminUser: userReducer,
    prods: productReducer,
  },
});
