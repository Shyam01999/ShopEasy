import { Button } from "@mui/material";
import "./App.css";
import "./styles/layout.css";
import "./styles/module.css";
import "./styles/theme.css";
import "./styles/states.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { useEffect, useState } from "react";
import { notifySuccess } from "./constant/toastAlerts";
import Login from "./components/Authentication/Login/Login";
import Signup from "./components/Authentication/Signup/Signup";
import Resetpassword from "./components/Authentication/Resetpassword/Resetpassword";
import Forgotpassword from "./components/Authentication/Forgotpassword/Forgotpassword";
import Home from "./components/Home/Home";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Cart from "./components/Cart/Cart";
import Banner from "./components/Home/Banner";
import Layout from "./components/Layout/Layout";
import LoadingBar from "react-top-loading-bar";
import { useDispatch } from "react-redux";
import { userData } from "./redux/action/auth.actions";

function App() {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <LoadingBar
          color="#646cff"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          {/* <Route path="/forgotpassword" element={<Forgotpassword setProgress={setProgress}/>} />
          <Route path="/resetpassword/:token" element={<Resetpassword setProgress={setProgress}/>} /> */}

          <Route path="/" element={<Layout />}>
            <Route index element={<Home setProgress={setProgress} />} />
            <Route path="cart" element={<Cart setProgress={setProgress} />} />
            <Route
              path="signup"
              element={<Signup setProgress={setProgress} />}
            />
            <Route path="login" element={<Login setProgress={setProgress} />} />
            <Route
              path="forgotpassword"
              element={<Forgotpassword setProgress={setProgress} />}
            />
            <Route
              path="resetpassword/:token"
              element={<Resetpassword setProgress={setProgress} />}
            />
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
