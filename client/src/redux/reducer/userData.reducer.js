import { FETCH_USER_DATA } from '../actionTypes/auth.actionTypes';

const userState = {
    token:  null,
    userData : {},
};

export const userDataReducer = (state = userState, { type, payload }) => {

    switch (type) {
        
        case FETCH_USER_DATA: {
            return { ...state, token: payload.token, userData: payload.userData };
        }

        default: {
            return state;
        }
    }

};