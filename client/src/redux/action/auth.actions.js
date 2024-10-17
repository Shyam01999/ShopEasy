import axios from "axios";
import { notifyError, notifySuccess } from "../../constant/toastAlerts";
import { FETCH_USER_DATA } from "../actionTypes/auth.actionTypes";
// import { OPEN_LOGIN_MODAL } from "../actionTypes/loginTogle.action";
import { backendApi } from "../../constant/api";

//Login Action 
export const login = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${backendApi}/api/auth/login`, reqbodydata,
            {
                withCredentials: true
            });
        if (res.data.message == 'Login Successful') {
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
            notifySuccess(res.data.message);
            navigate("/");
        } else {
            notifyError(res.data.message);
        }
    }
    catch (error) {
        notifyError(`${error.response.data.message}`)
        console.error(`Error in login ${error.response.data.message}`);
    }
}

//Signup Action
export const signup = (reqbodydata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${backendApi}/api/auth/register`, reqbodydata,
            {
                withCredentials: true
            }
        );
        if (res.statusText == "Created") {
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
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
        const res = await axios.post(`${backendApi}/api/auth/password/forgot`, reqbodydata);
        if (res.statusText == "OK") {
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
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
        const res = await axios.get(`${backendApi}/api/auth/logout`, {
            withCredentials: true // Important
        }, "_self"
        );
        if (res.data.message == 'Loggedout Successfully') {
            dispatch({
                type: FETCH_USER_DATA, payload: {
                    token: null,
                    userData: {}
                }
            });
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

//User Action
export const userData = () => async (dispatch) => {
    try {
        const res = await axios.get(`${backendApi}/api/auth/me`, { withCredentials: true });
        if (res.data.success) {
            dispatch({ type: FETCH_USER_DATA, payload: res.data })
        }
        else {
            // 
            console.log("User not loggedin")
        }
    }
    catch (error) {
        console.log(`Error while fetching login user data ${error}`);
    }
}
