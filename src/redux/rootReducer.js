import {combineReducers} from "redux";
import productReducer from "./product/product-reducer";
import cartReducer from "./cart/cart-reducer";
import authenticationReducer from "./authentication/authentication-reducer";
import orderReducer from "./orders/order-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    authentication: authenticationReducer,
    orders: orderReducer
});

export default rootReducer;