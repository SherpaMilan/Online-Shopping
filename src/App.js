import "./App.css";
import { ToastContainer } from "react-toastify";
import { ImCamera } from "react-icons/im";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/signin-signup/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { useDispatch } from "react-redux";
import { getUserAction } from "./pages/user-state/userAction";
import { PrivateRouter } from "./components/private-router/PrivateRouter";
import Product from "./pages/product/Product";
import { SignUp } from "./pages/signin-signup/SignUp";
import { SignIn } from "./pages/signin-signup/SignIn";
import { Category } from "./pages/category/Category";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";
import { Payment } from "./pages/payment/Payment";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user?.uid) {
      dispatch(getUserAction(user.uid));
    }
  });
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="milan" element={<ResetPassword />} />

        {/* admin routes */}
        <Route
          path="signup"
          element={
            <PrivateRouter>
              <SignUp />
            </PrivateRouter>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="category"
          element={
            <PrivateRouter>
              <Category />
            </PrivateRouter>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRouter>
              <Product />
            </PrivateRouter>
          }
        />
        <Route
          path="product/new"
          element={
            <PrivateRouter>
              <NewProduct />
            </PrivateRouter>
          }
        />

        <Route
          path="product/:slug"
          element={
            <PrivateRouter>
              <EditProduct />
            </PrivateRouter>
          }
        />
        <Route
          path="payments"
          element={
            <PrivateRouter>
              <Payment />
            </PrivateRouter>
          }
        />

        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
