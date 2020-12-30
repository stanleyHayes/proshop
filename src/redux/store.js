import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {PRO_SHOP_CART_ITEMS_KEY} from "../constants/constants";

const cartItemsFromStorage = localStorage.getItem(PRO_SHOP_CART_ITEMS_KEY) ? JSON.parse(localStorage.getItem(PRO_SHOP_CART_ITEMS_KEY)) : [];
const INITIAL_STATE = {
    cart: {items: cartItemsFromStorage}
};
const store = createStore(rootReducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk)));
export default store;