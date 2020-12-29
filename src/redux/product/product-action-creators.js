import PRODUCT_TYPES from "./product-action-types";
import axios from "axios";
import {SERVER_BASE_URL_DEVELOPMENT} from "../../constants/constants";

const getProductsRequest = () => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCTS_REQUEST
    }
}


const getProductsSuccess = products => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCTS_SUCCESS,
        payload: products
    }
}

const getProductsFail = error => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCTS_FAIL,
        payload: error
    }
}

export const getProducts = (handleAlert) => {
    return dispatch => {
        dispatch(getProductsRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products`,
            headers: {

            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getProductsSuccess(data))
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getProductsFail(error.response.data.error.message));
            handleAlert('ERROR', error.response.data.error.message);
        });
    }
}


const getProductRequest = () => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCT_REQUEST
    }
}


const getProductSuccess = product => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCT_SUCCESS,
        payload: product
    }
}

const getProductFail = error => {
    return {
        type: PRODUCT_TYPES.GET_PRODUCT_FAIL,
        payload: error
    }
}

export const getProduct = (productID, handleAlert) => {
    return dispatch => {
        dispatch(getProductRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products/${productID}`,
            headers: {

            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getProductSuccess(data))
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getProductFail(error.response.data.error.message));
            handleAlert('ERROR', error.response.data.error.message);
        });
    }
}