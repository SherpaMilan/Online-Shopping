import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySilce";
import systemReducer from "./system/systemSlice";
import userReducer from "./pages/user-state/userSlice";
import productReducer from "./pages/product/ProductSlice";
import paymentReducer from "./components/payment/paymentSlice";
export default configureStore({
  reducer: {
    cat: catReducer,
    system: systemReducer,
    adminUser: userReducer,
    prods: productReducer,
    payment: paymentReducer,
  },
});
