import {combineReducers} from "redux";
import productReducer from "./product/product-reducer";
import cartReducer from "./cart/cart-reducer";
import authenticationReducer from "./authentication/authentication-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    authentication: authenticationReducer
});

export default rootReducer;