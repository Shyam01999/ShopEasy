import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
