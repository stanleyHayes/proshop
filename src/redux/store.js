import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {PRO_SHOP_CART_ITEMS_KEY, PRO_SHOP_TOKEN_KEY, PRO_SHOP_USER_INFO_KEY} from "../constants/constants";

const cartItemsFromStorage = localStorage.getItem(PRO_SHOP_CART_ITEMS_KEY) ? JSON.parse(localStorage.getItem(PRO_SHOP_CART_ITEMS_KEY)) : [];
const userInfoFromStorage = localStorage.getItem(PRO_SHOP_USER_INFO_KEY) ? JSON.parse(localStorage.getItem(PRO_SHOP_USER_INFO_KEY)): null;
const tokenFromStorage = localStorage.getItem(PRO_SHOP_TOKEN_KEY) ? JSON.parse(localStorage.getItem(PRO_SHOP_TOKEN_KEY)): null;

const INITIAL_STATE = {
    cart: {items: cartItemsFromStorage},
    authentication: {userProfile: userInfoFromStorage, token: tokenFromStorage}
};
const store = createStore(rootReducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk)));
export default store;