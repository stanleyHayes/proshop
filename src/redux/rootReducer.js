import {combineReducers} from "redux";
import productReducer from "./product/product-reducer";
import cartReducer from "./cart/cart-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
});

export default rootReducer;