import React, { useEffect } from "react";
import MetaData from "../../constant/MetaData";

function Cart({ setProgress }) {
  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000); // Reset progress on component unmount
  }, [setProgress]);
  return (
    <>
      <MetaData title="ShopEasy Cart" />
      <h1>Cart Page</h1>
    </>
  );
}

export default Cart;
