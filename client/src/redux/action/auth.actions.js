import axios from "axios";
import { notifyError, notifySuccess } from "../../constant/toastAlerts";
import Cookies from 'js-cookie';
import { FETCH_FORGOTPASSWORD_DATA, FETCH_LOGIN_DATA, FETCH_LOGOUT_DATA, FETCH_SIGNUP_DATA } from "../actionTypes/auth.actionTypes";
import { OPEN_LOGIN_MODAL } from "../actionTypes/loginTogle.action";

//Login Action 
export const login = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/login', reqbodydata,
            {
                withCredentials: true
            });
        console.log("login res", res)
        // Optionally, navigate to another page upon successful login
        if (res.data.message == 'Login Successful') {
            dispatch({ type: FETCH_LOGIN_DATA, payload: res.data });
            const loginData = res.data;
            Cookies.set('frontendToken', JSON.stringify(loginData.token), { expires: 7, path: '/' });
            Cookies.set('userData', JSON.stringify(loginData.userData), { expires: 7, path: '/' });
            dispatch({ type: OPEN_LOGIN_MODAL, payload: false });
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

//forgot password
export const forgotpassword = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/password/forgot', reqbodydata);
        if (res.statusText == "OK") {
            dispatch({ type: FETCH_FORGOTPASSWORD_DATA, payload: res.data });
            notifySuccess(res.data.message);
            alert(res.data.message);
        } else {
            notifyError(res.data.message);
        }

    }
    catch (error) {
        notifyError(`${error}`);
        console.log(`Error in forgot password ${error}`);
    }
}

//Login Action 
export const logout = (navigate) => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:8080/api/auth/logout',
            {
                withCredentials: true // Important
            });
        console.log("logout res", res)
        // Optionally, navigate to another page upon successful login
        if (res.data.message == 'Loggedout Successfully') {
            dispatch({
                type: FETCH_LOGOUT_DATA, payload: {
                    token: null,
                    userData: {}
                }
            });
            Cookies.remove('frontendToken');
            Cookies.remove('userData');
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
