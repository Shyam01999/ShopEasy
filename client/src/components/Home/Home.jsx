import React from "react";
import MetaData from "../../constant/MetaData";
import Banner from "./Banner";
import Category from "./Category";
import Products from "./Products";

function Home({ children }) {
  return (
    <>
      <MetaData title="ShopEasy Home" />
      <Category />
      <Banner />
      <Products />
    </>
  );
}

export default Home;
