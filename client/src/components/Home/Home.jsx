import React from "react";
import Navbar from "./Navbar";
import MetaData from "../../constant/MetaData";
import { Outlet } from "react-router-dom";

function Home({ children }) {
  return (
    <>
      <MetaData title="ShopEasy Home" />
      <Navbar children={children} />
      <Outlet/>
    </>
  );
}

export default Home;
