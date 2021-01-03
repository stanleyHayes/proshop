import ORDER_ACTION_TYPES from "./order-action-types";
import axios from "axios";
import {SERVER_BASE_URL_DEVELOPMENT} from "../../constants/constants";

const createOrderRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.CREATE_ORDER_REQUEST
    }
}
const createOrderSuccess = order => {
    return {
        type: ORDER_ACTION_TYPES.CREATE_ORDER_SUCCESS,
        payload: order
    }
}
const createOrderFail = error => {
    return {
        type: ORDER_ACTION_TYPES.CREATE_ORDER_FAIL,
        payload: error
    }
}
export const createOrder = (order, token, handleAlert, history) => {
    return dispatch => {
        dispatch(createOrderRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: order
        }).then(response => {
            const {data, message} = response.data;
            dispatch(createOrderSuccess(data));
            handleAlert('SUCCESS', message);
            history.push(`/orders/${data._id}`);
        }).catch(error => {
            dispatch(createOrderFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const getOrderRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDER_REQUEST
    }
}
const getOrderSuccess = order => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDER_SUCCESS,
        payload: order
    }
}
const getOrderFail = error => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDER_FAIL,
        payload: error
    }
}
export const getOrder = (orderID, token, handleAlert) => {
    return dispatch => {
        dispatch(getOrderRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders/${orderID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getOrderSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getOrderFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}

const getOrdersByUserRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_REQUEST
    }
}
const getOrdersByUserSuccess = orders => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_SUCCESS,
        payload: orders
    }
}
const getOrdersByUserFail = error => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_FAIL,
        payload: error
    }
}
export const getOrdersByUser = ( token, handleAlert) => {
    return dispatch => {
        dispatch(getOrdersByUserRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getOrdersByUserSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getOrdersByUserFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}

const getOrdersRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_REQUEST
    }
}
const getOrdersSuccess = orders => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_SUCCESS,
        payload: orders
    }
}
const getOrdersFail = error => {
    return {
        type: ORDER_ACTION_TYPES.GET_ORDERS_FAIL,
        payload: error
    }
}
export const getOrders = (token, handleAlert) => {
    return dispatch => {
        dispatch(getOrdersRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getOrdersSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getOrdersFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}

const updateOrderRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.UPDATE_ORDER_REQUEST
    }
}
const updateOrderSuccess = order => {
    return {
        type: ORDER_ACTION_TYPES.UPDATE_ORDER_SUCCESS,
        payload: order
    }
}
const updateOrderFail = error => {
    return {
        type: ORDER_ACTION_TYPES.UPDATE_ORDER_FAIL,
        payload: error
    }
}
export const updateOrder = (orderID, token, handleAlert) => {
    return dispatch => {
        dispatch(updateOrderRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders/${orderID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(updateOrderSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(updateOrderFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const deleteOrderRequest = () => {
    return {
        type: ORDER_ACTION_TYPES.DELETE_ORDER_REQUEST
    }
}
const deleteOrderSuccess = order => {
    return {
        type: ORDER_ACTION_TYPES.DELETE_ORDER_SUCCESS,
        payload: order
    }
}
const deleteOrderFail = error => {
    return {
        type: ORDER_ACTION_TYPES.DELETE_ORDER_FAIL,
        payload: error
    }
}
export const deleteOrder = (orderID, token, handleAlert) => {
    return dispatch => {
        dispatch(deleteOrderRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/orders/${orderID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(deleteOrderSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(deleteOrderFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}