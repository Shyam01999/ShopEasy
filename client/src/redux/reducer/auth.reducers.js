import Cookies from 'js-cookie';
import { FETCH_LOGIN_DATA, FETCH_SIGNUP_DATA, FETCH_FORGOTPASSWORD_DATA, FETCH_LOGOUT_DATA } from '../actionTypes/auth.actionTypes';
const storedToken = Cookies.get('frontendToken');
const storedUserData = Cookies.get('userData');

const authState = {
    // loading: false,
    // error: null,
    token: storedToken ? JSON.parse(storedToken) : null,
    userData: storedUserData ? JSON.parse(storedUserData) : {},
};

export const authReducer = (state = authState, { type, payload }) => {
    switch (type) {

        case FETCH_LOGIN_DATA: {
            return { ...state, token: payload.token, userData: payload.userData };
        }

        case FETCH_SIGNUP_DATA: {
            return { ...state, token: payload.token, userData: payload.userData };
        }

        case FETCH_FORGOTPASSWORD_DATA: {
            return { ...state, token: payload.token, userData: payload.userData };
        }

        case FETCH_LOGOUT_DATA: {
            return { ...state, token: payload.token, userData: payload.userData };
        }

        // case LOGIN_REQUEST:{
        //     return { ...state, loading: true, error:null,token:null, userData:{}};
        // }

        // case LOGIN_SUCCESS:{
        //     return { ...state, loading: false, token:payload.token, userData:payload, error:null};
        // }

        // case LOGIN_FAILURE:{
        //     return { ...state, loading: false,error:payload,userData:{}, token:null};
        // }

        // case LOGOUT_USER: {
        //     return { ...state, ...payload };
        // }

        // case LOGOUT_USER:{
        //   localStorage.setItem("token",null);
        //   localStorage.setItem("userData",JSON.stringify({}))
        //   return {...state,loading:false,error:null,userData:{},token:null}

        // }

        default: {
            return state;
        }
    }

};


