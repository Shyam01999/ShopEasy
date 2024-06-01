import axios from "axios";
import { notifyError, notifySuccess } from "../../constant/toastAlerts";
// import Cookies from 'js-cookie';
import { FETCH_LOGIN_DATA, FETCH_SIGNUP_DATA } from "../actionTypes/auth.actionTypes";

//Login Action 
export const login = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/login', reqbodydata);
        console.log("login res",res)
        // Optionally, navigate to another page upon successful login
        if (res.data.message == 'Login Successful') {
            dispatch({ type: FETCH_LOGIN_DATA, payload: res.data });
            const loginData = res.data;
            // Cookies.set('loginData', JSON.stringify(loginData), { expires: 7, path: '/' });
            notifySuccess(res.data.message);
            navigate("/");
        } else {
            notifyError(res.data.message);
        }
    }
    catch (error) {
        notifyError(`${error}`)
        console.log(`Error in login ${error}`);
    }
}

//Signup Action
export const signup = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/register', reqbodydata);
        console.log("signup res", res);
        if (res.statusText == "Created") {
            dispatch({ type: FETCH_SIGNUP_DATA, payload: res.data });
            const loginData = res.data;
            // Cookies.set('loginData', JSON.stringify(loginData), { expires: 7, path: '/' });
            notifySuccess(res.data.message);
            navigate("/");
        } else {
            notifyError(res.data.message);
        }
    }
    catch (error) {
        notifyError(`${error}`);
        console.log(`Error in Signup ${error}`);
    }
}