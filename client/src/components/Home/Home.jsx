import React from "react";
import MetaData from "../../constant/MetaData";
import Banner from "./Banner";
import Category from "./Category";
import Products from "./Products";
import { Button } from "@mui/material";
import axios from "axios";

function Home({ children }) {
  const handleClick = async () => {
    const data = {
      userid:123,
      name: "Shyam",
      amount: 1,
      number: "9337757675",
      MID: "MID" + Date.now(),
      transactionid: "T" + Date.now(),
    };

    const res = await axios.post("http://localhost:8080/api/payment/order", data);
    console.log("res", res);
  };
  return (
    <>
      <MetaData title="ShopEasy Home" />
      {/* <Category />
      <Banner />
      <Products /> */}
      <Button
        onClick={handleClick}
        sx={{
          height: "100%",
          display: "flex",
          margin: "auto",
          alignItems: "center",
        }}
      >
        Pay now
      </Button>
    </>
  );
}

export default Home;
