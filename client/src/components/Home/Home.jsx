import React, { useEffect } from "react";
import MetaData from "../../constant/MetaData";
import Banner from "./Banner";
import Category from "./Category";
import Products from "./Products";
import { Button } from "@mui/material";
import axios from "axios";

function Home({ setProgress, children }) {
  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000); 
  }, [setProgress]);
  const handleClick = async () => {
    const data = {
      userid: 123,
      name: "Shyam",
      amount: 10,
      number: "9337757675",
      MID: "MID" + Date.now(),
      transactionid: "T" + Date.now(),
    };

    const res = await axios.post(
      "http://localhost:8080/api/payment/order",
      data
    );
    console.log("res", res);
    if (res.data.message == "Payment gateway page") {
      // notifySuccess(res.data.message);
      const url = res.data.redirectUrl;
      console.log(url);
      if (url) {
        window.location.href = url; // Redirect the user
      } else {
        console.log("Payment gateway error");
      }
    } else {
      setTimeout(() => {
        // dispatch(reloadPage(false));
        console.log(res.data.message);
      }, 2000);
    }
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
