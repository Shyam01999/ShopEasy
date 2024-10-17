import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import { Container } from "@mui/material";

function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" component="main" sx={{minHeight:"calc(100vh - 9.125rem)"}}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
