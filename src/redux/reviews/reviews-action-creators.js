import axios from "axios";
import {SERVER_BASE_URL_DEVELOPMENT} from "../../constants/constants";
import REVIEW_ACTION_TYPES from "./reviews-action-types";

const updateReviewRequest = () => {
    return {
        type: REVIEW_ACTION_TYPES.UPDATE_REVIEW_REQUEST
    }
}
const updateReviewSuccess = review => {
    return {
        type: REVIEW_ACTION_TYPES.UPDATE_REVIEW_SUCCESS,
        payload: review
    }
}
const updateReviewFail = error => {
    return {
        type: REVIEW_ACTION_TYPES.UPDATE_REVIEW_FAIL,
        payload: error
    }
}
export const updateReview = (reviewID, review, token, handleAlert) => {
    return dispatch => {
        dispatch(updateReviewRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/reviews/${reviewID}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: review
        }).then(response => {
            const {data, message} = response.data;
            dispatch(updateReviewSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(updateReviewFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const deleteReviewRequest = () => {
    return {
        type: REVIEW_ACTION_TYPES.DELETE_REVIEW_REQUEST
    }
}
const deleteReviewSuccess = review => {
    return {
        type: REVIEW_ACTION_TYPES.DELETE_REVIEW_SUCCESS,
        payload: review
    }
}
const deleteReviewFail = error => {
    return {
        type: REVIEW_ACTION_TYPES.DELETE_REVIEW_FAIL,
        payload: error
    }
}
export const deleteReview = (reviewID, token, handleAlert) => {
    return dispatch => {
        dispatch(deleteReviewRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/reviews/${reviewID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(deleteReviewSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(deleteReviewFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}


const createReviewRequest = () => {
    return {
        type: REVIEW_ACTION_TYPES.CREATE_REVIEW_REQUEST
    }
}
const createReviewSuccess = review => {
    return {
        type: REVIEW_ACTION_TYPES.CREATE_REVIEW_SUCCESS,
        payload: review
    }
}
const createReviewFailure = error => {
    return {
        type: REVIEW_ACTION_TYPES.CREATE_REVIEW_FAIL,
        payload: error
    }
}
export const createReview = (review, token, handleAlert) => {
    return dispatch => {
        dispatch(createReviewRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/reviews`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: review
        }).then(response => {
            const {data, message} = response.data;
            dispatch(createReviewSuccess(data));
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(createReviewFailure(error.response && error.response.data && error.response.data.message));
            handleAlert('ERROR', error.response && error.response.data && error.response.data.message);
        });
    }
}


const getReviewsByProductRequest = () => {
    return {
        type: REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_REQUEST
    }
}
const getReviewsByProductSuccess = reviews => {
    return {
        type: REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_SUCCESS,
        payload: reviews
    }
}
const getReviewsByProductFail = error => {
    return {
        type: REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_FAIL,
        payload: error
    }
}
export const getReviewsByProduct = (productID, token, handleAlert) => {
    return dispatch => {
        dispatch(getReviewsByProductRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products/${productID}/reviews`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, message} = response.data;
            dispatch(getReviewsByProductSuccess(data))
            handleAlert('SUCCESS', message);
        }).catch(error => {
            dispatch(getReviewsByProductFail(error.response.data.message));
            handleAlert('ERROR', error.response.data.message);
        });
    }
}