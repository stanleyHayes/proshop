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
            dispatch(getProductsFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
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
            dispatch(getProductFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const updateProductRequest = () => {
    return {
        type: PRODUCT_TYPES.UPDATE_PRODUCT_REQUEST
    }
}
const updateProductSuccess = product => {
    return {
        type: PRODUCT_TYPES.UPDATE_PRODUCT_SUCCESS,
        payload: product
    }
}
const updateProductFail = error => {
    return {
        type: PRODUCT_TYPES.UPDATE_PRODUCT_FAIL,
        payload: error
    }
}
export const updateProduct = (productID, token, handleAlert) => {
    return dispatch => {
        dispatch(updateProductRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products/${productID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(updateProductSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(updateProductFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const deleteProductRequest = () => {
    return {
        type: PRODUCT_TYPES.DELETE_PRODUCT_REQUEST
    }
}
const deleteProductSuccess = order => {
    return {
        type: PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS,
        payload: order
    }
}
const deleteProductFail = error => {
    return {
        type: PRODUCT_TYPES.DELETE_PRODUCT_FAIL,
        payload: error
    }
}
export const deleteProduct = (productID, token, handleAlert) => {
    return dispatch => {
        dispatch(deleteProductRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products/${productID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(deleteProductSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(deleteProductFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const createProductRequest = () => {
    return {
        type: PRODUCT_TYPES.CREATE_PRODUCT_REQUEST
    }
}
const createProductSuccess = product => {
    return {
        type: PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS,
        payload: product
    }
}
const createProductFail = error => {
    return {
        type: PRODUCT_TYPES.CREATE_PRODUCT_FAIL,
        payload: error
    }
}
export const createProduct = (product, token, handleAlert, history) => {
    return dispatch => {
        dispatch(createProductRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: product
        }).then(response => {
            const {data, message} = response.data;
            dispatch(createProductSuccess(data));
            handleAlert('SUCCESS', message);
            history.push(`/products/${data._id}`);
        }).catch(error => {
            dispatch(createProductFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}
