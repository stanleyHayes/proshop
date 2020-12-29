import PRODUCT_ACTION_TYPES from "./product-action-types";

const INITIAL_STATE = {
    products: [],
    error: null,
    loading: false,
    product: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                product: {}
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
                error: null
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                product: {},
                error: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;