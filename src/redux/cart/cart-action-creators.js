import CART_ACTION_TYPES from "./cart-action-types";
import axios from "axios";
import {
    PRO_SHOP_CART_ITEMS_KEY, PRO_SHOP_PAYMENT_METHOD_KEY,
    PRO_SHOP_SHIPPING_ADDRESS_KEY,
    SERVER_BASE_URL_DEVELOPMENT
} from "../../constants/constants";

export const addToCart = (productID, quantity) => {
    return (dispatch, getState) => {
        axios({
            url: `${SERVER_BASE_URL_DEVELOPMENT}/products/${productID}`,
            method: 'get'
        }).then(response => {
            const {data} = response.data;
            dispatch({
                type: CART_ACTION_TYPES.CART_ADD_ITEM,
                payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    countInStock: data.countInStock,
                    price: data.price,
                    category: data.category,
                    quantity
                }
            });
            localStorage.setItem(PRO_SHOP_CART_ITEMS_KEY, JSON.stringify(getState().cart.items));
        }).catch(error => {

        });
    }
}

export const removeFromCart = (productID) => {
    return (dispatch, getState) => {
        dispatch({
            type: CART_ACTION_TYPES.CART_REMOVE_ITEM,
            payload: productID
        });
        localStorage.setItem(PRO_SHOP_CART_ITEMS_KEY, JSON.stringify(getState().cart.items));
    }
}

export const saveShippingAddress = address => {
    return dispatch => {
        dispatch({type: CART_ACTION_TYPES.CART_SAVE_SHIPPING_ADDRESS, payload: address});
        localStorage.setItem(PRO_SHOP_SHIPPING_ADDRESS_KEY, JSON.stringify(address));
    }
}


export const savePaymentMethod = paymentMethod => {
    return dispatch => {
        dispatch({type: CART_ACTION_TYPES.CART_SAVE_PAYMENT_METHOD, payload: paymentMethod});
        localStorage.setItem(PRO_SHOP_PAYMENT_METHOD_KEY, JSON.stringify(paymentMethod));
    }
}