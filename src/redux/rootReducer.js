import {combineReducers} from "redux";
import productReducer from "./product/product-reducer";
import cartReducer from "./cart/cart-reducer";
import authenticationReducer from "./authentication/authentication-reducer";
import orderReducer from "./orders/order-reducer";
import usersReducer from "./users/users-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    authentication: authenticationReducer,
    orders: orderReducer,
    users: usersReducer
});

export default rootReducer;