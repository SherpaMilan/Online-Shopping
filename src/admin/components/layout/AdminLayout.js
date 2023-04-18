import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";

export const AdminLayout = () => {
  return (
    <div className="sidebar">
      <div className="left">
        {/* sidbar */}
        <SideBar />
      </div>
      <div className="right ">
        {/* heder */}
        <Header />

        {/* main body */}
        <main className="main"></main>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};
