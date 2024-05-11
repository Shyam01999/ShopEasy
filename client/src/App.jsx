import {Button} from '@mui/material';
import './App.css'
import "./styles/layout.css";
import "./styles/module.css";
import "./styles/theme.css";
import "./styles/states.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import { useEffect } from 'react';
import { notifySuccess } from './constant/toastAlerts';
import Login from './components/Authentication/Login/Login';
import Signup from './components/Authentication/Signup/Signup';
import Resetpassword from './components/Authentication/Resetpassword/Resetpassword';
import Forgotpassword from './components/Authentication/Forgotpassword/Forgotpassword';

function App() {
  // useEffect(()=>{
  //   notifySuccess("Welcome to Shop Ease App")
  // },[])

  return (
    <>

     <Button variant="contained">Hello world</Button>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/forgotpassword" element={<Forgotpassword/>} />
          <Route path="/resetpassword" element={<Resetpassword/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
