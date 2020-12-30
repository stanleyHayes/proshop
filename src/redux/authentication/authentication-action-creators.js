import AUTH_ACTION_TYPES from "./authentication-action-types";
import axios from "axios";
import {PRO_SHOP_TOKEN_KEY, PRO_SHOP_USER_INFO_KEY, SERVER_BASE_URL_DEVELOPMENT} from "../../constants/constants";

const signUpRequest = () => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_UP_REQUEST
    }
}

const signUpSuccess = (user, token) => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_UP_SUCCESS,
        payload: {user, token}
    }
}

const signUpFail = error => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_UP_FAIL,
        payload: error
    }
}

export const signUp = (user, handleAlert) => {
    return dispatch => {
        dispatch(signUpRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/auth/register`,
            data: user
        }).then(response => {
            const {data, message, token} = response.data;
            dispatch(signUpSuccess(data, token));
            handleAlert('SUCCESS', message);
            localStorage.setItem(PRO_SHOP_USER_INFO_KEY, JSON.stringify(data));
            localStorage.setItem(PRO_SHOP_TOKEN_KEY, JSON.stringify(token));
        }).catch(error => {
            dispatch(signUpFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}

const signInRequest = () => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_IN_REQUEST
    }
}

const signInSuccess = (user, token) => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_IN_SUCCESS,
        payload: {user, token}
    }
}

const signInFail = error => {
    return {
        type: AUTH_ACTION_TYPES.SIGN_IN_FAIL,
        payload: error
    }
}

export const signIn = (user, handleAlert) => {
    return dispatch => {
        dispatch(signInRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/auth/login`,
            data: user
        }).then(response => {
            const {data, message, token} = response.data;
            dispatch(signInSuccess(data, token));
            handleAlert('SUCCESS', message);
            localStorage.setItem(PRO_SHOP_USER_INFO_KEY, JSON.stringify(data));
            localStorage.setItem(PRO_SHOP_TOKEN_KEY, JSON.stringify(token));
        }).catch(error => {
            dispatch(signInFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const getLoggedInUserRequest = () => {
    return {
        type: AUTH_ACTION_TYPES.GET_LOGGED_IN_REQUEST
    }
}

const getLoggedInUserSuccess = (user, token) => {
    return {
        type: AUTH_ACTION_TYPES.GET_LOGGED_IN_SUCCESS,
        payload: {user, token}
    }
}

const getLoggedInUserFail = error => {
    return {
        type: AUTH_ACTION_TYPES.GET_LOGGED_IN_FAIL,
        payload: error
    }
}

export const getLoggedInUser = (user, token, handleAlert) => {
    return dispatch => {
        dispatch(getLoggedInUserRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/auth/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message, token} = response.data;
            dispatch(getLoggedInUserSuccess(data, token));
            handleAlert('SUCCESS', message);
            localStorage.setItem(PRO_SHOP_USER_INFO_KEY, JSON.stringify(data));
            localStorage.setItem(PRO_SHOP_TOKEN_KEY, JSON.stringify(token));
        }).catch(error => {
            dispatch(getLoggedInUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}