import "./App.css";
import { ToastContainer } from "react-toastify";
import { ImCamera } from "react-icons/im";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import SignUp from "./admin/pages/signin-signup/SignUp";
import Home from "./buyer/pages/home/Home";
import { AdminLayout } from "./admin/components/layout/AdminLayout";

function App() {
  return (
    <div className="">
      <AdminLayout />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />

        {/* admin routes */}
        <Route path="admin/signup" element={<SignUp />} />
        <Route path="admin/signin" element={<SignUp />} />

        {/* buyers routes */}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
