import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";

const Layout = memo(() => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="containerLayout">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
});

export default Layout;
