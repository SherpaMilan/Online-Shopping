import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./Sidebar";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="sidebar">
      <div className="left">
        {/* sidebar */}
        <SideBar />
      </div>
      <div className="right ">
        {/* header */}
        <Header />

        {/* main body */}
        <main className="main">{children}</main>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};
