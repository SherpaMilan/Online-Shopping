import "./App.css";
import { ToastContainer } from "react-toastify";

import { Routes, Route } from "react-router-dom";

import { SignUp } from "./pages/signin-signup/SignUp";
import { SignIn } from "./pages/signin-signup/SignIn";

import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/signin-signup/ResetPassword";
import { Category } from "./pages/category/Category";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        {/* admin routes */}
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />

        <Route path="reset-password" element={<ResetPassword />} />
        {/* buyers routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<Category />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
