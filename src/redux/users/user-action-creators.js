import USER_ACTION_TYPES from "./user-action-types";
import axios from "axios";
import {SERVER_BASE_URL_DEVELOPMENT} from "../../constants/constants";

const getUsersRequest = () => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_REQUEST
    }
}
const getUsersSuccess = products => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
        payload: products
    }
}
const getUsersFail = error => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_FAIL,
        payload: error
    }
}
export const getUsers = (token, handleAlert) => {
    return dispatch => {
        dispatch(getUsersRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/users`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getUsersSuccess(data))
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getUsersFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const getUserRequest = () => {
    return {
        type: USER_ACTION_TYPES.GET_USER_REQUEST
    }
}
const getUserSuccess = product => {
    return {
        type: USER_ACTION_TYPES.GET_USER_SUCCESS,
        payload: product
    }
}
const getUserFail = error => {
    return {
        type: USER_ACTION_TYPES.GET_USER_FAIL,
        payload: error
    }
}
export const getUser = (userID,token, handleAlert) => {
    return dispatch => {
        dispatch(getUserRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/users/${userID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getUserSuccess(data))
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const updateUserRequest = () => {
    return {
        type: USER_ACTION_TYPES.UPDATE_USER_REQUEST
    }
}
const updateUserSuccess = product => {
    return {
        type: USER_ACTION_TYPES.UPDATE_USER_SUCCESS,
        payload: product
    }
}
const updateUserFail = error => {
    return {
        type: USER_ACTION_TYPES.UPDATE_USER_FAIL,
        payload: error
    }
}
export const updateUser = (userID, user, token, handleAlert) => {
    return dispatch => {
        dispatch(updateUserRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/users/${userID}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: user
        }).then(response => {
            const {data, message} = response.data;
            dispatch(updateUserSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(updateUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const deleteUserRequest = () => {
    return {
        type: USER_ACTION_TYPES.DELETE_USER_REQUEST
    }
}
const deleteUserSuccess = order => {
    return {
        type: USER_ACTION_TYPES.DELETE_USER_SUCCESS,
        payload: order
    }
}
const deleteUserFail = error => {
    return {
        type: USER_ACTION_TYPES.DELETE_USER_FAIL,
        payload: error
    }
}
export const deleteUser = (userID, token, handleAlert) => {
    return dispatch => {
        dispatch(deleteUserRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/users/${userID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(deleteUserSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(deleteUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const createUserRequest = () => {
    return {
        type: USER_ACTION_TYPES.CREATE_USER_REQUEST
    }
}
const createUserSuccess = product => {
    return {
        type: USER_ACTION_TYPES.CREATE_USER_SUCCESS,
        payload: product
    }
}
const createUserFail = error => {
    return {
        type: USER_ACTION_TYPES.CREATE_USER_FAIL,
        payload: error
    }
}
export const createUser = (user, token, handleAlert, history) => {
    return dispatch => {
        dispatch(createUserRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/users`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: user
        }).then(response => {
            const {data, message} = response.data;
            dispatch(createUserSuccess(data));
            handleAlert('SUCCESS', message);
            history.push(`/users/${data._id}`);
        }).catch(error => {
            dispatch(createUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}
