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