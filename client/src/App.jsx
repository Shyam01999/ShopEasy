import { Button } from "@mui/material";
import "./App.css";
import "./styles/layout.css";
import "./styles/module.css";
import "./styles/theme.css";
import "./styles/states.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { useEffect } from "react";
import { notifySuccess } from "./constant/toastAlerts";
import Login from "./components/Authentication/Login/Login";
import Signup from "./components/Authentication/Signup/Signup";
import Resetpassword from "./components/Authentication/Resetpassword/Resetpassword";
import Forgotpassword from "./components/Authentication/Forgotpassword/Forgotpassword";
import Home from "./components/Home/Home";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Cart from "./components/Cart/Cart";

function App() {
  // useEffect(()=>{
  //   notifySuccess("Welcome to Shop Ease App")
  // },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          
          <Route path="/" element={<Home />}>
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Route>
          {/* <Route path="/" element={<Home><ProtectRoute /></Home>}> */}
          {/* <Route path="kms" element={<KMS />} />
            <Route path="lms" element={<LMS />} />
            <Route path="kms/mydocs" element={<MyDocs/>} />
            <Route path="kms/alldocs" element={<AllDocs/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
